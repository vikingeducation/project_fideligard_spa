require 'pry'

class QuandlController < ApplicationController

  def index
    # date should be 2017-03-29, for example
    @key = Rails.application.secrets.quandl_key
    @columns = params[:columns] || 'ticker,close,date'
    start = params[:dates] ? params[:dates] : (Date.today - 1).to_s

    @dates = get_query_dates(start)

    resolve_missing_dates

    @response = HTTParty.get("https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=#{dates_to_string(@dates)}&&qopts.columns=#{@columns}&api_key=#{@key}&qopts.per_page=100 ")

    if @response.parsed_response['datatable']['data'].size > 0
      @response = parse_data
      render json: @response, status: :ok
    else
      render json: @response, status: 500
    end
  end



  private

  def resolve_missing_dates
    loop do
      missing_dates = get_missing_dates(@dates)
      missing_dates.each do |d|
        @dates[d] = get_days_ago(@dates[d], 1)
      end
      break if missing_dates.size == 0
    end
  end

  def parse_data
    parsed = {}
    @response.parsed_response['datatable']['data'].each do |item|
      symbol = item[0]
      date = item[2]
      price = item[1]
      parsed[symbol] = {} unless parsed[symbol]
      @dates.each do |datekey, value|
        parsed[symbol][datekey] = price if date === value
      end
    end
    return parsed
  end

  def get_missing_dates(dates)
    response = HTTParty.get("https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=#{dates_to_string(dates)}&&qopts.columns=date&api_key=#{@key}&qopts.per_page=4")
    returned_dates = response.parsed_response['datatable']['data'].map{ |d| d[0]}
    missing_dates = dates.select do |key, date|
      ! returned_dates.include? date.to_s
    end
    missing_dates.map{|k, v| k}
  end

  def get_query_dates(start)
    {
      d0: get_days_ago(start),
      d1: get_days_ago(start, 1),
      d7: get_days_ago(start, 7),
      d30: get_days_ago(start, 30)
    }
  end

  def dates_to_string(dates)
    arr = dates.map{|k, v| v.to_s}
    arr.join(',').gsub(/-/, '')
  end

  def get_days_ago(start, difference = 0)
    split = start.split('-').map{ |d| d.to_i}
    date = Date.new(split[0], split[1], split[2]) - difference
    date = date - 1 if date.saturday?
    date = date - 2 if date.sunday?
    date.to_s
  end

end

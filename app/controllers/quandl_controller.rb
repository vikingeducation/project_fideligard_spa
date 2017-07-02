class QuandlController < ApplicationController

  def index
    key = Rails.application.secrets.quandl_key
    columns = params[:columns] || 'ticker,close,date'
    dates = params[:dates] ||  (Date.today - 1).strftime('%Y%m%d')
    @response = HTTParty.get("https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=#{dates}&&qopts.columns=#{columns}&api_key=#{key}&qopts.per_page=10")
    render json: @response, status: :ok
  end
end

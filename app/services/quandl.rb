class Quandl
  attr_reader :response
  def initialize(date, columns, key)
    @start = date || (Date.today - 1).to_s
    @columns = columns || 'ticker,close,date'
    @key = key
  end

  def get_prices
    set_up_query_dates
    request_prices
    until no_missing_dates
      update_dates
      request_prices
    end
  end

  def success?
    if @data.parsed_response['datatable']['data'].size > 0
      @response = parse_data
      return true
    end
    false
  end

  private

  def request_prices
    @data = HTTParty.get("https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=#{dates_to_string(@dates)}&&qopts.columns=#{@columns}&api_key=#{@key}&qopts.per_page=100")
    get_missing_dates
  end

  def no_missing_dates
    @missing_dates.size === 0
  end

  def get_missing_dates
    returned_dates = @data.parsed_response['datatable']['data'].map{ |d| d[2]}
    missing_dates = @dates.select do |key, date|
      ! returned_dates.include? date.to_s
    end
    @missing_dates = missing_dates.map{|k, v| k}
  end

  def update_dates
    @missing_dates.each do |d|
      @dates[d] = get_days_ago(@dates[d], 1)
    end
  end

  def set_up_query_dates
    @dates =  {
      d0: get_days_ago(@start),
      d1: get_days_ago(@start, 1),
      d7: get_days_ago(@start, 7),
      d30: get_days_ago(@start, 30)
    }
  end

  def get_days_ago(start, difference = 0)
    split = start.split('-').map{ |d| d.to_i}
    date = Date.new(split[0], split[1], split[2]) - difference
    date = date - 1 if date.saturday?
    date = date - 2 if date.sunday?
    date.to_s
  end

  def dates_to_string(dates)
    arr = dates.map{|k, v| v.to_s}
    arr.join(',').gsub(/-/, '')
  end

  def parse_data
    parsed = {}
    @data.parsed_response['datatable']['data'].each do |item|
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

end

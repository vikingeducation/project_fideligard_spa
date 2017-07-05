require File.expand_path('../../services/quandl.rb', __FILE__)
class QuandlController < ApplicationController

  def index
    @key = Rails.application.secrets.quandl_key
    @quandl = Quandl.new(params[:dates], params[:columns], @key)
    @quandl.get_prices
    if @quandl.success?
      render json: @quandl.response, status: :ok
    else
      render json: 'Error', status: 500
    end
  end
end

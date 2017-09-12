//https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=20160912&api_key=oFGKoN39WZSizUrjgvpn
require('dotenv').config();

Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	return [
		this.getFullYear(),
		(mm > 9 ? '' : '0') + mm,
		(dd > 9 ? '' : '0') + dd
	].join('');
};

const ONE_DAY_STEP = 8.64e7;
module.exports = {
	QUANDL_BASE_URL: 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json',
	defineQuery: query => {
		// const currentDate = new Date(),
		// 	currentTime = currentDate.getTime();
		// const currentDateMinus1Day = new Date(
		// 	currentTime - ONE_DAY_STEP
		// ).yyyymmdd();
		// const currentDateMinus7Days = new Date(
		// 	currentTime - ONE_DAY_STEP * 7
		// ).yyyymmdd();
		// const currentDateMinus30Days = new Date(
		// 	currentTime - ONE_DAY_STEP * 30
		// ).yyyymmdd();
		return Object.assign(
			{
				ticker:
					'AAL,AAPL,ADBE,ADSK,AMZN,CHTR,CSCO,CMCSA,COST,EA,FB,FOX,FOXA,GOOG,GOOGL,HAS,MAT,NVDA,QCOM,SIRI,SBUX,TXN,VIAB,ORLY,STX',
				'qopts.columns': 'ticker,date,close',
				'date.gte': '2016-11-31',
				// date: `${currentDate},${currentDateMinus1Day},${currentDateMinus7Days},${currentDateMinus30Days}`,
				api_key: process.env.QUANDL_API_KEY
			},
			query
		);
	}
};

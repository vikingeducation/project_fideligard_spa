import React from 'react';
import moment from 'moment';

export const PurchaseInterface = props => {
	const { makeTrade, changeSymbol, updateQuantity, getPrice } = props;
	const { symbols, selected, quantity, cost, params } = props;
	return (
		<div className="col-6">
			<h2>Purchase/Sell Stock</h2>
			<hr />
			<form onSubmit={makeTrade}>
				<div className="form-group row">
					<label htmlFor="symbol" className="col-sm-3 col-form-label">
						Symbol
					</label>
					<div className="col-sm-3">
						<select
							id="symbol"
							name="symbol"
							onChange={changeSymbol}
							className="form-control"
						>
							{symbols.map(symbol => {
								if (symbol === params.symbol) {
									<option selected key={symbol} value={symbol}>
										{symbol}
									</option>;
								} else {
									return (
										<option key={symbol} value={symbol}>
											{symbol}
										</option>
									);
								}
							})}
						</select>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="action" className="col-sm-3 col-form-label">
						Action
					</label>
					<div className="col-sm-3">
						<select id="action" name="action" className="form-control">
							<option value="purchase">Buy</option>
							<option value="sell">Sell</option>
						</select>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="quantity" className="col-sm-3 col-form-label">
						Quantity
					</label>
					<div className="col-sm-3">
						<input
							name="quantity"
							onChange={updateQuantity}
							type="number"
							min={1}
							className="form-control"
							id="quantity"
							placeholder="100"
							value={quantity}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="date" className="col-sm-3 col-form-label">
						Date
					</label>
					<div className="col-sm-3">
						<input
							name="date"
							type="text"
							readOnly
							className="form-control-plaintext"
							id="date"
							value={moment.unix(props.currentValue).format('YYYY-MM-DD')}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="date" className="col-sm-3 col-form-label">
						Price
					</label>
					<div className="col-sm-3">
						<input
							name="price"
							type="text"
							readOnly
							className="form-control-plaintext"
							id="date"
							value={'$' + getPrice(selected)}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="date" className="col-sm-3 col-form-label">
						Cost
					</label>
					<div className="col-sm-3">
						<input
							name="cost"
							type="text"
							readOnly
							className="form-control-plaintext"
							id="date"
							value={'$' + cost.toFixed(2)}
						/>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-sm-3" />
					<div className="col-sm-9">
						<button type="submit" className="btn btn-primary">
							Trade
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export const CashInterface = props => {
	return (
		<div className="col-6">
			<h2>Details</h2>
			<hr />
			<strong>Cash Available: </strong>
			<br />
			<h2>
				${props.cash}
			</h2>
			<strong>Order Status: </strong>
			<p className="green">VALID</p>
		</div>
	);
};

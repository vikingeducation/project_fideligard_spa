export const PURCHASE_STOCK = 'PURCHASE_STOCK';
export const SELL_STOCK = 'SELL_STOCK';

const addStock = data => ({ type: PURCHASE_STOCK, data });
const removeStock = data => ({ type: SELL_STOCK, data });

export const purchaseStock = data => dispatch => {
	dispatch(addStock(data));
};

export const sellStock = data => dispatch => {
	dispatch(removeStock(data));
};

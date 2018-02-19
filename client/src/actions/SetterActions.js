import {
  SET_SEARCH,
  SET_DATE,
  SET_TRADE_SYMBOL,
  SET_TRADE_PRICE,
  SET_TRADE_DATE,
  SET_TRADE_QUANTITY,
  SET_TRADE_BUY,
  SET_CASH,
  SET_TRANSACTION,
  CLEAR_TRANSACTION_TRADE
} from "./types";

//INPUT
export function setSearch(data) {
  return {
    type: SET_SEARCH,
    data
  };
}

export function setDate(data) {
  return {
    type: SET_DATE,
    data
  };
}

//TRADE FORM
export function setTradeSymbol(data) {
  return {
    type: SET_TRADE_SYMBOL,
    data
  };
}

export function setTradePrice(data) {
  return {
    type: SET_TRADE_PRICE,
    data
  };
}

export function setTradeDate(data) {
  return {
    type: SET_TRADE_DATE,
    data
  };
}

export function setTradeQuantity(data) {
  return {
    type: SET_TRADE_QUANTITY,
    data
  };
}

export function setTradeBuy(data) {
  return {
    type: SET_TRADE_BUY,
    data
  };
}

export function setCashAmount(data) {
  return {
    type: SET_CASH,
    data
  };
}

export function setTransaction(data) {
  return {
    type: SET_TRANSACTION,
    data
  };
}

export function clearTransactionTrade() {
  return {
    type: CLEAR_TRANSACTION_TRADE
  };
}

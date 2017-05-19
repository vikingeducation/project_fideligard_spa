import { MAKE_TRANSACTION } from "../actions/transactionsAction";
let trId = 4;

const initialState = [
  {
    id: 1,
    date: "2017-05-02",
    symbol: "A",
    type: "buy",
    quantity: 3,
    price: 55.93
  },
  {
    id: 2,
    date: "2017-05-09",
    symbol: "AA",
    type: "buy",
    quantity: 1,
    price: 30.82
  },
  {
    id: 3,
    date: "2017-05-17",
    symbol: "AAPL",
    type: "buy",
    quantity: 10,
    price: 150.25
  }
];

export function transactions(state = initialState, action) {
  switch (action.type) {
    case MAKE_TRANSACTION:
      return [...state, { ...action.data, id: trId++ }];
    default:
      return state;
  }
}

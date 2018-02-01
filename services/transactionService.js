const { User, Investment, Transaction } = require('../models');

const TransactionService = {
  handleTransaction: (body) => {
    return new Promise(resolve => {
      const { ticker, transactionType, shares, price, total } = body;

      if (transactionType === 'BUY') {
        User.findOne()
          .then(user => {
            if (!user) throw new Error('notFound');

            if (user.cash < parseFloat(total, 10)) {
              resolve({ status: 406, message: 'Not enough cash' });
            } else {
              // object to store user's available cash and total shares
              const tradeData = {};
              let isNewInvestment = true;

              Investment.findOne({ ticker })
                .then(investment => {
                  if (!investment) {
                    return Investment.create({ ticker, shares: parseInt(shares, 10) });
                  } else {
                    isNewInvestment = false;
                    investment.shares += parseInt(shares, 10);
                    return investment;
                  }
                })
                .then(investment => {
                  if (isNewInvestment) user.portfolio.push(investment.id);

                  user.cash -= parseFloat(total, 10);

                  tradeData.cash = user.cash;
                  tradeData.shares = investment.shares;

                  const promises = [
                    investment.save(),
                    user.save(),
                    Transaction.create({
                      ticker,
                      shares: parseInt(shares, 10),
                      price: parseFloat(price, 10),
                      cost: parseFloat(total, 10),
                      type: transactionType
                    })
                  ];

                  return Promise.all(promises);
                })
                .then(() => {
                  resolve({
                    status: 200,
                    message: 'Purchase Successful',
                    cashAvailable: tradeData.cash,
                    quantityOwned: tradeData.shares
                  });
                })
                .catch((e) => resolve({ status: 500, message: e.message }));
            }
          })
          .catch(() => resolve({ status: 404, message: 'User not found' }));

      } else if (transactionType === 'SELL') {
        Investment.findOne({ ticker })
          .then(investment => {
            // check if enough shares
            if (!investment || investment.shares < parseInt(shares, 10)) {
              resolve({ status: 406, message: 'Not enough shares owned' });
            } else {
              investment.shares -= parseInt(shares, 10);

              // object to store user's available cash and total shares
              const tradeData = {};

              User.findOne()
                .then(user => {
                  const promises = [];

                  user.cash += parseFloat(total, 10);
                  tradeData.cash = user.cash;

                  // No shares left?
                  if (!investment.shares) {
                    tradeData.shares = 0;
                    user.portfolio.pull(investment.id);
                    promises.push(investment.remove());
                  } else {
                    tradeData.shares = investment.shares;
                    promises.push(investment.save());
                  }

                  promises.push(user.save());
                  promises.push(Transaction.create({
                    ticker,
                    shares: parseInt(shares, 10),
                    price: parseFloat(price, 10),
                    cost: parseFloat(total, 10),
                    type: transactionType
                  }));

                  return Promise.all(promises);
                })
                .then(() => {
                  resolve({
                    status: 200,
                    message: 'Sale Successful',
                    cashAvailable: tradeData.cash,
                    quantityOwned: tradeData.shares
                  });
                })
                .catch((e) => resolve({ status: 500, message: e.message }));
            }
          })
          .catch((e) => resolve({ status: 500, message: e.message }));

      } else {
        resolve({ status: 400, message: 'No transaction type given' });
      }
    });
  }
};

module.exports = TransactionService;

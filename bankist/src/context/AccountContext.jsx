import { createContext, useReducer } from "react";

const accountsData = {
  accounts: [
    {
      id: 1,
      owner: "Alice",
      transactions: [
        { amount: 400, date: "1/29/2025", type: "deposit" },
        { amount: -200, date: "2/31/2025", type: "withdraw" },
        { amount: 100, date: "3/29/2025", type: "deposit" },
      ],
      interestRate: 1.2,
      currency: "EUR",
      totalLoanDebt: [],
    },
    {
      id: 2,
      owner: "Bob",
      transactions: [
        { amount: 500, date: "3/29/2025", type: "deposit" },
        { amount: -100, date: "3/29/2025", type: "withdraw" },
        { amount: 100, date: "3/29/2025", type: "deposit" },
      ],
      interestRate: 2.4,
      currency: "GBP",
      totalLoanDebt: [],
    },
    {
      id: 3,
      owner: "Carol",
      transactions: [
        { amount: 200, date: "3/29/2025", type: "deposit" },
        { amount: -40, date: "3/29/2025", type: "withdrawal" },
        { amount: 1000, date: "3/29/2025", type: "deposit" },
      ],
      interestRate: 0.5,
      currency: "GBP",
      totalLoanDebt: [],
    },
  ],
  currentUserId: 1,
};

function accountReducer(state, action) {
  switch (action.type) {
    case "DEPOSIT":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          return account.id === state.currentUserId
            ? {
                ...account,
                transactions: account.transactions.concat(action.payload),
              }
            : account;
        }),
      };
    case "TRANSFER_MONEY":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (
            account.id === state.currentUserId &&
            account.owner === action.payload.payee
          ) {
            return {
              ...account,
              transactions: [
                ...account.transactions,
                {
                  amount: -action.payload.amount,
                  date: action.payload.date,
                  type: action.payload.transfer ? "withdraw" : "deposit",
                },
                {
                  amount: action.payload.amount,
                  date: action.payload.date,
                  type: !action.payload.transfer ? "withdraw" : "deposit",
                },
              ],
            };
          }

          if (account.id === state.currentUserId) {
            return {
              ...account,
              transactions: [
                ...account.transactions,
                {
                  amount: -action.payload.amount,
                  date: action.payload.date,
                  type: action.payload.transfer ? "withdraw" : "deposit",
                },
              ],
            };
          }
          if (account.owner === action.payload.payee) {
            return {
              ...account,
              transactions: [
                ...account.transactions,
                {
                  amount: action.payload.amount,
                  date: action.payload.date,
                  type: !action.payload.transfer ? "withdraw" : "deposit",
                },
              ],
            };
          } else {
            return account;
          }
        }),
      };
    case "REQUEST_LOAN":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === accountsData.currentUserId
            ? {
                ...account,
                transactions: [
                  ...account.transactions,
                  {
                    amount: action.payload.amount,
                    date: action.payload.date,
                    type: action.payload.type,
                  },
                ],
                totalLoanDebt: [
                  ...account.totalLoanDebt,
                  action.payload.amount * (1 + account.interestRate / 100),
                ],
              }
            : account,
        ),
      };
  }
}

const currencySymbols = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

const AccountContext = createContext();

export function AccountContextProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, accountsData);

  const currentUserBalance = state.accounts
    .find((account) => account.id === accountsData.currentUserId)
    .transactions.map((account) => account.amount)
    .reduce((acc, currVal) => acc + currVal, 0);

  const currencySymbol =
    currencySymbols[
      state.accounts.find((account) => account.id === state.currentUserId)
        .currency
    ];
  const currentAccount = state.accounts.find(
    (account) => account.id === state.currentUserId,
  );
  const currentAccountOwner = currentAccount.owner;

  const outgoings = currentAccount.transactions
    .map((tx) => tx.amount)
    .filter((amount) => amount < 0)
    .reduce((acc, currVal) => acc + currVal, 0);

  const currentAccountDebt = currentAccount.totalLoanDebt.reduce(
    (acc, debt) => acc + debt,
    0,
  );

  return (
    <AccountContext.Provider
      value={{
        state,
        dispatch,
        currentUserBalance,
        currencySymbol,
        currentAccountOwner,
        outgoings,
        currentAccountDebt,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export default AccountContext;

import { useContext } from "react";
import AccountContext from "../context/AccountContext";
import TransactionListItem from "./TransactionListItem";
import TransactionDataSummary from "./TransactionDataSummary";

export default function TransactionList() {
  const { state, currencySymbol } = useContext(AccountContext);
  return (
    <section className="transaction-history">
      <ul className="transaction-list">
        {state.accounts
          .find((account) => account.id === state.currentUserId)
          .transactions?.map((tx, idx) => {
            return (
              <TransactionListItem
                key={idx}
                amount={tx.amount}
                date={tx.date}
                type={tx.type}
                currencySymbol={currencySymbol}
              />
            );
          })}
      </ul>
      <TransactionDataSummary />
    </section>
  );
}

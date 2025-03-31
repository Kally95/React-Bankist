import AccountContext from "../context/AccountContext";
import { useContext } from "react";
import TransactionDataItem from "./TransactionDataItem";

export default function TransactionDataSummary() {
  const { currentAccountDebt, currencySymbol, outgoings, currentUserBalance } =
    useContext(AccountContext);
  return (
    <section className="bottom-boxes">
      <TransactionDataItem
        label={"in"}
        currencySymbol={currencySymbol}
        data={currentUserBalance}
      />

      <TransactionDataItem
        label={"out"}
        currencySymbol={currencySymbol}
        data={outgoings}
      />

      <TransactionDataItem
        label={"Debt"}
        currencySymbol={currencySymbol}
        data={currentAccountDebt}
      />
    </section>
  );
}

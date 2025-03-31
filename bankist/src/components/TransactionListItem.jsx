export default function TransactionListItem({
  amount,
  date,
  type,
  currencySymbol,
}) {
  return (
    <li className="transaction-list-item">
      <div className="transaction-date">{date}</div>
      <div className="transaction-amount">
        {currencySymbol}
        {amount}
      </div>
      <div className="transaction-type">
        <span className={type === "deposit" ? "deposit" : "withdraw"}>
          {type}
        </span>
      </div>
    </li>
  );
}

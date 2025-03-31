export default function TransactionDataItem({ label, currencySymbol, data }) {
  return (
    <div className="tx-data-box">
      {label} {currencySymbol}
      {data}
    </div>
  );
}

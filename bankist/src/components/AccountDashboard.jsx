import TransactionList from "./TransactionList";
import AccountActions from "./AccountActions";

export default function AccountDashboard() {
  return (
    <div className="account-dashboard">
      <TransactionList />
      <AccountActions />
    </div>
  );
}

import AccountContext from "../context/AccountContext";
import { useContext } from "react";
import { getCurrentDate, getCurrentTime } from "../utils/utils";

export default function Header() {
  const { currentUserBalance, currencySymbol, currentAccountOwner } =
    useContext(AccountContext);

  return (
    <header className="current-balance-header">
      <div>
        <h1>
          Current Balance: {currencySymbol}{" "}
          {currentUserBalance.toLocaleString()}
        </h1>
        <p>
          As of {getCurrentDate()}, {getCurrentTime()}
        </p>
      </div>
      <div>
        <h3 className="current-account-owner">
          Welcome, {currentAccountOwner}
        </h3>
      </div>
    </header>
  );
}

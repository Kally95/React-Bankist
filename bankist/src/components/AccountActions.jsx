import AccountContext from "../context/AccountContext";
import { useContext, useState } from "react";
import { getNonFormattedDate } from "../utils/utils";
import AccountAction from "./AccountAction";

export default function AccountActions() {
  const { state, dispatch, currentUserBalance } = useContext(AccountContext);
  const [errors, setErrors] = useState({
    transfer: "",
    loan: "",
    deposit: "",
  });

  function handleTransferMoney(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const payee = fd.get("transfer-to");
    const amount = +fd.get("amount");

    const accountExists = state.accounts.some(
      (account) => account.owner === payee,
    );

    if (accountExists && amount > 0 && currentUserBalance - amount > 0) {
      dispatch({
        type: "TRANSFER_MONEY",
        payload: {
          amount: amount,
          payee: payee,
          date: getNonFormattedDate(),
          transfer: true,
        },
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        transfer: "Please check your amount and available funds",
      }));
    }
    event.target.reset();
  }

  function handleRequestLoan(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const amount = +fd.get("request-loan");

    if (currentUserBalance > 0 && amount > 0) {
      dispatch({
        type: "REQUEST_LOAN",
        payload: {
          amount: amount,
          date: getNonFormattedDate(),
          type: "deposit",
        },
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        loan: "Ensure you have a positive balance and an amount greater than zero.",
      }));
    }
    event.target.reset();
  }

  function handleDeposit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const amount = +fd.get("deposit");
    if (amount <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        deposit: "Deposit amount must greater than zero",
      }));
      return;
    }

    dispatch({
      type: "DEPOSIT",
      payload: {
        amount: amount,
        date: getNonFormattedDate(),
        type: amount > 0 ? "deposit" : "withdraw",
      },
    });
    event.target.reset();
  }

  function clearError(type) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [type]: "",
    }));
  }

  return (
    <aside className="account-actions">
      <AccountAction
        className="account-actions__section"
        title="Transfer money"
        onSubmit={handleTransferMoney}
      >
        <div className="account-actions__group">
          <label htmlFor="transfer-to">Transfer to:</label>
          <input
            onFocus={() => clearError("transfer")}
            type="text"
            id="transfer-to"
            name="transfer-to"
          />
        </div>
        <div className="account-actions__group">
          <label htmlFor="amount">Amount:</label>
          <input
            onFocus={() => clearError("transfer")}
            type="number"
            id="amount"
            name="amount"
          />
        </div>
        {errors.transfer && <p className="error-message">{errors.transfer}</p>}
      </AccountAction>

      <AccountAction
        className="account-actions__section"
        title="Request loan"
        onSubmit={handleRequestLoan}
      >
        <div className="account-actions__group">
          <label htmlFor="request-loan">Request loan:</label>
          <input
            onFocus={() => clearError("loan")}
            type="number"
            id="request-loan"
            name="request-loan"
          />
        </div>
        {errors.loan && <p className="error-message">{errors.loan}</p>}
      </AccountAction>

      <AccountAction
        className="account-actions__section"
        title="Deposit"
        onSubmit={handleDeposit}
      >
        <div className="account-actions__group">
          <label htmlFor="deposit">Deposit:</label>
          <input
            onFocus={() => clearError("deposit")}
            type="number"
            id="deposit"
            name="deposit"
          />
        </div>
        {errors.deposit && <p className="error-message">{errors.deposit}</p>}
      </AccountAction>
    </aside>
  );
}

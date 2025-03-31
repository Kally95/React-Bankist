import "./App.css";
import AccountDashboard from "./components/AccountDashboard";
import Header from "./components/Header";
import { AccountContextProvider } from "./context/AccountContext";

function App() {
  return (
    <>
      <main className="main-container">
        <AccountContextProvider>
          <Header />
          <AccountDashboard />
        </AccountContextProvider>
      </main>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import BankPage from "./pages/BankPage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/bank" element={<BankPage />} />
                <Route path="/" element={<DashboardPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/transaction" element={<TransactionPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

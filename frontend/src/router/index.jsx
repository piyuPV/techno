import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/DashBoard";
import LandingPage from "../pages/LandingPage";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import UploadInvoicePage from "../pages/UploadInvoicePage";

const PrivateRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes wrapped in PublicLayout */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Private Routes wrapped in PrivateLayout */}
                <Route element={
                    <PrivateRoute>
                        <PrivateLayout />
                    </PrivateRoute>
                }>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/invoices/upload" element={
                        <UploadInvoicePage />

                    } />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
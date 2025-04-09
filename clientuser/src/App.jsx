import "./App.css";
import "./assets/styles/globals.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";

import UserProtectedRoute from "./components/protected-route/UserProtectedRoute";

import NotFound from "./pages/not-found/NotFound";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import Checkout from "./pages/user/Checkout";
import Profile from "./pages/user/Profile";
import OrderSuccess from "./pages/user/OrderSuccess";

function App() {

    return (
        <Routes>

            <Route element={<UserProtectedRoute />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/" element={<RegisterModal isOpen={true} />} /> */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-success" element={<OrderSuccess />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;

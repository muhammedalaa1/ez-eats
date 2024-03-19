import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ReactNode } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Nav from "./components/Navbar";
import Orders from "./components/Orders";
// Import Parse minified version
//@ts-ignore
import Parse from "parse/dist/parse.min.js";
import { authenticated } from "./context/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditOrder from "./components/editOrder";
Parse.initialize(
    "Vu7OoP6tdDm9K9Gnnjlcv5GpgDiakjO1c68Q2nsD",
    "mFJe7yHyaFZYKRjFSUFFXb8njgPqa0GLPgAzNJLQ"
);
Parse.serverURL = "https://ez-eats.b4a.io";
function Protect({
    protect = false,
    children,
}: {
    children: ReactNode;
    protect?: boolean;
    name?: string;
    role?: string;
}) {
    const authed = authenticated();
    if (!protect && authed) return <Navigate to="/" />;
    if (protect && !authed) return <Navigate to="/login" />;
    return children;
}
function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Protect>
                            <Login />
                        </Protect>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Protect>
                            <Signup />
                        </Protect>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <Protect protect>
                            {" "}
                            <Orders />
                        </Protect>
                    }
                />
                <Route
                    path="/orders/:id"
                    element={
                        <Protect protect>
                            <EditOrder />
                        </Protect>
                    }
                />

                <Route path="/" element={<Home />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;

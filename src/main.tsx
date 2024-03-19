import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.tsx";
import { ParseProvider } from "./context/parse.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ParseProvider>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </ParseProvider>
);

import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/NavBar";

export default function App() {

    return (
        <div className="container">
            <NavBar />
            <Outlet />
        </div>
    )
}
import { Outlet, useNavigation, useRouteLoaderData } from "react-router-dom"
import { AuthState } from "../types/auth";
import Link from "../components/nav/Link";
import "../assets/loader.css";

const Root = () => {
    const { user } = useRouteLoaderData("root") as AuthState;
    const navigation = useNavigation();

    return (
        <>
            <nav className="px-4 py-2 border-b flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/parcels">Parcels</Link>
                <Link to="/about">About</Link>
                {user && <Link to="/logout">Logout</Link>}
            </nav>
            <hr />
            <div className={navigation.state == "loading" ? "opacity-50 transition-all p-5 " : "p-5"} >
                {navigation.state == "loading" ? (<div className="p-6"><div className="loader"></div></div>) : ""}
                <Outlet />
            </div>
        </>

    )
}
export default Root
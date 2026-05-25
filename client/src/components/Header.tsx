import { useAuth } from "../context/AuthContext";
import HeaderConnected from "./HeaderConnected";
import HeaderDisconnected from "./HeaderDisconnected";

export default function Header() {

    const auth = useAuth();
    if(!auth) return null;
    const { isAuth } = auth;

    return isAuth ? <HeaderConnected/> : <HeaderDisconnected/>;
}
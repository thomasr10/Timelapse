import { useAuth } from "../context/AuthContext";
import HomepageConnected from "./HomepageConnected";
import HomepageDisconnected from "./HomepageDisconnected";

export default function Homepage() {

    const auth = useAuth();
    if (!auth) return null;
    const { isAuth } = auth;

    return isAuth ? <HomepageConnected/> : <HomepageDisconnected/>

}
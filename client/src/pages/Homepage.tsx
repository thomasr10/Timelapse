import AuthSwitch from "../components/AuthSwitch";
import HomepageConnected from "./HomepageConnected";
import HomepageDisconnected from "./HomepageDisconnected";

export default function Homepage() {
    
    return <AuthSwitch connected={<HomepageConnected/>} disconnected={<HomepageDisconnected/>}/>
}
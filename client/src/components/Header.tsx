import AuthSwitch from "./AuthSwitch";
import HeaderConnected from "./HeaderConnected";
import HeaderDisconnected from "./HeaderDisconnected";

export default function Header() {

    return <AuthSwitch connected={<HeaderConnected/>} disconnected={<HeaderDisconnected/>}/>
}
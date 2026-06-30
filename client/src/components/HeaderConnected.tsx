import { Link } from "react-router-dom";
import { CircleUserRound, Menu } from 'lucide-react';
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function HeaderConnected() {
    
    const [isOpen, setIsOpen] = useState(false);

    const handleBurgerMenu = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return (
        <header className="header section-container">
            <div className="logo-container">
                <Link to={'/'}>Time<span className="accent">lapse</span></Link>
            </div>
            {/* BURGER MENU */}
            <div className="burger-container">
                <Menu className="burger-icon" onClick={() => handleBurgerMenu()} />
                <nav className={`burger-menu ${isOpen ? 'open' : ''}`}>
                    {/* <Link to={'/community'} className="burger-connected-link"><UsersRound />Communauté</Link>
                    <div className="separator"></div>
                    <Link to={'/'} className="burger-connected-link"><Bell />Notifications</Link> */}
                    {/* <div className="separator"></div> */}
                    <Link className="burger-connected-link" to={'/profile'}><CircleUserRound />Profil</Link>

                </nav>
            </div>
            {/* DESKTOP MENU */}
            <SearchBar className={"search-container"}/>

            <div className="header-connected-link">
                {/* <Link to={'/community'} className="community-icon"><UsersRound /></Link>
                <Bell /> */}
                <Link to={'/profile'} className="profile-icon"><CircleUserRound /></Link>
            </div>
        </header>
    )
}
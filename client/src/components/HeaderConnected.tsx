import { Link } from "react-router-dom";
import { Bell, CircleUserRound, Search, Menu, UsersRound } from 'lucide-react';
import { useState } from "react";

export default function HeaderConnected() {

    const [focused, setFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleBurgerMenu = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return (
        <header className="header">
            <div className="logo-container">
                <Link to={'/'}>Time<span className="accent">lapse</span></Link>
            </div>
            {/* BURGER MENU */}
            <div className="burger-container">
                <Menu className="burger-icon" onClick={() => handleBurgerMenu()} />
                <nav className={`burger-menu ${isOpen ? 'open' : ''}`}>
                    <Link to={'/community'} className="burger-connected-link"><UsersRound />Communauté</Link>
                    <div className="separator"></div>
                    <Link to={'/'} className="burger-connected-link"><Bell />Notifications</Link>
                    <div className="separator"></div>
                    <Link className="burger-connected-link" to={'/profile'}><CircleUserRound />Profil</Link>

                </nav>
            </div>
            {/* DESKTOP MENU */}
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Rechercher un film, une série, un acteur ou un utilisateur..."
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <Search className={`search-icon ${focused ? 'focused' : ''}`} />
            </div>
            <div className="header-connected-link">
                <Link to={'/community'} className="community-icon"><UsersRound /></Link>
                <Bell />
                <Link to={'/profile'} className="profile-icon"><CircleUserRound /></Link>
            </div>
        </header>
    )
}
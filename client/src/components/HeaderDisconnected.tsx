import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function HeaderDisconnected() {

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
                <Menu className="burger-icon" onClick={() => handleBurgerMenu()}/>
                <nav className={`burger-menu ${ isOpen ? 'open' : ''}`}>
                    <Link to={'/login'}>Se connecter</Link>
                    <div className="separator"></div>
                    <Link to={'/register'}>S'inscrire</Link>
                </nav>
            </div>
            {/* DESKTOP MENU */}
            <nav className="header-link">
                <Link to={'/login'}>Se connecter</Link>
                |
                <Link to={'/register'}>S'inscrire</Link>
            </nav>
        </header>
    )
}
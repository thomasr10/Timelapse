import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <>
            <h1>Oups !</h1>
            <main className="not-found-page">
                <p>La page que vous recherchez semble introuvable.</p>
                <Link to={'/'}>Retourner à l'accueil</Link>
            </main>
        </>
    )
}
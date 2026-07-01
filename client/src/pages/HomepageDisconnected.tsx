import { useNavigate } from "react-router-dom"
import { fetchTrendingMovies } from "../api/tmdb";
import { useEffect, useState } from "react";
import PromoCard from "../components/PromoCard";
import { ListCheck, MessageSquarePlus, Sparkles } from "lucide-react";
import type { Media } from "./HomepageConnected";
import SliderMedia from "../components/SliderMedia";

export default function HomepageDisconnected() {

    const [backdropPath, setBackdropPath] = useState("");
    const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);

    // navigation bouton
    const navigate = useNavigate();
    const onNavigate = () => {
        navigate('/register')
    }

    // Backdrop image
    useEffect(() => {
        fetchTrendingMovies()
            .then((data) => {
                setBackdropPath(data.results[0].backdrop_path);
                setTrendingMovies(data.results)
            })
    }, [])

    return (
        <>
            <main id="home-disconnected">
                <section id="hero">

                    <figure id="backdrop-hero">
                        <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}original${backdropPath}`} alt="Image d'un film" loading="lazy"/>
                    </figure>
                    <section id="hero-disconnected" className="section-container">
                        <h1>Rejoignez la plus grande communauté de <span>passionés</span> de cinéma.</h1>
                        <p>Notez, partagez et découvrez vos prochaines œuvres préférées.</p>
                        <div>
                            <button onClick={onNavigate} className="btn main-btn red-btn">Créez un compte gratuitement</button>
                        </div>
                    </section>

                </section>
                <section id="join-us" className="section-container">
                    <h2>Pourquoi rejoindre Timelapse ?</h2>
                    <p>Tout ce dont un cinéphile a besoin, en un seul endroit.</p>
                    <section id="promo-card-container">
                        <PromoCard icon={<MessageSquarePlus />} name="Partagez vos avis" content="Exprimez votre passion. Notez et critiquez les derniers films et séries avec vos amis et notre communauté." />
                        <PromoCard icon={<ListCheck />} name="Créez vos watchlists" content="Organisez vos futures séances. Enregistrez vos envies de visionnage et ne manquez plus jamais une sortie." />
                        <PromoCard icon={<Sparkles />} name="Découvrez des pépites" content="Laissez notre algorithme et la communauté vous guider vers vos futurs coups de cœur cinématographiques." />
                    </section>
                </section>
                <section id="trending" className="trending-movies media-slider-section mt-32 section-container">
                    <h2>Les tendances du moment</h2>
                    <SliderMedia media={trendingMovies} genres={[]} />
                </section>
                <section className="section-container">
                    <div id="cta">
                        <div id="cta-txt">
                            <h2>Prêt à vivre le cinéma autrement ?</h2>
                            <p>Rejoignez des passionés et commencez votre aventure dès aujourd'hui.</p>
                        </div>
                        <div className="btn-container">
                            <button onClick={onNavigate} className="btn main-btn white-btn">Créez un compte gratuitement</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
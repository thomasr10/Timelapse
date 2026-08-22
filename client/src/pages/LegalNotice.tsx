export default function LegalNotice() {
    return (
        <main id="legal-notice" className="section-container">
            <h1>Mentions légales</h1>

            <section className="mt-32">
                <h2>Éditeur du site</h2>
                <p className="mt-12">
                    Timelapse est un projet académique développé et édité par <strong>Thomas RIVOIRE</strong>,
                    dans le cadre d'une troisième année de Bachelor Développeur Full-Stack, DevOps et IA
                    au sein de l'école IPSSI.
                </p>
                <p className="mt-12">
                    Contact : <strong>[adresse email de contact]</strong>
                </p>
            </section>

            <section className="mt-32">
                <h2>Hébergement</h2>
                <p className="mt-12">
                    Ce projet est un exercice académique et n'est pas déployé publiquement.
                    L'application est exécutée en local, dans un environnement conteneurisé via Docker,
                    exclusivement dans le cadre de sa démonstration et de sa soutenance.
                </p>
            </section>

            <section className="mt-32">
                <h2>Propriété intellectuelle</h2>
                <p className="mt-12">
                    L'ensemble des éléments de l'application (interface, charte graphique, code source)
                    est la propriété de son auteur, sauf mention contraire. Les informations relatives
                    aux films et séries (titres, affiches, synopsis, casting) proviennent de l'API TMDB
                    et restent la propriété de leurs ayants droit respectifs.
                </p>
            </section>

            <section className="mt-32">
                <h2>Données personnelles</h2>
                <p className="mt-12">
                    Dans le cadre de son utilisation, Timelapse collecte certaines données personnelles
                    nécessaires à son fonctionnement : nom d'utilisateur, adresse email, mot de passe
                    (haché et jamais stocké en clair), ainsi que les contenus publiés par l'utilisateur
                    (reviews, notes, watchlists).
                </p>
                <p className="mt-12">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), chaque
                    utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses
                    données. Ces informations peuvent être consultées et modifiées à tout moment depuis
                    la page de profil, et le compte ainsi que les données associées peuvent être
                    supprimés définitivement par l'utilisateur lui-même, sans intervention nécessaire
                    de l'éditeur.
                </p>
                <p className="mt-12">
                    Aucune donnée personnelle n'est transmise à des tiers à des fins commerciales.
                </p>
            </section>

            <section className="mt-32">
                <h2>Cookies</h2>
                <p className="mt-12">
                    L'application utilise des cookies strictement nécessaires à son fonctionnement :
                </p>
                <ul className="mt-12">
                    <li>
                        un cookie d'authentification (httpOnly), contenant le token JWT permettant de
                        maintenir la session de l'utilisateur connecté ;
                    </li>
                    <li>
                        un cookie technique contenant un jeton CSRF, destiné à protéger l'application
                        contre les attaques de type Cross-Site Request Forgery.
                    </li>
                </ul>
                <p className="mt-12">
                    Aucun cookie de suivi publicitaire ou statistique n'est utilisé par l'application.
                </p>
            </section>

            <section className="mt-32">
                <h2>Services tiers</h2>
                <p className="mt-12">
                    Timelapse s'appuie sur l'API <strong>The Movie Database (TMDB)</strong> pour
                    l'ensemble des données relatives aux films et séries affichées dans l'application.
                    Timelapse n'est ni produit, ni approuvé, ni certifié par TMDB.
                </p>
            </section>

            <section className="mt-32">
                <h2>Responsabilité</h2>
                <p className="mt-12">
                    Timelapse est un projet réalisé dans un cadre strictement académique et pédagogique.
                    Il ne constitue pas un service commercial et son éditeur ne saurait être tenu
                    responsable d'un usage détourné de l'application ou d'éventuelles indisponibilités
                    liées à son caractère non déployé publiquement.
                </p>
            </section>

            <section className="mt-32">
                <h2>Contact</h2>
                <p className="mt-12">
                    Pour toute question relative à ces mentions légales ou à l'utilisation de vos
                    données, vous pouvez contacter l'éditeur à l'adresse suivante :
                    <strong>t.rivoire1@ecole-ipssi.net</strong>.
                </p>
            </section>
        </main>
    );
}

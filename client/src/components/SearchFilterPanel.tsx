interface Props {
    categorie: string,
    setCategorie: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchFilterPanel({ categorie, setCategorie }: Props) {

    

    return (
        <div className="search-panel">
            <div className="results-choice-container">
                <div className="choice-container">
                    <button
                        value="films"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "films" ? "focused-btn" : ""}`}
                    >
                        Films
                    </button>
                    <button
                        value="series"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "series" ? "focused-btn" : ""}`}
                    >
                        Séries
                    </button>
                    <button
                        value="cast"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "cast" ? "focused-btn" : ""}`}
                    >
                        Cast
                    </button>
                    <button
                        value="users"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "users" ? "focused-btn" : ""}`}
                    >
                        Utilisateurs
                    </button>
                </div>
                <div className="results-container"></div>
            </div>
        </div>
    )
}
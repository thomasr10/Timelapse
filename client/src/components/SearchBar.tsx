import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchFilterPanel from "./SearchFilterPanel";
import { fetchMovieByTitle } from "../api/tmdb";
import type { Media } from "../pages/HomepageConnected";

export default function SearchBar({ className }: { className: string }) {

    const [focused, setFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [categorie, setCategorie] = useState("movie");
    const [medias, setMedias] = useState<Media[] | undefined>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setFocused(false);
                if (inputRef.current) inputRef.current.value = "";
                setMedias([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    // fetch content from user'search
    const searchContent = async (value: string, categorie: string) => {
        if (value.length < 3) {
            if (value === "") {
                setMedias([]);
            }

            return;
        }

        if (categorie === "movie") {
            await fetchMovieByTitle(value)
                .then(data => {
                    setMedias(data.results)
                })
        }
    }

    return (
        <div className={className} ref={containerRef}>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Rechercher un film, une série, un acteur ou un utilisateur..."
                onFocus={() => setFocused(true)}
                onChange={(e) => searchContent((e.target as HTMLInputElement).value, categorie)}
                autoComplete="off"
                ref={inputRef}
            />
            <Search className={`search-icon ${focused ? 'focused' : ''}`}/>
            {focused && (
                <SearchFilterPanel
                    categorie={categorie}
                    setCategorie={setCategorie}
                    medias={medias}
                    onSelect={() => setFocused(false)}
                    inputRef={inputRef}
                />
            )}
        </div >

    )
}
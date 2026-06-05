import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchFilterPanel from "./SearchFilterPanel";
import { fetchMovieByTitle } from "../api/tmdb";

export default function SearchBar({ className }: { className: string }) {

    const [focused, setFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [categorie, setCategorie] = useState("films");

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setFocused(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    const searchContent = async(value: string, categorie: string) => {
        if (value.length < 3) return;

        if (categorie === 'films') {
            await fetchMovieByTitle(value)
                .then(data => {
                    console.log(data)
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
            />
            <Search className={`search-icon ${focused ? 'focused' : ''}`} />
            { focused && (<SearchFilterPanel categorie={categorie} setCategorie={setCategorie}/>) }
        </div >

    )
}
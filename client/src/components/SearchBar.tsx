import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchFilterPanel from "./SearchFilterPanel";

export default function SearchBar({ className }: { className: string}) {

    const [focused, setFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside =(e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setFocused(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    return (
        <div className={className} ref={containerRef}>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Rechercher un film, une série, un acteur ou un utilisateur..."
                onFocus={() => setFocused(true)}
            />
            <Search className={`search-icon ${focused ? 'focused' : ''}`} />
            {
                focused && (
                    <SearchFilterPanel />
                )
            }
        </div >

    )
}
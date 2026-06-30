import { Link } from "react-router-dom";
import type { User } from "../types/auth";
import { formatUsername } from "../utils/formatText";

interface Props {
    user: User,
    categorie: string,
    onSelect: () => void,
    inputRef: React.RefObject<HTMLInputElement | null>
}

export default function PanelUserCard({ user, categorie, onSelect, inputRef }: Props) {

    // Empty input + close panel
    const clearInterface = () => {
        onSelect();
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        return;
    }

    return (
        <Link 
            to={(categorie !== "cast") ? `/${user.username}` : "#"}
            onClick={() => clearInterface()}
        >
            <div className="panel-media-card">
                <img
                    src={ user.profile_picture ?
                        `${import.meta.env.VITE_IMAGE_BASE_URL}/${user.profile_picture}` :
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=111726&color=A9B4C6`
                    }
                    alt="Photo de profil de l'utilisateur"
                    style={
                        !user?.profile_picture ? {
                            borderRadius: '50%',
                            height: "60px",
                            width: "60px",
                            objectFit: "cover"
                        } : {}
                    }
                />
                <div className="infos">
                    <p className="title">{user.display_username}</p>
                    <p className="date">{formatUsername(user.username)}</p>
                </div>
            </div>
        </Link>
    )
}
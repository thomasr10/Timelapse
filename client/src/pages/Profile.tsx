import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { formatDate } from "../utils/formatDate";
import { formatUsername } from "../utils/formatText";
import type { UserRecords } from "../types/api";
import { getUserRecords } from "../api/api";

export default function Profile() {

    const { user } = useAuth();

    const [userRecords, setUserRecords] = useState<UserRecords | null>(null);

    useEffect(() => {
        getUserRecords()
            .then(data => setUserRecords(data.results));
    }, [])

    return (
        <main className="section-container">
            <section id="user-profile">
                <figure>
                    <img src={`${user?.profile_picture}`} alt="Photo de profil de l'utilisateur" />
                </figure>
                <div>
                    <div>
                        <p>{user?.display_username}</p>
                    </div>
                    <div>
                        <p>{formatUsername(user?.username)}</p>
                        <p>Membre depuis {formatDate(user?.created_at)?.getFullYear()}</p>
                    </div>
                    <div>
                        {userRecords?.watched_medias}
                        {userRecords?.followers}
                    </div>
                </div>
            </section>
        </main>
    )
}
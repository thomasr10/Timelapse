import { useEffect, useState } from "react"
import { followedUserActivities } from "../api/api"
import type { RecentActivity } from "../types/api"
import CommunityCard from "../components/CommunityPage/CommunityCard";

export default function CommunityPage() {

    const [userActivities, setUserActivities] = useState<RecentActivity[] | null>(null);

    useEffect(() => {
        followedUserActivities()
            .then(data => {
                console.log(data);
                setUserActivities(data.results);
            })
    }, [])

    return (
        <main className="section-container mt-32">
            <section className="flex-col gap-24">
                {
                    userActivities !== null ? (
                        userActivities.map((a: RecentActivity, index) => (
                            <CommunityCard
                                key={index}
                                type={a.type}
                                created_at={a.created_at}
                                user={a.user}
                                watchlist={a.watchlist}
                                user_media={a.user_media}
                                user_followed={a.user_followed}
                                media={a.media}
                                review={a.review}
                            />
                        ))
                    ) :

                    <p>Aucune activité récente</p>
            }
            </section>
        </main>
    )
}
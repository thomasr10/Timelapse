import { Star, ThumbsUp } from "lucide-react"
import { formatReviewDate } from "../utils/formatDate"

interface Props {
    profile_picture: string | undefined,
    username: string,
    date: string,
    note: number | null,
    content: string,
    likes: number
}

export default function ReviewCard({ profile_picture, username, date, content, note, likes }: Props) {

    return (
        <div className="review flex-col gap-16">
            <div className="flex-row justify-between align-center">
                <div className="flex-row gap-12">
                    <img
                        src={profile_picture !== "" ?
                            profile_picture :
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=111726&color=A9B4C6`
                        }
                        alt="Photo de profil de l'utilisateur"
                        loading="lazy"
                    />
                    <div className="flex-col gap-4">
                        <p className="username">{username}</p>
                        <p className="date">{formatReviewDate(date)}</p>
                    </div>
                </div>
                <div className="note">

                    {
                        note !== null ?
                            <p className="flex-row gap-4"><Star className="icon" />{note}</p>
                            : <p>N/A</p>
                    }
                </div>
            </div>
            <p className="content">{content}</p>
            <p className="likes flex-row gap-4 align-center"><ThumbsUp className="icon" />{likes}</p>
        </div>
    )
} 
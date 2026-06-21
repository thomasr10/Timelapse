import { Star, ThumbsUp } from "lucide-react"

interface Props {
    profile_picture: string,
    username: string,
    date: string,
    note: number
    content: string,
    likes: number
}

export default function ReviewCard({ profile_picture, username, date, content, note, likes }: Props) {

    return (
        <div className="review flex-col gap-16">
            <div className="flex-row justify-between align-center">
                <div className="flex-row gap-12">
                    <img src={profile_picture} alt="Photo de profil de l'utilisateur" />
                    <div className="flex-col gap-4">
                        <p className="username">{username}</p>
                        <p className="date">{date}</p>
                    </div>
                </div>
                <div className="note">
                    <p className="flex-row gap-4"><Star className="icon"/>{note}</p>
                </div>
            </div>
            <p className="content">{content}</p>
            <p className="likes flex-row gap-4 align-center"><ThumbsUp className="icon"/>{likes}</p>
        </div>
    )
} 
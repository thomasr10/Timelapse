import { Link } from "react-router-dom";
import type { User } from "../../types/auth";
import { formatUsername } from "../../utils/formatText";

type Props = {
    user_followed: User | null | undefined
}

export default function FollowContent({ user_followed }: Props) {

    return (
        <div className="content">
            <div className="info">
                <p className="action">
                    A commencé à suivre
                    <Link to={`/${user_followed?.username}`}>
                         <span className="user-follow"> {formatUsername(user_followed?.username)}</span>
                    </Link>
                    </p>
            </div>
        </div>
    )
}
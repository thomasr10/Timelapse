import { useEffect } from "react"
import { followedUserActivities } from "../api/api"

export default function CommunityPage() {

    useEffect(() => {
        followedUserActivities()
            .then(data => console.log(data))
    }, [])

    return
}
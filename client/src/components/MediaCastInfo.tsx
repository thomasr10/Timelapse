interface Props {
    id: number,
    name: string,
    profile_path: string,
    character: string
}

export default function MediaCastInfo({ id, name, profile_path, character }: Props) {

    return (
        <div className="media-cast-component" id={id.toString()}>
            <img
                src={profile_path 
                    ?
                        `${import.meta.env.VITE_API_IMAGE_BASE_URL}w300/${profile_path}` 
                    :
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=111726&color=A9B4C6`
                    }
                    alt={`Photo de ${name}`}
                    loading="lazy"
            />
            <div className="name-container">
                <p className="name">{name}</p>
                <p className="character">{character}</p>
            </div>
        </div>
    )
}
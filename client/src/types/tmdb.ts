export type Genre = {
    id: number,
    name: string
}

export type CrewMember = {
    id: number,
    name: string,
    job: string,
    department: string
}

export type CastMember = {
    id: number,
    name: string,
    character: string,
    profile_path: string,
    popularity: number
}
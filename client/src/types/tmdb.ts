export type Genre = {
    id: number,
    name: string
}

export interface CrewMember {
    id: number,
    name: string,
    job: string,
    department: string
}

export interface CastMember {
    id: number,
    name: string,
    character: string,
    profile_path: string
}
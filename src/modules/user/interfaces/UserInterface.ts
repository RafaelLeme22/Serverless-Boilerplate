export interface UserInterface {
    id?: number,
    name?: string,
    email?: string,
    createdAt?: Date,
    deletedAt?: Date,
    updatedAt?: Date
}

export interface DeleteMultipleUsersInterface {
    ids: number[]
}

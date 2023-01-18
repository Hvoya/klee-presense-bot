export type User = {
    id: string,
    username?: string,
    name: string,
    surname?: string,
    chat_id: number,
}

export type Presense = {
    id: string,
    date: string,
    probability: number,
    comment: string,
    user_id: string
}

export type UserWithPresenses = User & { presenses: Presense[] };

export type PresenseWithUser = Presense & { user: User };

export type StorageData = {
    userById: Record<string, User>,
    usersIds: string[],
    presenseById:  Record<string, Presense>,
    presensesIds: string[],
}
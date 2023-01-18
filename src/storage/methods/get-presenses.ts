import { PresenseWithUser, StorageData } from "../storage.types";

export const getPresenses = (data: StorageData, date: string): PresenseWithUser[] => 
    data.presensesIds
        .filter(id => data.presenseById[id].date === date)
        .map(id => ({...data.presenseById[id], user: data.userById[data.presenseById[id].user_id]}));
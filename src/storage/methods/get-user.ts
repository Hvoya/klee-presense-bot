import _ from 'lodash';

import { StorageData, User } from "../storage.types"


export const getUser = (data: StorageData, userId: string) =>  {
    return data.userById[userId]
}
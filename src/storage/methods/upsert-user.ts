import _ from 'lodash';
import { formatUserId } from '../../helpers/format-user-id';

import { StorageData, User } from "../storage.types"

type UpsertUserPayload = Omit<User, 'id'> & { telegram_id: number };


export const upsertUser = (data: StorageData, payload: UpsertUserPayload) =>  {
    const userId = formatUserId(payload.telegram_id);

    const user = {
        username: payload.username,
        name: payload.name,
        surname: payload.surname,
        chat_id: payload.chat_id,
        id: userId
    }

    const usersIds = Array.from(new Set([...data.usersIds, userId]));

    return _(data).set(['userById', userId], user).set(['usersIds'], usersIds).value();
}
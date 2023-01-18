import _ from 'lodash';
import { getPresenseId } from '../../helpers/get-presense-id';

import { Presense, StorageData } from "../storage.types"

export type UpsertPresensePayload = Omit<Presense, 'id'>


export const upsertPresense = (data: StorageData, payload: UpsertPresensePayload) => {
    const presenseId = getPresenseId(payload.date, payload.user_id);

    const presense = {...payload, id: presenseId};

    const presensesIds =  [...data.presensesIds, presenseId];

    return _(data)
        .set(['presenseById', presenseId], presense)
        .set('presensesIds', presensesIds)
        .value();
}
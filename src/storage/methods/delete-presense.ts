import _ from 'lodash';
import { getPresenseId } from '../../helpers/get-presense-id';

import { StorageData } from "../storage.types"

export type DeletePresensePayload = {
    user_id: string,
    date: string,
}


export const deletePresense = (data: StorageData, payload: DeletePresensePayload) => {
    const presenseId = getPresenseId(payload.date, payload.user_id);

    const presenseById = {...data.presenseById};
    delete presenseById[presenseId];

    const presenseIds = data.presensesIds.filter(id => id !== presenseId)

    return _(data)
        .set(['presenseById', presenseId], presenseById)
        .set('presensesIds', presenseIds)
        .value();
}
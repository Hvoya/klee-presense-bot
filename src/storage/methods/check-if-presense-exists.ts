import { getPresenseId } from "../../helpers/get-presense-id";
import { StorageData } from "../storage.types";

export type CheckIfPresenseExistsPayload = {
    user_id: string,
    date: string,
}

export const checkIfPresenseExists = (data: StorageData, payload: CheckIfPresenseExistsPayload): boolean => {
    const presenseId = getPresenseId(payload.date, payload.user_id);

    return !!data.presenseById[presenseId];
}
import { checkIfPresenseExists } from "./methods/check-if-presense-exists";
import { deletePresense } from "./methods/delete-presense";
import { getPresenses } from "./methods/get-presenses";
import { getUser } from "./methods/get-user";
import { upsertPresense } from "./methods/upsert-presense";
import { upsertUser } from "./methods/upsert-user";
import { StorageData } from "./storage.types";
import { load, write } from "./sync";

export const getStorage = () => {
    let data = load();

    const getSetter= <T>(f: (data: StorageData, payload: T) => StorageData) =>
        (payload: T): StorageData => {
            const newData = f(data, payload);

            write(newData);

            data = newData;

            return newData;
        }

    const getGetter = <T, D>(f: (data: StorageData, payload: T) => D) =>
        (payload: T): D => f(data, payload);

    return {
        update: () => data = load(),
        user: {
            upsert: getSetter(upsertUser),
            get: getGetter(getUser)
        },
        presense: {
            upsert: getSetter(upsertPresense),
            get: getGetter(getPresenses),
            delete: getSetter(deletePresense),
            checkIfExists: getGetter(checkIfPresenseExists)
        },
    }
}

export type Storage = ReturnType<typeof getStorage>;
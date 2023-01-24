import fs from 'fs';
import path from 'path';
import { StorageData } from './storage.types';

export const write = (data: StorageData) => {
    fs.writeFileSync(`${process.env.STORAGE_PATH}/storage.json`, JSON.stringify(data, null, 4));
}

export const load = (): StorageData => {
    const file = fs.readFileSync(`${process.env.STORAGE_PATH}/storage.json`).toString();

    return JSON.parse(file.toString());
}
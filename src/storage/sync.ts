import fs from 'fs';
import path from 'path';
import { StorageData } from './storage.types';

export const write = (data: StorageData) => {
    fs.writeFileSync(path.resolve(process.cwd(), './data/storage.json'), JSON.stringify(data));
}

export const load = (): StorageData => {
    const file = fs.readFileSync(path.resolve(process.cwd(), './data/storage.json')).toString();

    return JSON.parse(file.toString());
}
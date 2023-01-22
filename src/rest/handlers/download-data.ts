import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const downloadDataHandler = (_: Request, res: Response) => {
    const data = fs.readFileSync(`${process.env.STORAGE_PATH}/storage.json`).toString();

    const json = JSON.parse(data);
    
    res.status(200).json(json)
};
import { Request, Response } from 'express';
import fs from 'fs';

export const uploadDataHandler = (req: Request, res: Response) => {
    fs.writeFileSync(
        `${process.env.STORAGE_PATH}/storage.json`,
        JSON.stringify(req.body)
    );
    
    console.log('called')
    return res.status(200).send();
};
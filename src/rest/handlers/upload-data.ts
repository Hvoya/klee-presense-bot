import { Request, Response } from 'express';
import fs from 'fs';

export const uploadDataHandler = (req: Request, res: Response) => {
    fs.writeFileSync(
        `${process.env.STORAGE_PATH}/storage.json`,
        JSON.stringify(req.body)
    );
    
    return res.status(200);
};
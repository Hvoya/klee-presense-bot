import express from 'express';
import { downloadDataHandler } from './handlers/download-data';

export const initRestServer = () => {
    const app = express();

    app.get('/storage', downloadDataHandler)

    app.listen(2000, () => console.log('REST api starts on port 2000'))
}
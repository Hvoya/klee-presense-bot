import express from 'express';
import { downloadDataHandler } from './handlers/download-data';
import { uploadDataHandler } from './handlers/upload-data';

export const initRestServer = () => {
    const app = express();

    app.use(express.json())

    app.get('/storage', downloadDataHandler)
    app.post('/storage', uploadDataHandler)

    app.listen(2000, () => console.log('REST api starts on port 2000'))
}
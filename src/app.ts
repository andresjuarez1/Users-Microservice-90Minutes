import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {Signale} from "signale";

import { setupUserEndpoints } from './user_management/infraestructure/endpoints/UserEndpoints';
import cors from 'cors';
dotenv.config();

const app = express();
const signale = new Signale();
app.use(cors());

const HOST:string = process.env.HOST_SERVER || '0.0.0.0';
const PORT:number  = Number(process.env.PORT_SERVER) || 3002;

app.use(express.json()); 
app.use(morgan('dev'))
setupUserEndpoints(app);
let server = null;

async function startServer() {
    server = app.listen(PORT, HOST, () => {
        signale.success(`Server is running on http://${HOST}:${PORT}`);
    });
}
startServer();

export { app, server };
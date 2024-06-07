import dotenv from "dotenv";
import { MongoClient, MongoClientOptions, Collection } from "mongodb";
import { Signale } from "signale";

dotenv.config();

const signale = new Signale();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } as MongoClientOptions);

let collection: Collection;

export async function connect(collectionName: string): Promise<Collection | null> {
    try {
        await client.connect();
        signale.success('Conexion a la base de datos exitosa');
        const db = client.db();
        collection = db.collection(collectionName);
        return collection;
    } catch (error) {
        signale.error(error);
        return null;
    }
}

export { collection };
import {MongoClient} from "mongodb";


const client = new MongoClient(String(process.env.MONGODB_URI));


export async function getChar(handle) {
    try {
        await client.connect();
        const char = await client.db().collection("starchild").findOne({"handle": handle});
        await client.close();

        return char;
    } catch {
        console.log("FAILED TO CONNECT");
        return [];
    }
}

export async function updateHP()
{
    try {
        await client.connect();
        await client.db().collection("starchild").updateOne({"handle": "Silverlight"}, {"HP": 5})
        await client.close();
    } catch {
        console.log("FAILED TO UPDATE");
    }
}
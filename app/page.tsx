import {MongoClient} from 'mongodb';

const client = new MongoClient(String(process.env.MONGODB_URI));

async function getCharacters()
{
    try {
        await client.connect();
        const chars = await client.db().collection("starchild").find({}).toArray();
        await client.close();

        return chars;
    }
    catch {
        console.log("FAILED TO CONNECT");
        return [];
    }
}

export default async function Home() {

    const characters = await getCharacters();
    const test = characters[0];

    return (
        <main>
            <div className="charSelect">
            {characters?.map((char) => {
                return <a key={char.handle} href={char.handle}><button className="button-49" key={char.handle}>{char.handle}</button></a>
            })}
            </div>
        </main>
    )
}

function CharBtn({character}: any ){

}

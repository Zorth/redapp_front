import {useEffect, useState} from "react";
import axios from "axios";




export function Character() {

    const [characters, setCharacters] = useState();

    const fetchChar = async(processing) => {
            const url = 'http://192.168.1.100:4000/characters';
            axios.get(url).then((response) => {
                setCharacters(response.data);
            })

    }

    const postChar = async() =>
    {
        const charData = {
            handle: "franklin"
        }

        await axios.post('http://192.168.1.100:4000/charup', charData)
            .then(res => console.log(res.data))
    }

    useEffect(() => {
            let processing = true;
            fetchChar(processing);
            return () => {
                processing = false;
            }
        },
        []);

    console.log(characters);
    return (
        <div className="App">
            <h1>{characters ? characters.map((char) => {
                return <p key={char.handle}>{char.handle}</p>
            }) : "character fetch failed"}</h1>
            <button className="button-49" onClick={postChar}>POST CHAR</button>
        </div>
    )
}
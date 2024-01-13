import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";


export function Char() {
    const {id} = useParams();
    const [character, setCharacter] = useState({
        handle: "handle",
        full_name: "fullname",
        stats: {
            INT: 0,
            REF: 0,
            DEX: 0,
            TECH: 0,
            COOL: 0,
            WILL: 0,
            LUCK: 0,
            MOVE: 0,
            BODY: 0,
            baseEMP: 0,
            EMP: 0
        },
        skills: [],
        HP: 0,
        HUM: 0,
        headArmor: {
            Name: "",
            baseSP: 0,
            SP: 0
        },
        bodyArmor: {
            Name: "",
            baseSP: 0,
            SP: 0
        },
        equipment: [],
        cyberware: [],
        ammo: {
            current: 0,
            chamberSize: 0,
            total: 0
        },
        baseIP: 0,
        IP: 0,
        cash: 0
    });
    const [unpostedChanges, setUnpostedChanges] = useState(false);


    // fetch localCharacter every 2 seconds
    useEffect(() => {

            const interval = setInterval(async () => {

                if (unpostedChanges) {
                    const url = 'http://192.168.1.100:4000/characters/' + id;
                    await axios.put(url, character)
                        .then(function (response) {
                            console.log(response);
                            setUnpostedChanges(false);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    const url = 'http://192.168.1.100:4000/characters/' + id;
                    await axios.get(url).then((response) => {
                        setCharacter(response.data);
                    }).catch(e => console.log(e))
                }

            }, 2 * 1000);
            return () => clearInterval(interval);
        },
        [unpostedChanges, character, id]);


    const HPDown = () => {
        setCharacter({
            ...character,
            HP: character.HP - 1
        })
        setUnpostedChanges(true);
    }

    const HPUp = () => {
        setCharacter({
            ...character,
            HP: character.HP + 1
        })
        setUnpostedChanges(true);
    }


    return (
        <div className="char-base">
            <div className="handle">{character.handle}</div>
            <div className="HPBar-container">
                <div className="HPBar">
                    <div>-</div>
                    <div>{character.HP}/{10 + 5 * Math.ceil((character.stats.BODY + character.stats.WILL) / 2)}</div>
                    <div>+</div>
                </div>
                <div className="HPBar-Left" onClick={HPDown}></div>
                <div className="HPBar-Right" onClick={HPUp}></div>
            </div>
        </div>
    )
}
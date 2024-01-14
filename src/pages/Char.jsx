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
        wound: 0,
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
    const [maxHP, setMaxHP] = useState(10);


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
                        setMaxHP((10 + 5 * Math.ceil((response.data.stats.BODY + response.data.stats.WILL) / 2)))
                    }).catch(e => console.log(e))
                }

            }, 2 * 1000);
            return () => clearInterval(interval);
        },
        [unpostedChanges, character, id]);


    function calcWoundState() {
        if (character.HP < 1 || character.wound === 3) {
            return 3;
        } else if (character.HP < Math.ceil(maxHP / 2) || character.wound === 2) {
            return 2;
        } else if (character.HP < maxHP || character.wound === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    const HPDown = () => {
        if (character.HP > 0) {
            setCharacter({
                ...character,
                HP: --character.HP,
                wound: calcWoundState()
            })

            setUnpostedChanges(true);
        }
    }

    const stabilize = () =>
    {
        setCharacter({
            ...character,
            wound: 0
        })
    }


    const HPUp = () => {
        if (character.HP < maxHP) {
            setCharacter({
                ...character,
                HP: character.HP + 1
            })
            setUnpostedChanges(true);
        }
    }

    function woundstate() {
        switch (character.wound) {
            case 3:
                return <div onClick={stabilize} className="woundState-container mortally"><h1>Mortally Wounded</h1>
                    <h2>-4 to all Actions -6 to MOVE (Minimum 1) Must make a Death Save at start of each one of their
                        Turns. Mortally Wounded Characters suffer a Critical Injury whenever they are damaged by a Melee
                        or Ranged Attack. In addition, their Death Save Penalty increases by 1.</h2><h3>tap to
                        stabilize</h3>
                </div>;
            case 2:
                return <div onClick={stabilize} className="woundState-container seriously">
                    <div><h1>Seriously Wounded</h1><h2>-2 to all Actions</h2>
                        <h3>tap to stabilize</h3></div>
                </div>;
            case 1:
                return <div onClick={stabilize} className="woundState-container lightly"><h1>Lightly Wounded</h1><h3>tap to stabilize</h3>
                </div>;
            default:
                return <div className="woundState-container"><h1>Stable</h1></div>;
        }

    }

    return (
        <div className="char-base">
            <div className="handle">{character.handle}</div>
            <div className="HPBar-container">
                <div className="HPBar">
                    <div>-</div>
                    <div>{character.HP}/{maxHP}</div>
                    <div>+</div>
                </div>
                <div className="HPBar-Left" onClick={HPDown}></div>
                <div className="HPBar-Right" onClick={HPUp}></div>
            </div>
            {woundstate()}
        </div>
    )
}
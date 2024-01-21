import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import NumberPicker from "react-simple-picker";
import styles from '../index.css';
import {useSwipeable} from "react-swipeable";


export function Char() {
    const {id} = useParams();
    const [character, setCharacter] = useState({
        handle: "handle", full_name: "fullname", stats: {
            INT: 0, REF: 0, DEX: 0, TECH: 0, COOL: 0, WILL: 0, LUCK: 0, MOVE: 0, BODY: 0, baseEMP: 0, EMP: 0
        }, skills: [], HP: 0, wound: 0, HUM: 0, headArmor: {
            Name: "", baseSP: 0, SP: 0
        }, bodyArmor: {
            Name: "", baseSP: 0, SP: 0
        }, weapons: [], equipment: [], cyberware: [], ammo: [], baseIP: 0, IP: 0, cash: 0
    });
    const [unpostedChanges, setUnpostedChanges] = useState(false);
    const [maxHP, setMaxHP] = useState(10);
    const [weaponIndex, setWeaponIndex] = useState(0);

    const [ammoModalEnable, setAmmoModalEnable] = useState(false);

    //handle swipes
    const handlers = useSwipeable({
        onSwiped: (eventData) => console.log("User Swiped!", eventData),
    });

    // fetch localCharacter every 2 seconds
    useEffect(() => {

        const updateChar = async () => {
            // console.log("posting: " + unpostedChanges);
            if (unpostedChanges) {

                // const url_w = 'http://192.168.1.100:4000/w/' + character.weapons[weaponIndex]._id;
                // await axios.patch(url_w, character.weapons[weaponIndex])
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(e => console.log(e));


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
        }


        const interval = setInterval(updateChar, character.handle === "handle" ? 0 : (2 * 1000));
        return () => clearInterval(interval);
    }, [unpostedChanges, character, id, weaponIndex]);

    function header() {
        return <div className="Header">
            <h1 style={{marginLeft: "5vw", marginRight: "5vw"}}>&lt;</h1>
            <h1 style={{fontSize: "5vh"}}>COMBAT</h1>
            <h1 style={{marginLeft: "5vw", marginRight: "5vw"}}>&gt;</h1>
        </div>
    }

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
                ...character, HP: --character.HP, wound: calcWoundState()
            })

            setUnpostedChanges(true);
        }
    }

    const stabilize = () => {
        setCharacter({
            ...character, wound: 0
        })
        setUnpostedChanges(true);
    }


    const HPUp = () => {
        if (character.HP < maxHP) {
            setCharacter({
                ...character, HP: ++character.HP
            })
            setUnpostedChanges(true);
        }
    }

    function hpbar() {
        return (<div className="HPBar-container">
            <div className="HPBar">
                <div>-</div>
                <div>{character.HP}/{maxHP}</div>
                <div>+</div>
            </div>
            <div className="invisible-button-left" onClick={HPDown}></div>
            <div className="invisible-button-right" onClick={HPUp}></div>
        </div>)
    }

    function woundstate() {
        switch (character.wound) {
            case 3:
                return <div onClick={stabilize} className="woundState-container mortally"><h1>Mortally Wounded</h1>
                    <h3>-4 to all Actions -6 to MOVE (Minimum 1) Must make a Death Save at start of each one of their
                        Turns. Mortally Wounded Characters suffer a Critical Injury whenever they are damaged by a Melee
                        or Ranged Attack. In addition, their Death Save Penalty increases by 1.</h3><p>tap to
                        stabilize <b>DV15</b></p>
                </div>;
            case 2:
                return <div onClick={stabilize} className="woundState-container seriously">
                    <div><h1>Seriously Wounded</h1><h3>-2 to all Actions</h3>
                        <p>tap to stabilize <b>DV13</b></p></div>
                </div>;
            case 1:
                return <div onClick={stabilize} className="woundState-container lightly"><h1>Lightly Wounded</h1><p>tap
                    to stabilize <b>DV10</b></p>
                </div>;
            default:
                return <div className="woundState-container"><h1>Stable</h1></div>;
        }

    }

    const nextWeapon = () => {
        setWeaponIndex((weaponIndex + 1) % (character.weapons.length + 1));
    }

    const prevWeapon = () => {
        if (weaponIndex === 0) {
            setWeaponIndex(character.weapons.length);
        } else {
            setWeaponIndex(weaponIndex - 1);
        }

    }

    const shoot = () => {
        let weaponlist = character.weapons;
        weaponlist[weaponIndex].loaded -= 1;
        setCharacter({
            ...character,
            weapons: weaponlist
        })

        setUnpostedChanges(true);
    }

    const reload = () => {
        let weaponlist = character.weapons;
        let ammolist = character.ammo;
        const ammo = ammolist.find(a => a.name === weaponlist[weaponIndex].ammo)
        if (ammo && ammo.count > 0) {
            if (ammo.count > weaponlist[weaponIndex].mag - weaponlist[weaponIndex].loaded) {
                ammo.count -= weaponlist[weaponIndex].mag - weaponlist[weaponIndex].loaded;
                weaponlist[weaponIndex].loaded = weaponlist[weaponIndex].mag;
            } else {
                weaponlist[weaponIndex].loaded += ammo.count;
                ammo.count = 0;
            }
        }
        setCharacter({
            ...character,
            weapons: weaponlist,
            ammo: ammolist
        })

        setUnpostedChanges(true);
    }

    //const ammoScrollData = Array.from(Array(10).keys());
    const [ammoScroller, setAmmoScroller] = useState(0);
    const [selectedAmmo, setSelectedAmmo] = useState({"name": "nf", "count": 0});


    const toggleAmmoModal = () => {
        const ammoList = character.ammo;
        const findAmmo = ammoList.find(a => a.name === character.weapons[weaponIndex].ammo);
        setSelectedAmmo(findAmmo)
        setAmmoScroller(findAmmo.count)

        if (ammoModalEnable)
        {
            findAmmo.count = ammoScroller;
            setCharacter({
                ...character,
                ammo: ammoList
            })
            setUnpostedChanges(true);
        }

        setAmmoModalEnable(!ammoModalEnable);
    }

    const ammoModal = (
        <div className="modal">
            <div className="overlay" onClick={toggleAmmoModal}></div>
            <div className="modal-content">
                <h3>{selectedAmmo.name}</h3>
                <NumberPicker
                    minCount={0} maxCount={1000} current={ammoScroller} preloadCount={20}
                    iconAdd={<div>+</div>}
                    iconMinus={<div>-</div>}
                    scrollerBackground={0}
                    style={styles.App}
                    onChange={number => {
                        setAmmoScroller(number);
                    }}
                />
            </div>
        </div>);

    function weaponCarousel() {
        let weaponName = "WEAPONERROR";
        let bonus = 0;
        let ROF = 1;
        let damage = "0d6";
        let totalAmmo = 0;
        let magSize = 0;
        let magAmmo = 0;
        let ammoSection = <div></div>;
        if (weaponIndex === character.weapons.length) {
            weaponName = "Brawling";

            bonus += character.stats.DEX;
            let brawlingskill = character.skills.find(s => s.name === "Brawling");
            bonus += brawlingskill ? brawlingskill.lvl : 0;

            if (character.stats.BODY >= 11) damage = "4d6"; else if (character.stats.BODY >= 7) damage = "3d6"; else if (character.stats.BODY >= 5 || character.cyberware.find(c => c.name === "Cyberarm")) damage = "2d6"; else damage = "1d6";

            ROF = 2;

            ammoSection = character.cyberware.find(c => c.name === "Cyberarm") ?
                <div style={{fontWeight: "bold", margin: "2vmin"}}>Cyberarm</div> : <div></div>;

        } else {
            weaponName = character.weapons[weaponIndex].name;

            let weaponskill = character.skills.find(s => s.name === character.weapons[weaponIndex].skill);
            bonus += weaponskill ? weaponskill.lvl : 0;
            bonus += character.stats.REF;

            damage = character.weapons[weaponIndex].dmg;

            ROF = character.weapons[weaponIndex].ROF;

            magAmmo = character.weapons[weaponIndex].loaded;
            magSize = character.weapons[weaponIndex].mag;
            const ammoType = character.ammo.find(a => a.name === character.weapons[weaponIndex].ammo)
            totalAmmo = ammoType ? ammoType.count : 0;

            ammoSection = <div className="weaponcarousel-ammo">
                <h3 style={{
                    fontWeight: "bold",
                    margin: "1vmin",
                    marginBottom: 0
                }}>{character.weapons[weaponIndex].ammo} Ammo</h3>
                <div className="flex-horizontal">
                    <div onClick={shoot}><h1>{magAmmo}</h1><p>tap to shoot</p></div>
                    <div onClick={reload}><h1>{magSize}</h1><p>tap to reload</p></div>
                    <div onClick={toggleAmmoModal}><h1>{totalAmmo}</h1><p>tap to edit</p></div>
                </div>
            </div>;
        }


        return <div className="weaponcarousel">
            <div className="weaponcarousel-header">
                <div className="invisible-button-left" onClick={prevWeapon}></div>
                <div className="invisible-button-right" onClick={nextWeapon}></div>
                <h1 className="flex-horizontal" style={{justifyContent: "space-between", height: "60%"}}>
                    <div style={{marginLeft: "5vw", marginRight: "5vw"}}>&lt;</div>
                    <div>{weaponName}</div>
                    <div style={{marginLeft: "5vw", marginRight: "5vw"}}>&gt;</div>
                </h1>
                <h1 className="flex-horizontal" style={{height: "40%"}}>
                    <div>RoF {ROF}</div>
                    <div>+{bonus}</div>
                    <div>{damage}</div>
                </h1>
            </div>
            {ammoSection}
        </div>
    }

    function statSection() {
        const evasion = character.skills.find(s => s.name === "Evasion");
        const evasionBonus = evasion ? evasion.lvl : 0;

        return <div className="flex-horizontal" style={{width: "95vw", height: "15vh"}}>
            <div className="stat"><h1>REF</h1>
                <hr/>
                <h1 style={{fontSize: "5vh"}}>{character.stats.REF}</h1>
            </div>
            <div className="stat"><h1>MOVE</h1>
                <hr/>
                <h1 style={{fontSize: "5vh"}}>{character.stats.MOVE}</h1>
            </div>
            <div className="stat"><h1>EVASION</h1>
                <hr/>
                <h1 style={{fontSize: "5vh"}}>{character.stats.DEX + evasionBonus}</h1>
            </div>
        </div>
    }

    const bodyArmorDown = () => {
        if (character.bodyArmor.SP > 0) {
            let bodyArmorVal = character.bodyArmor
            bodyArmorVal.SP -= 1;
            setCharacter({
                ...character, bodyArmor: bodyArmorVal
            })

            setUnpostedChanges(true);
        }
    }

    const bodyArmorRepair = () => {
        let bodyArmorVal = character.bodyArmor
        bodyArmorVal.SP = bodyArmorVal.baseSP;
        setCharacter({
            ...character, bodyArmor: bodyArmorVal
        })

        setUnpostedChanges(true);
    }

    const headArmorDown = () => {
        if (character.headArmor.SP > 0) {
            let headArmorVal = character.headArmor
            headArmorVal.SP -= 1;
            setCharacter({
                ...character, headArmor: headArmorVal
            })

            setUnpostedChanges(true);
        }
    }

    const headArmorRepair = () => {
        let headArmorVal = character.headArmor
        headArmorVal.SP = headArmorVal.baseSP;
        setCharacter({
            ...character, headArmor: headArmorVal
        })

        setUnpostedChanges(true);
    }

    function armorSection() {


        return <div className="armor-container">
            <div className="armor">
                <h1>Head</h1>
                <div><h3 onClick={headArmorRepair}>(R)</h3><h1>{character.headArmor.SP}</h1><h1 onClick={headArmorDown}>-</h1></div>
            </div>
            <div className="armor">
                <h1>Body</h1>
                <div><h3 onClick={bodyArmorRepair}>(R)</h3><h1>{character.bodyArmor.SP}</h1><h1 onClick={bodyArmorDown}>-</h1></div>
            </div>
        </div>
    }

    return (<div>
        <div {...handlers} className="char-base">
            {header()}
            {hpbar()}
            {woundstate()}
            {weaponCarousel()}
            {statSection()}
            {armorSection()}

        </div>
        {ammoModalEnable ? ammoModal : ""}
    </div>)
}
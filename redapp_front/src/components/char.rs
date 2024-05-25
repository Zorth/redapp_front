use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Char {
    pub handle: String,
    pub full_name: String,
    pub stats: Stats,
    pub hp: u16,
    pub wound: u8,
    pub humanity: u16,
    pub equipment: Vec<Item>,
    pub base_ip: u32,
    pub ip: u32,
    pub skills: Vec<Skill>,
    pub injuries: Vec<Injury>,
}

#[derive(Serialize, Deserialize)]
pub struct Stats {
    int: u8,
    r#ref: u8,
    dex: u8,
    tech: u8,
    cool: u8,
    will: u8,
    luck: u8,
    r#move: u8,
    body: u8,
    base_emp: u8,
    emp: u8,
}

#[derive(Serialize, Deserialize)]
pub enum Item {
    Weapon(ItemWeapon),
    Ammo(ItemAmmo),
    Cyberware(ItemCyberware),
    HeadArmor(ItemHeadArmor),
    BodyArmor(ItemBodyArmor),
    Other(ItemOther),
}

#[derive(Serialize, Deserialize)]
pub struct ItemAmmo {
    name: String,
    desc: String,
}
#[derive(Serialize, Deserialize)]
pub struct ItemWeapon {
    name: String,
    desc: String,
}
#[derive(Serialize, Deserialize)]
pub struct ItemCyberware {
    name: String,
    desc: String,
}
#[derive(Serialize, Deserialize)]
pub struct ItemHeadArmor {
    name: String,
    desc: String,
}
#[derive(Serialize, Deserialize)]
pub struct ItemBodyArmor {
    name: String,
    desc: String,
}
#[derive(Serialize, Deserialize)]
pub struct ItemOther {
    name: String,
    desc: String,
}

#[derive(Serialize, Deserialize)]
pub struct Skill {
    name: String,
    lvl: u8,
    cost: u8,
}

#[derive(Serialize, Deserialize)]
pub struct Injury {
    name: String,
    quick_fix: String,
    long_fix: String,
}

impl Char {
    pub fn empty() -> Self {
        return Char {
            handle: "NEW".to_string(),
            full_name: "No Name".to_string(),
            stats: Stats {
                int: 0,
                r#ref: 0,
                dex: 0,
                tech: 0,
                cool: 0,
                will: 0,
                luck: 0,
                r#move: 0,
                body: 0,
                base_emp: 0,
                emp: 0,
            },
            hp: 0,
            wound: 0,
            humanity: 0,
            equipment: Vec::new(),
            base_ip: 0,
            ip: 0,
            skills: Vec::new(),
            injuries: Vec::new(),
        };
    }
}

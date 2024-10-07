import chalk from "chalk";
import races from "./races.json" with {type: "json"};
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

function getRace() {
    let randomRaceIndex = Math.floor(Math.random() * races.length);
    let race = races[randomRaceIndex]
    let age = Math.floor(Math.random() * race.dies);
    let lifestage = "adult";
    if (age >= race.dies / 2) {
        lifestage = "elder";
    } else if (age <= race.matures) {
        lifestage = "child";
    }
    let subrace = race.subraces[Math.floor(Math.random() * race.subraces.length)];
    let eyeColor = subrace.eyeColors[Math.floor(Math.random() * subrace.eyeColors.length)];
    let hairColor = subrace.hairColors[Math.floor(Math.random() * subrace.hairColors.length)];
    let skinColor = subrace.skinColors[Math.floor(Math.random() * subrace.skinColors.length)];
    let hgtMod = new DiceRoll(subrace.hgtMod);
    let wgtMod = new DiceRoll(subrace.wgtMod);
    let heightTotalInches = subrace.baseHgt + hgtMod.total;
    let heightFeet = Math.floor(heightTotalInches / 12);
    let heightInches = Math.abs((heightFeet * 12) - heightTotalInches);
    let weight = subrace.baseWgt + (hgtMod.total * wgtMod.total);
    if (race.subraces.length > 1) {
        console.log(`${chalk.inverse(`Race: ${race.name}, (${subrace.name})`)}`)
    } else {
        console.log(`${chalk.inverse(`Race: ${race.name}`)}`)
    }
    console.log(`Alignment: ${getAlignment()}\nAge: ${age} (${lifestage})\nEyes: ${eyeColor}\nHair: ${hairColor}\nSkin: ${skinColor}\nHeight: ${heightFeet}'${heightInches}"\nWeight: ${weight} lb.`);
}

function getAlignment() {
    let roll = new DiceRoll("3d6");
    let tiebreaker = new DiceRoll("1d100");
    if (roll.total >= 18) {
        if (tiebreaker.total < 50) {
            return "chaotic good";
        } else {
            return "chaotic neutral";
        }
    } else if (roll.total >= 16) {
        if (tiebreaker.total < 50) {
            return "lawful good";
        } else {
            return "lawful neutral";
        }
    } else if (roll.total >= 13) {
        return "neutral good";
    } else if (roll.total >= 9) {
        return "neutral";
    } else if (roll.total >= 6) {
        return "neutral evil";
    } else if (roll.total >= 4) {
        return "lawful evil";
    } else {
        if (tiebreaker.total < 50) {
            return "chaotic evil";
        } else {
            return "chaotic neutral";
        }
    }
}

getRace();

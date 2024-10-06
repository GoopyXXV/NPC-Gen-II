import chalk from "chalk";
import races from "./races.json" with {type: "json"};
import subraces from "./subraces.json" with {type: "json"};
// import * as rpgDiceRoller from '@dice-roller/rpg-dice-roller';
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

function getRace() {
    let randomRaceIndex = Math.floor(Math.random() * races.length);
    let race = races[randomRaceIndex]
    let age = Math.floor(Math.random() * race.dies);
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
    console.log(
        `
        Race: ${race.name}, (${subrace.name})
        Age: ${age}
        Eyes: ${eyeColor}
        Hair: ${hairColor}
        Skin: ${skinColor}
        Height: ${heightFeet}'${heightInches}"
        Weight: ${weight} lb.
        `
    );
}

getRace();

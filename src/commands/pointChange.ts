import { Message } from "discord.js";
import { Commands } from "./index";
import { Client } from "pg";

export async function pointChange(dbClient: Client, message: Message, args: string[], command: string) {
    // Get the first member mentioned
    const member = message.mentions.members.first();
    if(!member) {
        return message.reply(`Hey ${message.author.tag}! That user doesn't exist.`);
    }

    // Get the reason passed in or define a default
    let reason = args.slice(1).join(' ');
    if(!reason) {
        reason = "Reasons!";
    }

    try {
        // Get the member's current point value so we can modify it
        const pointResult = await dbClient.query(`SELECT point_value FROM UserPoints WHERE user_id = ${member.id};`);
        let currentPoints = 0,
            insertIntoTable = true;
        if (pointResult.rowCount > 0) {
            currentPoints = pointResult.rows[0].point_value;
            insertIntoTable = false;
        }

        // Add the point
        if (command === Commands.addPoint) {
            message.channel.send(`${member.user.toString()} has been awarded a point because: ${reason}`);
            currentPoints++;
        } else if (command === Commands.subPoint) {
            message.channel.send(`${member.user.toString()} has been deducted a point because: ${reason}`);
            currentPoints--;
        }

        // Update the member's current point value
        if (insertIntoTable) {
            await dbClient.query(`INSERT INTO UserPoints(user_id, point_value) VALUES (${member.id}, ${currentPoints});`);
        } else {
            await dbClient.query(`UPDATE UserPoints SET point_value = ${currentPoints} WHERE user_id = ${member.id};`);
        }
    } catch (error) {
        console.log("An error occured running the pointChange command: " + JSON.stringify(error));
    }
}
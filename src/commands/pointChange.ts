import { Message } from "discord.js";
import { Commands } from "./index";
import { Client } from "pg";

export async function pointChange(dbClient: Client, message: Message, args: string[], command: string) {
    // Delete the message from the channel
    message.delete().catch(O_o=>{console.log(O_o);});

    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member) {
        return message.reply(`Hey ${message.author.tag}! That user doesn't exist.`);
    }

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) {
        reason = "Reasons!";
    }

    try {
        // Get the member's current point value so we can modify it
        let pointResult = await dbClient.query(`SELECT point_value FROM UserPoints WHERE user_id = ${member.id};`);
        let currentPoints = 0,
            insertIntoTable = true;
        if (pointResult.rowCount > 0) {
            currentPoints = pointResult.rows[0].point_value;
            insertIntoTable = false;
        }

        // Add the point
        if (command === Commands.addPoint) {
            message.reply(`${member.user.tag} has been awarded a point by ${message.author.tag} because: ${reason}`);
            currentPoints++;
        } else if (command === Commands.subPoint) {
            message.reply(`${member.user.tag} has been deducted a point by ${message.author.tag} because: ${reason}`);
            currentPoints--;
        }

        // Update the member's current point value
        if (insertIntoTable) {
            await dbClient.query(`INSERT INTO UserPoints(user_id, point_value) VALUES (${member.id}, ${currentPoints};`);
        } else {
            await dbClient.query(`UPDATE UserPoints SET point_value = ${currentPoints} WHERE user_id = ${member.id};`);
        }
    } catch (error) {
        console.log("An error occured running the pointChange command: " + JSON.stringify(error));
    }
}
import { Message } from "discord.js";
import { Client } from "pg";

/**
 * Flips the requested members point value but only if the user has enough points
 * @param dbClient database client
 * @param message message sent to chat
 * @param args args of message
 */
export async function flip(dbClient: Client, message: Message) {
    // Get the first member mentioned
    const member = message.mentions.members.first();
    if(!member) {
        return message.reply(`that user doesn't exist, dummy.`);
    }else if (member.id === message.author.id) {
        return message.reply(`if you want to flip yourself just look in a mirror.`);
    }

    try {
        // Get the requesting members point value to determine if they have enough to flip
        const requestingPointResult = await dbClient.query(`SELECT point_value FROM UserPoints WHERE user_id = ${message.author.id};`);
        if (requestingPointResult.rowCount > 0 && requestingPointResult.rows[0].point_value >= 10) {
            // Get the member's current point value so we can modify it
            const pointResult = await dbClient.query(`SELECT point_value FROM UserPoints WHERE user_id = ${member.id};`);
            // Make sure they have some points to flip
            if (pointResult.rowCount > 0 && pointResult.rows[0].point_value !== 0) {
                // flip the member's current point value
                await dbClient.query(`UPDATE UserPoints SET point_value = ${pointResult.rows[0].point_value * -1} WHERE user_id = ${member.id};`);
                // deduct 10 points from the author
                await dbClient.query(`UPDATE UserPoints SET point_value = ${requestingPointResult.rows[0].point_value - 10} WHERE user_id = ${message.author.id};`);
                message.channel.send(`${member.user.toString()} has had their point value flipped! New value: ${pointResult.rows[0].point_value * -1}`);
            } else {
                message.reply(`How do you flip a zero, genius? You know what...minus 5 points.`);
                return await dbClient.query(`UPDATE UserPoints SET point_value = ${requestingPointResult.rows[0].point_value - 5} WHERE user_id = ${message.author.id};`);
            }
        } else {
            return message.reply(`Get outta here! Ya broke!`);
        }
    } catch (error) {
        console.log("An error occured running the flip command: " + JSON.stringify(error));
    }
}
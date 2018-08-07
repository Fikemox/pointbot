import { Message } from "discord.js";
import { Client } from "pg";


/**
 * Sends the current points for a user into the channel
 * @param dbClient database client
 * @param message message that triggered the command
 */
export async function me(dbClient: Client, message: Message) {
    const member = message.author;
    try {
        // Select the users points
        const pointResult = await dbClient.query(`SELECT point_value FROM UserPoints WHERE user_id = ${member.id};`);
        let currentPoints = 0;
        if (pointResult.rowCount > 0) {
            currentPoints = pointResult.rows[0].point_value;
        }
        // Alert the user to their points
        message.channel.send(`Your current PointBot™ points are: ${currentPoints}`);
    } catch (error) {
        console.log("An error occured running a !me command: " + JSON.stringify(error));
    }
}
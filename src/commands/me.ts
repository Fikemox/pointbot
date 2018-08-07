import { Message } from "discord.js";
import { Client } from "pg";

export async function me(dbClient: Client, message: Message, args: string[], command: string) {
    const member = message.author;
    try {
        const pointResult = await dbClient.query(`SELECT point_value FROM UserPoints WHERE user_id = ${member.id};`);
        let currentPoints = 0;
        if (pointResult.rowCount > 0) {
            currentPoints = pointResult.rows[0].point_value;
        }
        message.channel.send(`Your current PointBot™ points are: ${currentPoints}`);
    } catch (error) {
        console.log("An error occured running a !me command: " + JSON.stringify(error));
    }
    //Todo: Fill in with real list
    //message.reply("This is where your points would go...**IF I HAD THEM!**", {files: ["https://memegenerator.net/img/images/2276176.jpg"]});
}
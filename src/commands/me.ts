import { Message } from "discord.js";
import { Client } from "pg";

export async function me(dbClient: Client, message: Message, args: string[], command: string) {
    // Delete the message from the channel
    message.delete().catch(O_o=>{console.log(O_o);});
    let member = message.author;
    try {
        let pointResult = await dbClient.query(`SELECT point_value FROM UserPoints WHERE user_id = ${member.id};`);
        let currentPoints = 0;
        if (pointResult.rowCount > 0) {
            currentPoints = pointResult.rows[0].point_value;
        }
        message.reply(`your current PointBot™ points are: ${currentPoints}`);
    } catch (error) {
        console.log("An error occured running a !me command: " + JSON.stringify(error));
    }
    //Todo: Fill in with real list
    //message.reply("This is where your points would go...**IF I HAD THEM!**", {files: ["https://memegenerator.net/img/images/2276176.jpg"]});
}
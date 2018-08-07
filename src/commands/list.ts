import { Message } from "discord.js";
import { Client } from "pg";
import * as Discord from "discord.js";

export async function list(dbClient: Client, message: Message, args: string[], command: string) {
    try {
        const listResult = await dbClient.query(`SELECT * FROM UserPoints;`);
        if (listResult.rowCount <= 0) {
            message.channel.send("This is where the list would go...**IF I HAD ONE!**", {files: ["https://memegenerator.net/img/images/2276176.jpg"]});
            return;
        }
        let botresponse = new Discord.RichEmbed()
			  .setTitle("Leaderboard")
			  .setDescription("All the points!")
			  .setColor(0x00AE86);
        for(let i = 0; i < listResult.rowCount + 1; i++) {
            botresponse.addField(`@${listResult.rows[i].user_id} :`,` ${listResult.rows[i].point_value}`);
        }
        message.channel.sendEmbed(botresponse);
    } catch (error) {
        console.log("An error occurred running the !list command: " + error.message);
    }
    //Todo: Fill in with real list
}
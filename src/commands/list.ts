import { Message } from "discord.js";
import { Client } from "pg";
import * as Discord from "discord.js";

/**
 * Sends the current list of points per user into the channel
 * @param dbClient database client
 * @param message message that triggered the command
 */
export async function list(dbClient: Client, message: Message) {
    try {
        // Grab the list data
        const listResult = await dbClient.query(`SELECT * FROM UserPoints ORDER BY point_value desc;`);
        if (listResult.rowCount <= 0) {
            message.channel.send("This is where the list would go...**IF I HAD ONE!**", {files: ["https://memegenerator.net/img/images/2276176.jpg"]});
            return;
        }
        // Start building the list
        let botresponse = new Discord.RichEmbed()
			  .setTitle("Leaderboard")
			  .setDescription("All the points!")
              .setColor(0x00AE86);
        // Add the rows
        for(let i = 0; i < listResult.rowCount; i++) {
            const member = (message.guild.members.get(listResult.rows[i].user_id) as Discord.GuildMember);
            botresponse.addField(`${member.user.username} :`,` ${listResult.rows[i].point_value}`);
        }
        // Send the response into the server
        message.channel.send(botresponse);
    } catch (error) {
        console.log("An error occurred running the !list command: " + error.message);
    }
}
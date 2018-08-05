import { Client, Message } from "discord.js";

export function list(client: Client, message: Message, args: string[], command: string) {
    // Delete the message from the channel
    message.delete().catch(O_o=>{console.log(O_o);});
    //Todo: Fill in with real list
    message.reply("This is where the list would go...**IF I HAD ONE!**", {files: ["https://memegenerator.net/img/images/2276176.jpg"]});
}
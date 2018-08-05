import { Client, Message } from "discord.js";

export function addPoint(client: Client, message: Message, args: string[]) {
    message.delete().catch(O_o=>{console.log(O_o);});
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    // Add the point
    message.reply(`${member.user.tag} has been awarded a point by ${message.author.tag} because: ${reason}`);
}
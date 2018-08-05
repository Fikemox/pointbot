import { Client, Message } from "discord.js";
import { Commands } from "./index";

export function pointChange(client: Client, message: Message, args: string[], command: string) {
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

  // Add the point
  if (command === Commands.addPoint)
  {
    message.reply(`${member.user.tag} has been awarded a point by ${message.author.tag} because: ${reason}`);
  } else if (command === Commands.subPoint) {
    message.reply(`${member.user.tag} has been deducted a point by ${message.author.tag} because: ${reason}`);
  }
}
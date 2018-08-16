import { Message } from "discord.js";
import { Client } from "pg";

/**
 * Sends a helpful list of commands to the requestor
 * @param dbClient Currently active db client
 * @param message Currently processed message
 * @param args Any additional arguments that might have been passed
 */
export function help(dbClient: Client, message: Message, args: string[]) {
    let botresponse = '';
	botresponse += '**!++ @Username Reason**\n';
	botresponse += 'Gives a point to a user for a reason\n';
	botresponse += '**!-- @Username Reason**\n';
	botresponse += 'Deducts a point from a user for a reason.\n';
	botresponse += '**!me**\n';
	botresponse += 'Returns all of your points.\n';
	botresponse += '**!list**\n';
	botresponse += 'List each users points.\n';
	botresponse += '**!flip @Username**\n';
	botresponse += 'Flip another users points. Costs 10 points.\n';

	message.channel.send('DM Sent!');
	message.author.send(botresponse);
}
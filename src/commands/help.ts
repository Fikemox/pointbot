import { Client, Message } from "discord.js";

/**
 * Sends a helpful list of commands to the requestor
 * @param client Currently active discord client
 * @param message Currently processed message
 * @param args Any additional arguments that might have been passed
 */
export function help(client: Client, message: Message, args: string[]) {
    let botresponse = '';
	botresponse += '**!++ @Username Reason**\n';
	botresponse += 'Gives a point to a user for a reason\n';
	botresponse += '**!-- @Username Reason**\n';
	botresponse += 'Deducts a point from a user for a reason.\n';
	botresponse += '**!me**\n';
	botresponse += 'Returns all of your points.\n';

	message.channel.send('DM Sent!');
	message.author.send(botresponse);
}
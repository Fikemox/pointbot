// Load up the discord.js library
import * as Discord from "discord.js";
import { Commands, CommandFunctions } from "./commands/index";

// Initialize a new bot
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("../config.json");

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Set the bot's playing status
  client.user.setActivity(`!help for a list of commands`);
});

client.on("message", async message => {
  // Don't read messages that any bot posts
  if(message.author.bot) {
    return;
  }

  // Ignore messages that don't start with our prefix
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  // @ts-ignore - args will always exist
  const command = args.shift().toLowerCase();

  // Check if we support this command
  if (Object.values(Commands).includes(command)) {
    // Run this command
    CommandFunctions[command](client, message, args);
  }
});

// Connect and login to the server
client.login(config.token);
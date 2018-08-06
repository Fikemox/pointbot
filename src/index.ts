// Load up the discord.js library
import * as Discord from "discord.js";
import { Pool } from "pg";
import { Commands, CommandFunctions } from "./commands/index";

// In production these are loaded by the running service
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

// Connect to the database
const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// Initialize a new bot
const client = new Discord.Client();

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  if (dbPool !== null) {
    console.log("A database pool has been created");
  }
  // Set the bot's playing status
  client.user.setActivity(`!help for a list of commands`);
});

client.on("message", async message => {
  // Don't read messages that any bot posts
  if(message.author.bot) {
    return;
  }

  // Ignore messages that don't start with our prefix
  // @ts-ignore - this will be loaded in dev and production
  if(message.content.indexOf(process.env.PREFIX) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // @ts-ignore - this will be loaded in dev and production
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  // @ts-ignore - args will always exist
  const command = args.shift().toLowerCase();

  // Check if we support this command
  if (Object.values(Commands).includes(command)) {
    // Run this command
    CommandFunctions[command](client, message, args, command);
  }
});

// Connect and login to the server
client.login(process.env.TOKEN);

// Heroku keep alive
import * as express from "express";
express().listen(process.env.port, (err: string) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`express server is listening on ${process.env.port}`);
});
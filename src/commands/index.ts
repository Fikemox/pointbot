import { Client, Message } from 'discord.js';
import { addPoint } from './addPoint';
import { help } from './help';

export enum Commands {
    help = "help",
    "++" = "++"
}

interface CommandFunctions {
    [key: string]: (client: Client, message: Message, args: string[]) => void; // Required function signature
    help: typeof help;
    "++": typeof addPoint;
}

export const CommandFunctions: CommandFunctions = {
    help: help,
    "++": addPoint
};
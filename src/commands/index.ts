import { Client, Message } from 'discord.js';
import { pointChange } from './pointChange';
import { help } from './help';

export enum Commands {
    help = "help",
    list = "list",
    me = "me",
    addPoint = "++",
    subPoint = "--",
}

interface CommandFunctions {
    [key: string]: (client: Client, message: Message, args: string[], command: string) => void; // Required function signature
    help: typeof help;
    "++": typeof pointChange;
    "--": typeof pointChange;
}

export const CommandFunctions: CommandFunctions = {
    help: help,
    "++": pointChange,
    "--": pointChange
};
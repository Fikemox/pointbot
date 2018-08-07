import { Message } from 'discord.js';
import { Client } from "pg";
import { help } from './help';
import { list } from './list';
import { me } from './me';
import { pointChange } from './pointChange';

export enum Commands {
    help = "help",
    list = "list",
    me = "me",
    addPoint = "++",
    subPoint = "--",
}

interface CommandFunctions {
    [key: string]: (dbClient: Client, message: Message, args: string[], command: string) => void; // Required function signature
    help: typeof help;
    list: typeof list;
    me: typeof me;
    "++": typeof pointChange;
    "--": typeof pointChange;
}

export const CommandFunctions: CommandFunctions = {
    help: help,
    list: list,
    me: me,
    "++": pointChange,
    "--": pointChange
};
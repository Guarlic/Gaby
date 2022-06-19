import { BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

interface ICommand {
  Builder: SlashCommandBuilder;
  SlashExecute: (interaction: BaseCommandInteraction) => Promise<void>;
}

export default ICommand;

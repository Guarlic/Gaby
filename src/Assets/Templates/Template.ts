import { BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('Template')
    .setDescription('Template'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    interaction.reply('Template');
  },
};

export default command;
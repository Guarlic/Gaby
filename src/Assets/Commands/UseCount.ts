import { BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Query } from '../DataBase/MySqlManager.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('usecount')
    .setDescription('Usecount of NewGaby'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const res = await Query(
      `select * from usecount where id = '${interaction.user?.id}'`
    );

    interaction.reply(`usecount: ${res[0].value}`);
  },
};

export default command;
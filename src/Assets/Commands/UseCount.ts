import { BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { connection } from '../DataBase/MySqlManager.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('usecount')
    .setDescription('Usecount of NewGaby'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    connection.query(
      `select * from usecount where id = '${interaction.user?.id}'`,
      (err, rows) => {
        if (err) throw err;
        interaction.reply(`usecount: ${rows[0].value}`);
      }
    );
  },
};

export default command;
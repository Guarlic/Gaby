import { BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Query } from '../DataBase/MySqlManager.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('workcount')
    .setDescription('Workcount of NewGaby'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    await Query(
      `insert into workcount values ('${interaction.user.id}', 1) on duplicate key update value = value;`
    );

    const res = await Query(
      `select * from workcount where id = '${interaction.user.id}';`
    );

    interaction.reply(`workcount: ${res[0].value}`);
  },
};

export default command;
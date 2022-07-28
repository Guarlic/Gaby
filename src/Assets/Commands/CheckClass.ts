import { BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { UserModel } from '../DataBase/UserSchema.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('checkclass')
    .setDescription('Check your class'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (!data) {
      interaction.reply('너는 가입을 안했는뎁쇼??');

      return;
    }

    const Class = data.Class;

    if (!Class) {
      interaction.reply('당신의 클래스는... 없습니다.');

      return;
    }

    interaction.reply(`당신의 클래스는... [${Class}] !`);
  },
};

export default command;
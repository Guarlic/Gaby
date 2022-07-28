import { MessageEmbed, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { UserModel } from '../DataBase/UserSchema.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('regist')
    .setDescription('Make a account of Gaby'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });
    
    if (data) {
      interaction.reply('너 이미 가입함 ^^7');

      return;
    }

    await UserModel.create({ id: interaction.user?.id });

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Regist Account')
      .setDescription('success!');

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
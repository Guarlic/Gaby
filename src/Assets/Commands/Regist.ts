import { MessageEmbed, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('regist')
    .setDescription('Make a account of Gaby'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Regist Account')
      .setDescription('success!');

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
import { MessageEmbed, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('wallet')
    .setDescription('wallet'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setDescription('Wallet');

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
import { MessageEmbed, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Check shop'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('== Shop ==')
      .addFields(
        { name: 'First', value: 'Sword (100₩)', inline: true },
        { name: 'Second', value: 'Shield (110₩)', inline: true },
      );

    interaction.reply( { embeds: [embed] });
  },
};

export default command;
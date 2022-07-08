import { BaseCommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('upgrade')
    .setDescription('Upgrade an item'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const list: string[] = [ 'success', 'failure' ];
    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Upgrade')
      .setDescription(list[Math.floor(Math.random() * list.length)]);
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
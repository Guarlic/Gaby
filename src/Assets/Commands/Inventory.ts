import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
  
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Check your inventory')
    .addBooleanOption(option =>
      option
        .setName('ephemeral')
        .setDescription('Set ephemeral of message')
        .setRequired(true)
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const eph = (
      interaction.options as CommandInteractionOptionResolver
    ).getBoolean('ephemeral');

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Your Inventory')
      .setDescription('inventory');

    interaction.reply({ embeds: [embed], ephemeral: eph! });
  },
};

export default command;
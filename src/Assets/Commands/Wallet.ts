import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('wallet')
    .setDescription('wallet')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User who you want to check wallet')
        .setRequired(false)
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const user = (
      interaction.options as CommandInteractionOptionResolver
    ).getUser('user');

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Wallet')
      .setDescription(
        user && user.id !== interaction.user.id
        ? `${user.username}#${user.discriminator}'s wallet`
        : `너님#${interaction.user.discriminator}'s wallet`
      )
      .setFooter('어라랏.. 텅장?');

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
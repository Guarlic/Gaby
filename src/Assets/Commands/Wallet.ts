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

    let embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Wallet');

    if (user && user.id !== interaction.user.id) {
      embed = embed.setDescription(
        `${user.username}#${user.discriminator}'s wallet`
      );

      return interaction.reply({ embeds: [embed] });
    }

    embed = embed.setDescription(
      `You#${interaction.user.discriminator}'s wallet`
    );

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
import { MessageEmbed, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('debug')
    .setDescription('Debug Command'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const embed = new MessageEmbed()
      .setAuthor({ name: 'Gaby', url: imageurl })
      .setColor(color)
      .setTitle('Debug')
      .addFields(
        { name: 'Guild ID', value: `\`${interaction.guild?.id}\``, inline: true },
        { name: 'Channel ID', value: `\`${interaction.channel?.id}\``, inline: true },
        { name: 'User ID', value: `\`${interaction.user.id}\``, inline: true },
        { name: 'Guild Name', value: `\`${interaction.guild?.name}\``, inline: true},
        { name: 'User Name', value: `\`${interaction.user.username}\``, inline: true },
        { name: 'User Discriminator', value: `\`${interaction.user.discriminator}\``, inline: true },
        { name: 'Client ID', value: `\`${process.env.CLIENTID}\``, inline: true },
      );

    interaction.reply({ embeds: [embed], ephemeral: true});
  },
};

export default command;
import { MessageEmbed, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { client } from '../BotEvent/BotEvent.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('**🏓 Pong!**')
      .setDescription(`${client.ws.ping}ms`);

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
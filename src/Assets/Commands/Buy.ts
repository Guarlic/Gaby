import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const sword = 100;
const shield = 110;
const pickace = 200;

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Buy an item')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('select your item')
        .addChoices(
          { name: `Sword (${sword}₩)`, value: 'sword' },
          { name: `Shield (${shield}₩)`, value: 'shield' },
          { name: `Pickace (${pickace}₩)`, value: 'pickace' },
        )
        .setRequired(true)
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const item = (
      interaction.options as CommandInteractionOptionResolver
    ).getString('item');

    const bought = (
      item === 'sword' ? sword :
      item === 'shield' ? shield :
      pickace
    );

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('== Buy! ==')
      .addField('you bought', `${item!} (${bought}₩)`);
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
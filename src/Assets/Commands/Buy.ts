import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ItemBundle from '../Minigame/Items/ItemBundle.js';
import ICommand from '../Interfaces/ICommand.js';

const sword = ItemBundle.find(item => item.name === 'Sword');
const shield = ItemBundle.find(item => item.name === 'Shield');
const pickaxe = ItemBundle.find(item => item.name === 'Pickaxe');

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Buy an item')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('select your item')
        .addChoices(
          { name: `Sword (${sword!.price}₩)`, value: 'Sword' },
          { name: `Shield (${shield!.price}₩)`, value: 'Shield' },
          { name: `Pickace (${pickaxe!.price}₩)`, value: 'Pickace' },
        )
        .setRequired(true)
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const oItem = (
      interaction.options as CommandInteractionOptionResolver
    ).getString('item');

    const bought = ItemBundle.find(item => item.name === oItem);

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('== Buy! ==')
      .addField('you bought', `${oItem} (${bought!.price}₩)`);
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
import { MessageEmbed, BaseCommandInteraction, CommandInteractionOptionResolver } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Buy an item')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('select your item')
        .addChoices(
          { name: 'Sword (100₩)', value: 'sword' },
          { name: 'Shield (110₩)', value: 'shield' },
        )
        .setRequired(true)
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const item = (
      interaction.options as CommandInteractionOptionResolver
    ).getString('item');

    const embed = new MessageEmbed()
      .setAuthor('Gaby')
      .setColor(0x47C83E)
      .setTitle('== Buy! ==')
      .addField('you bought', item!)
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
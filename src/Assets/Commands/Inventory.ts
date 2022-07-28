import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
  
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { UserModel } from '../DataBase/UserSchema.js';
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
    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (!data) {
      interaction.reply('가입을 안했는뎁쇼');

      return;
    }

    const eph = (
      interaction.options as CommandInteractionOptionResolver
    ).getBoolean('ephemeral');

    const invjson = JSON.parse(data.inventory);
    let inv = '';

    for (var i = 0; i < invjson.length; i++) {
      inv += `${invjson[i].itemname} : ${invjson[i].count}\n`;
    }

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Your Inventory')
      .setDescription(inv);

    interaction.reply({ embeds: [embed], ephemeral: eph! });
  },
};

export default command;
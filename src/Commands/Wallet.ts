import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { UserModel } from '../DataBase/UserSchema.js';
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

    if (user && user!.bot) {
      interaction.reply('그 유저는 봇입니다만 ㅡ.ㅡ');

      return;
    }

    const id = user ? user.id : interaction.user.id;
    const data = await UserModel.findOne({ id: id });

    if (!data) {
      interaction.reply('걘 가입을 안했어!');

      return;
    }

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Wallet')
      .setDescription(
        user && user.id !== interaction.user.id
        ? `${user.username}#${user.discriminator}'s wallet`
        : `너님#${interaction.user.discriminator}'s wallet`
      )
      .setFooter(
        `${data.money ? `${data.money}₩` : '어라랏... 텅장..? (글썽)'}`
      );

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
import { MessageEmbed, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { UserModel } from '../DataBase/UserSchema.js';
import ItemBundle from '../Minigame/Items/ItemBundle.js';
import ICommand from '../Interfaces/ICommand.js';

const sword = ItemBundle.find(item => item.name === 'Sword');
const starsword = ItemBundle.find(item => item.name === 'StarSword');
const shield = ItemBundle.find(item => item.name === 'Shield');
const pickaxe = ItemBundle.find(item => item.name === 'Pickaxe');
const potion = ItemBundle.find(item => item.name === 'Potion');

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Check shop'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user.id });

    if (!data) {
      interaction.reply('가입을 하고 찾아와주세요.');
      
      return;
    }

    const embed = new MessageEmbed()
      .setAuthor({ name: 'Gaby', url: imageurl })
      .setColor(color)
      .setTitle('== Shop ==')
      .addFields(
        { name: 'First', value: `**\`Sword (${sword!.price}₩)\`**`, inline: true },
        { name: 'Second', value: `**\`Star Sword (${starsword!.price}₩)\`**`, inline: true },
        { name: 'Third', value: `**\`Shield (${shield!.price}₩)\`**`, inline: true },
        { name: 'Fourth', value: `**\`Pickaxe (${pickaxe!.price}₩)\`**`, inline: true },
        { name: 'Fifth', value: `**\`Potion (${potion!.price}₩)\`**`, inline: true },
      );

    interaction.reply( { embeds: [embed] });
  },
};

export default command;
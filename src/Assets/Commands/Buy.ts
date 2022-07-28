import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { UserModel } from '../DataBase/UserSchema.js';
import ItemBundle from '../Minigame/Items/ItemBundle.js';
import ICommand from '../Interfaces/ICommand.js';

const sword = ItemBundle.find(item => item.name === 'Sword');
const starsword = ItemBundle.find(item => item.name === 'StarSword');
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
          { name: `Sword (${sword!.price}₩) level: ${sword!.level}`, value: 'Sword' },
          { name: `Star Sword (${starsword!.price}₩) level: ${starsword!.level}`, value: 'StarSword' },
          { name: `Shield (${shield!.price}₩) level: ${shield!.level}`, value: 'Shield' },
          { name: `Pickace (${pickaxe!.price}₩) level: ${pickaxe!.level}`, value: 'Pickaxe' },
        )
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('number')
        .setDescription('number of item (default: 1)')
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (!data) {
      interaction.reply('[주인 아저씨]: 야임마! 회원가입 하고와!');

      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;
    const oItem = options.getString('item');
    const onum = options.getInteger('number');

    const bought = ItemBundle.find(item => item.name === oItem);
    const num = onum ? onum : 1;

    if (data.money - bought!.price * num < 0) {
      interaction.reply('삐빅- 잔액이 부족합니다.');

      return;
    }

    const arnum =
      oItem === 'Sword' ? 0 :
      oItem === 'StarSword' ? 1 :
      oItem === 'Shield' ? 2 :
      3;

    const invjson = JSON.parse(data.inventory);
    invjson[arnum].count += num;

    const inv = JSON.stringify(invjson);

    data.money -= bought!.price * num;
    data.inventory = inv;

    data.save();

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('== !Shop cart! ==')
      .addField('you bought', `${bought!.level} item; ${oItem} (${bought!.price}₩)`)
      .setFooter(`num: ${num}`);
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
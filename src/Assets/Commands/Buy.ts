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
        .setName('amount')
        .setDescription('amount of item (default: 1)')
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });

    // 가입 안한 놈 나와
    if (!data) {
      interaction.reply('[주인 아저씨]: 야임마! 회원가입 하고와!');

      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;
    const oItem = options.getString('item');
    const oAmount = options.getInteger('amount');

    const bought = ItemBundle.find(item => item.name === oItem);
    const amount = oAmount ? oAmount : 1;

    if (data.money - bought!.price * amount < 0) {
      interaction.reply('삐빅- 잔액이 부족합니다.');

      return;
    }

    const aramount =
      oItem === 'Sword' ? 0 :
      oItem === 'StarSword' ? 1 :
      oItem === 'Shield' ? 2 :
      3;

    // 인벤토리 json으로 불러오기
    const invjson = JSON.parse(data.inventory);
    invjson[aramount].count += amount;

    // 인벤토리 json으로 불러온거 다시 스트링으로 바꾸기
    const inv = JSON.stringify(invjson);

    // 돈, 아이템 계산
    data.money -= bought!.price * amount;
    data.inventory = inv;

    data.save();

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('== !Shop cart! ==')
      .addField('you bought', `${bought!.level} item; ${oItem} (${bought!.price}₩)`)
      .setFooter(`amount: ${amount}`);
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
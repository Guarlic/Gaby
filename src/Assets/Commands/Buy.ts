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

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Buy an item')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('select your item')
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
    const onum = options.getInteger('amount');

    const bought = ItemBundle.find(item => item.name === oItem);
    const amount = onum ? onum : 1;

    const arnum =
      oItem === 'Sword' ? 0 :
      oItem === 'StarSword' ? 1 :
      oItem === 'Shield' ? 2 :
      oItem === 'Pickaxe' ? 3:
      oItem === 'Potion' ? 4 :
      null;

    if (arnum === null) {
      interaction.reply(
`${oItem} 은 존재하지 않는 아이템입니다!
<shop> 명령어를 사용하여 아이템 목록을 확인해주세요.`
      );

      return;
    }

    if (data.money - bought!.price * amount < 0) {
      interaction.reply('삐빅- 잔액이 부족합니다.');

      return;
    }

    // 인벤토리 json으로 불러오기
    const invjson = JSON.parse(data.inventory);
    invjson[arnum].count += amount;

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
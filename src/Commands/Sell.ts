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
    .setName('sell')
    .setDescription('Sell an item')
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
    const data = await UserModel.findOne({ id: interaction.user.id });

    // 이녀석 가입 안했어?!
    if (!data) {
      interaction.reply('[구매자]: 님.. 가입을 안하셨네요? 전 갑니다.');

      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;
    const oItem = options.getString('item');
    const onum = options.getInteger('amount');

    const sold = ItemBundle.find(item => item.name === oItem);
    const amount = onum ? onum : 1;

    const arnum = sold!.id;

    if (arnum === null) {
      interaction.reply(
`${oItem} 은 존재하지 않는 아이템입니다!
<shop> 명령어를 사용하여 아이템 목록을 확인해주세요.`
      );

      return;
    }

    // 인벤토리 json 으로 불러오기
    const invjson = JSON.parse(data.inventory);

    if (invjson[arnum].count - amount < 0) {
      interaction.reply('삐빅- 아이템이 부족합니다.');

      return;
    }

    invjson[arnum].count -= amount;

    // 인벤토리 json 으로 불러온거 다시 스트링으로 바꾸기
    const inv = JSON.stringify(invjson);

    // 돈, 아이템 계산
    data.money += sold!.price * amount;
    data.inventory = inv;

    data.save();

    const embed = new MessageEmbed()
      .setAuthor({ name: 'Gaby', url: imageurl })
      .setColor(color)
      .setTitle('== !Client Receipt! ==')
      .addField('you sold', `${sold!.level} item; ${oItem} (${sold!.price}₩)`)
      .setFooter({ text: `amount: ${amount}` });
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
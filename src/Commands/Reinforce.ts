import {
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { UserModel } from '../DataBase/UserSchema.js';
import ItemBundle from '../Minigame/Items/ItemBundle.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('reinforce')
    .setDescription('reinforce an item')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('Item you want to reinforce')
        .setRequired(true)
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (!data) {
      interaction.reply('가입이 필요합니다!');
      
      return;
    }

    if (data.level < 3) {
      interaction.reply('최소 3레벨이 필요합니다!');

      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;
    const oItem = options.getString('item');

    const item = ItemBundle.find(value => value.name === oItem);

    if (!item) {
      interaction.reply('존재하지 않는 아이템입니다!');

      return;
    }

    const arnum = item!.id;

    if (arnum === null) {
      interaction.reply(
`${oItem} 은 존재하지 않는 아이템입니다!
<shop> 명령어를 사용하여 아이템 목록을 확인해주세요.`
      );

      return;
    }

    // 인벤토리 json으로 불러오기
    const invjson = JSON.parse(data.inventory);

    if (!invjson[arnum].count) {
      interaction.reply('해당 아이템을 가지고 있지 않습니다!');

      return;
    }

    const invlevel = invjson[arnum].level;

    const bonus =
      item!.level === 'common' ? 1 :
      item!.level === 'rare' ? 2 :
      item!.level === 'epic' ? 3 :
      item!.level === 'unique' ? 4 :
      item!.level === 'legend' ? 5 :
      0;

    // 강화 성공? 실패??
    const percent = Math.floor((invlevel + 100) / invlevel - bonus / invlevel);
    const num = Math.floor(Math.random() * 100) + 1;

    // 성공
    if (num <= percent) {
      invjson[arnum].level++;

      const inv = JSON.stringify(invjson);
      data.inventory = inv;
      data.save();

      interaction.reply({
        content:
`
Reinforce Complete! (Success)
Item: ${oItem}
`,
        files: ['./img/success.png']
      });

      return;
    }

    invjson[arnum].count--;
    
    const inv = JSON.stringify(invjson);
    data.inventory = inv;

    data.save();

    // 실패
    interaction.reply({
      content:
`
Reinforce Complete! (Failed)
Item: ${oItem}
`,
      files: ['./img/failed.png']
    });
  },
};

export default command;

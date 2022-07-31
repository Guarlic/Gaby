import {
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { UserModel } from '../../DataBase/UserSchema.js';

const execute = async (interaction: BaseCommandInteraction) => {
  const options = interaction.options as CommandInteractionOptionResolver;
  
  const target = options.getUser('user');

  if (target!.bot) {
    interaction.reply('그 유저는 봇입니다만 ㅡ.ㅡ');

    return;
  }

  const amount = options.getInteger('amount');

  const userdata = await UserModel.findOne({ id: interaction.user?.id });
  const targetdata = await UserModel.findOne({ id: target!.id})

  if (!userdata || !targetdata) {
    interaction.reply('너 혹은 그 유저가 가입을 하지 않았어!');

    return;
  }

  if (userdata.money - amount! < 0) {
    interaction.reply('삐빅- 잔액이 부족합니다.');

    return;
  }

  userdata.money -= amount!;
  targetdata.money += amount!;

  userdata.save();
  targetdata.save();

  interaction.reply(
    `성공적으로 <@${target!.id}> 님에게 ${amount!}₩ 을 드렸습니다!`
  );
};

export default execute;
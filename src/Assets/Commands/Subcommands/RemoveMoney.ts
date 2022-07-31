import {
  GuildMember,
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { UserModel } from '../../DataBase/UserSchema.js';

const execute = async (interaction: BaseCommandInteraction) => {
  const member = interaction.member as GuildMember;
  const options = interaction.options as CommandInteractionOptionResolver;

  if (!member.permissions.has('ADMINISTRATOR')) {
    interaction.reply('이 명령어를 사용하려면 관리자 권한이 필요합니다!');

    return;
  }

  const target = options.getUser('user');

  if (target!.bot) {
    interaction.reply('그 유저는 봇입니다만 ㅡ.ㅡ');

    return;
  }

  const amount = options.getInteger('amount');
  const targetdata = await UserModel.findOne({ id: target!.id });

  if (!targetdata) {
    interaction.reply('그 유저는 가입을 하지 않았어!');

    return;
  }

  if (targetdata.money - amount! < 0) {
    interaction.reply('삐빅- 지갑이 부족합니다.');

    return;
  }

  targetdata.money -= amount!;
  targetdata.save();

  interaction.reply(
    `성공적으로 <@${target!.id}> 님의 지갑에서 ${amount!}₩ 을 스을쩍 해왔습니다!`
  );
};

export default execute;
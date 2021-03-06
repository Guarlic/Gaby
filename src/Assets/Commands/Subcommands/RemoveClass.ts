import { BaseCommandInteraction } from 'discord.js';
import { UserModel } from '../../DataBase/UserSchema.js';

const execute = async (interaction: BaseCommandInteraction) => {
  const data = await UserModel.findOne({ id: interaction.user?.id });

  if (!data) {
    interaction.reply('먼저 가입 해주라능');

    return;
  }

  const Class = data.Class;

  if (!Class) {
    interaction.reply('너 이미 클래스가 없는데?');

    return;
  }

  data.Class = '';
  data.save();

  interaction.reply('성공적으로 클래스를 지웠습니다!');
};

export default execute;
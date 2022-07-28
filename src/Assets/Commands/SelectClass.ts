import {
  BaseCommandInteraction,
  CommandInteractionOptionResolver,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { UserModel } from '../DataBase/UserSchema.js';
import ClassBundle from '../Minigame/Classes/ClassBundle.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('setclass')
    .setDescription('set the class')
    .addStringOption(option =>
      option
        .setName('classname')
        .setDescription('insert class name')
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (!data) {
      interaction.reply('먼저 가입을 해주세요!');

      return;
    }

    // 옵션 불러오기
    const options = interaction.options as CommandInteractionOptionResolver;

    const oClass = options.getString('classname');
    const Class = ClassBundle.find(value => value.name === oClass);

    if (!Class) {
      interaction.reply('저기.. 그런 클래스는 없는것 같은뎁쇼?');

      return;
    }

    // 세이브~
    data.Class = Class.name;
    data.save();

    interaction.reply(`성공적으로 클래스를 '${Class.name}' (으)로 바꿨어요!`);
  },
};

export default command;
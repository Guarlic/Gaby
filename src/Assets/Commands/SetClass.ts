import {
  BaseCommandInteraction,
  CommandInteractionOptionResolver,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { UserModel } from '../DataBase/UserSchema.js';
import ClassBundle from '../Minigame/Classes/ClassBundle.js';
import ICommand from '../Interfaces/ICommand.js';

const knight = ClassBundle.find(value => value.name === 'Knight');
const tanker = ClassBundle.find(value => value.name === 'Tanker');
const wizard = ClassBundle.find(value => value.name === 'Wizard');

const command: ICommand = {
  Builder: new SlashCommandBuilder(),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });

    // 유저가 가입을 안했을때
    if (!data) {
      interaction.reply('먼저 가입을 해주세요!');

      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;

    const oClass = options.getString('classname');
    const Class = ClassBundle.find(value => value.name === oClass);

    // 클래스 바꿔주기
    await UserModel.updateOne(
      { id: interaction.user?.id },
      { Class: Class!.name }
    );

    interaction.reply(`성공적으로 클래스를 '${Class!.name}' (으)로 바꿨어요!`);
  },
};

export default command;
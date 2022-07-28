import { MessageEmbed, BaseCommandInteraction  } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { UserModel } from '../DataBase/UserSchema.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work!'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const arr: number[] = [ 80, 85, 90, 95, 100, 110, 115, 120, 200 ];
    const money = arr[Math.floor(Math.random() * arr.length)];

    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (data) {
      await UserModel.updateOne(
        { id: interaction.user?.id },
        { money: data.money + money }
      );

      const embed = new MessageEmbed()
        .setAuthor('Gaby', imageurl)
        .setColor(color)
        .setTitle('Work')
        .setDescription(
          `you earned money: ${money}`
        );

      interaction.reply({ embeds: [embed] });
    }
    else {
      interaction.reply('가입 처 해라 ^^');
    }
  },
};

export default command;
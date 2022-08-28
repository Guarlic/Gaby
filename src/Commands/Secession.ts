import { BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { UserModel } from '../DataBase/UserSchema.js';
import { Query } from '../DataBase/MySqlManager.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('secession')
    .setDescription('Delete your Gaby account'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user.id });

    if (!data) {
      interaction.reply('가입이나 해..');

      return;
    }

    await UserModel.deleteOne({ id: interaction.user.id });

    await Query(
      `delete from usecount where id = '${interaction.user.id}';`
    )

    interaction.reply('탈퇴 성공!');
  }
}

export default command;
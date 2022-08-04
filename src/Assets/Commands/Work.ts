import { MessageEmbed, BaseCommandInteraction  } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import { UserModel } from '../DataBase/UserSchema.js';
import { QuickDB } from 'quick.db';
import ICommand from '../Interfaces/ICommand.js';

const db = new QuickDB();

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work!'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const arr: number[] = [ 80, 85, 90, 95, 100, 110, 115, 120, 200 ];
    const xparr: number[] = [ 5, 10, 15, 20, 30, 50 ];

    const money = arr[Math.floor(Math.random() * arr.length)];
    const exp = xparr[Math.floor(Math.random() * xparr.length)];

    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (!data) {
      interaction.reply('가입 처 해라 ^^');

      return;
    }

    const workcooldown = 10000;
    const lastwork = await db.get(`work.${interaction.user?.id}`);

    if (lastwork && workcooldown - (Date.now() - Number(lastwork)) > 0) {
      const lefttime = Math.floor((workcooldown - (Date.now() - Number(lastwork))) / 1000);

      return interaction.reply(
        {
          content: `${lefttime}초 뒤에 재시도해주세요!`,
          ephemeral: true
        }
      );
    }
    else {
      await db.set(`workbefore.${interaction.user?.id}`, Number(lastwork));
      await db.set(`work.${interaction.user?.id}`, Date.now());
    }

    data.money += money;
    data.exp += exp;

    if (data.exp >= data.level * 100) {
      data.exp -= data.level * 100;
      data.level++;
    }

    data.save();

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('Work')
      .setDescription(
        `you earned money: ${money}₩`
      )
      .setFooter(`and.. ${exp}xp..`);

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
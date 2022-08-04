import {
  MessageAttachment,
  BaseCommandInteraction
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { readFile } from 'fs/promises';
import { request } from 'undici';
import { UserModel } from '../DataBase/UserSchema.js';
import Canvas from '@napi-rs/canvas';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('your profile'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const data = await UserModel.findOne({ id: interaction.user?.id });

    if (!data) {
      interaction.reply('가입을 해주고 찾아와라');

      return;
    }

    const canvas = Canvas.createCanvas(1200, 300);
    const context = canvas.getContext('2d');

    const backgroundImage = await readFile('./img/src.png');
    const background = new Canvas.Image();

    background.src = backgroundImage;

    context.drawImage(background, 0, 0);

    context.strokeStyle = '#0xBDBDBD';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = '60px Maplestory';
    context.fillStyle = '#0xBDBDBD';

    context.fillText(
      `${interaction.user.username}#${interaction.user.discriminator}`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    context.font = '40px Maplestory';

    context.fillText(
      `Lv.${data.level}`,
      canvas.width / 2.5,
      canvas.height / 1.4
    );

    context.font = '30px Maplestory';

    context.fillText(
      `${data.exp} / ${data.level * 100}xp`,
      canvas.width / 2.5,
      canvas.height / 1.2
    );

    context.fillText(
      `id: ${interaction.user.id}`,
      canvas.width / 2.5,
      canvas.height / 3
    );

    context.beginPath();
    context.arc(152, 152, 120, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
    const avatar = new Canvas.Image();
    avatar.src = Buffer.from(await body.arrayBuffer());

    context.drawImage(avatar, 30, 30, 250, 250);

    const attachment = new MessageAttachment(canvas.toBuffer('image/png'));

    interaction.reply({ content: '!Your Profile!', files: [attachment] });
  },
};

export default command;
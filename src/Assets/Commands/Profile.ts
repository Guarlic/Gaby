import {
  MessageAttachment,
  BaseCommandInteraction
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { readFile } from 'fs/promises';
import { request } from 'undici';
import Canvas from '@napi-rs/canvas';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('your profile'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const canvas = Canvas.createCanvas(1200, 300);
    const context = canvas.getContext('2d');

    const backgroundImage = await readFile('./템플릿2.png');
    const background = new Canvas.Image();

    background.src = backgroundImage;

    context.drawImage(background, 0, 0);

    context.strokeStyle = '#0xBDBDBD';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
    const avatar = new Canvas.Image();
    avatar.src = Buffer.from(await body.arrayBuffer());

    context.drawImage(avatar, 30, 30, 250, 250);

    context.font = '60px sans-serif';
    context.fillStyle = '#0xBDBDBD';
    context.fillText(
      `${interaction.user.username}#${interaction.user.discriminator}`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    context.font = '30px sans-serif';
    context.fillText(
      `id: ${interaction.user.id}`,
      canvas.width / 2.5,
      canvas.height / 3
    );

    const attachment = new MessageAttachment(canvas.toBuffer('image/png'));

    interaction.reply({ files: [attachment] });
  },
};

export default command;
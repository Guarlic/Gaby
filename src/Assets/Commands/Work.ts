import { MessageEmbed, BaseCommandInteraction  } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work!'),
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const arr: number[] = [ 80, 85, 90, 95, 100, 110, 115, 120, 200 ];
    const embed = new MessageEmbed()
      .setAuthor('Gaby')
      .setColor(0x47C83E)
      .setTitle('Work')
      .setDescription(`you earned money: ${arr[Math.floor(Math.random() * arr.length)]}`);
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
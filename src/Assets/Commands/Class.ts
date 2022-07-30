import {
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ClassBundle from '../Minigame/Classes/ClassBundle.js';
import SetClass from './SetClass.js';
import CheckClass from './CheckClass.js';
import RemoveClass from './RemoveClass.js';
import ICommand from '../Interfaces/ICommand.js';

const knight = ClassBundle.find(value => value.name === 'Knight');
const tanker = ClassBundle.find(value => value.name === 'Tanker');
const wizard = ClassBundle.find(value => value.name === 'Wizard');

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('class')
    .setDescription('Class command')
    .addSubcommand(command =>
      command
        .setName('set')
        .setDescription('set your class')
        .addStringOption(option =>
          option
            .setName('classname')
            .setDescription('insert class name')
            .addChoices(
              { name: `Knight (atk: ${knight!.attack} def: ${knight!.defence})`, value: 'Knight' },
              { name: `Tanker (atk: ${tanker!.attack} def: ${tanker!.defence})`, value: 'Tanker' },
              { name: `Wizard (atk: ${wizard!.attack} def: ${wizard!.defence})`, value: 'Wizard' },
            )
            .setRequired(true)
        )
    )
    .addSubcommand(command =>
      command
        .setName('check')
        .setDescription('check your class')
    )
    .addSubcommand(command =>
      command
        .setName('remove')
        .setDescription('remove your class')
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    // 서브커맨드 마다 실행하기
    switch (options.getSubcommand()) {
      case 'set': SetClass.SlashExecute(interaction); break;
      case 'check': CheckClass.SlashExecute(interaction); break;
      case 'remove': RemoveClass.SlashExecute(interaction); break;
    }
  },
};

export default command;
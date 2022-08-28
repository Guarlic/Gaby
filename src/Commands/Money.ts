import {
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import GiveMoneyExecute from './Subcommands/GiveMoney.js';
import AddMoneyExecute from './Subcommands/AddMoney.js';
import RemoveMoneyExecute from './Subcommands/RemoveMoney.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('money')
    .setDescription('edit user\'s money')
    .addSubcommand(command =>
      command
        .setName('give')
        .setDescription('give your money to someone')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('user you want to give money')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('amount')
            .setDescription('amount of money')
            .setRequired(true)
        )
    )
    .addSubcommand(command =>
      command
        .setName('add')
        .setDescription('add money')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('user you want to add money')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('amount')
            .setDescription('amount of money')
            .setRequired(true)
        )
    )
    .addSubcommand(command =>
      command
        .setName('remove')
        .setDescription('remove money')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('user you want to remove money')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('amount')
            .setDescription('amount of money')
            .setRequired(true)
        )
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    switch (options.getSubcommand()) {
      case 'give': GiveMoneyExecute(interaction); break;
      case 'add': AddMoneyExecute(interaction); break;
      case 'remove': RemoveMoneyExecute(interaction); break;
    }
  },
};

export default command;
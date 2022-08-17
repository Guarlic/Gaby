import { BaseCommandInteraction } from 'discord.js';
import { UserModel } from '../DataBase/UserSchema.js';
import { pool, Query } from '../DataBase/MySqlManager.js';
import CommandBundle from '../Commands/CommandBundle.js';
import logger from '../Utils/Logger.js';

async function InterAcCommand(interaction: BaseCommandInteraction) {
  const command = CommandBundle.find(
    value => value.Builder.name === interaction.commandName,
  );

  if (!command) return;

  logger.info(
`
At Server <${interaction.guild?.name}>
User [${interaction.user.username}]
executed command: ${interaction.commandName}`
  );

  /*const res = await Query(
    `select * from usecount where id = '${interaction.user.id}';`
  );*/

  await Query(
    `insert into usecount values ('${interaction.user.id}', 1) on duplicate key update value = value + 1;`
  );

  const data = await UserModel.findOne({ id: interaction.user.id });

  const ignorelist = [
    'profile',
    'wallet',
    'inventory',
  ];

  if (data && !ignorelist.find(value => value === interaction.commandName)) {
    const xplist = [ 1, 3, 5, 7, 9, 10 ];
    const xp = xplist[Math.floor(Math.random() * xplist.length)];

    data.exp += xp;

    if (data.exp >= data.level * 100) {
      data.exp -= data.level * 100;
      data.level++;
      interaction.channel?.send(
        `<@${interaction.user.id}>, Levelup! (${data.level - 1} -> ${data.level})`
      );
    }

    data.save();
  }

  command.SlashExecute(interaction);
}

export default InterAcCommand;
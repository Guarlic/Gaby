import { BaseCommandInteraction } from 'discord.js';
import { UserModel } from '../DataBase/UserSchema.js';
import { connection } from '../DataBase/MySqlManager.js';
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

  connection.query(
    `select * from usecount where id = '${interaction.user.id}';`,
    async (err, rows) => {
      if (err) throw err;
      
      if (rows.length < 1) {
        connection.query(
          `insert into usecount values ('${interaction.user.id}', 1)`
        );
      }
      else {
        connection.query(
          `update usecount set value = ${rows[0].value + 1}`
        );
      }
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
    },
  );

  command.SlashExecute(interaction);
}

export default InterAcCommand;
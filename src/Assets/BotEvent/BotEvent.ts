/* eslint-disable no-use-before-define */
// #region import/declare
// 임포트
import {
  Client,
  Intents,
  Message,
  ActivityOptions,
  Interaction,
} from 'discord.js';
import InterAcRecvFunc from './InterAcRecv.js';
import logger from '../Utils/Logger.js';

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// #region 봇 이벤트 함수

/**
 * 봇 스타트 함수
 */
export async function Start() {
  logger.info(`Gaby has started.`);

  setInterval(() => {
    const latency = client.ws.ping;

    const activitylist: ActivityOptions[] = [
      { name: `${latency}ms 로 서비스 제공`, type: 'PLAYING' },
      { name: `${client.guilds.cache.size}개의 서버에서 함께`, type: 'PLAYING' },
      { name: '여러분의 목소리를', type: 'LISTENING' },
    ];

    client.user?.setActivity(
      activitylist[Math.floor(Math.random() * activitylist.length)]
    );
  }, 5000);
}

/**
 * 메세지 감지 함수임
 * @param msg 메세지
 */
export async function MsgRecv(msg: Message) {
  if (msg.author.bot) return;

  logger.info(
    `At Server <${msg.guild?.name}> User [${msg.author.username}] said "${msg.content}"`
  );
}

export async function InterAcRecv(interaction: Interaction) {
  InterAcRecvFunc(interaction);
}

/**
 * 에러가 나면 에라났다고 reply 라도 하라고 착한 마실롯이 만든 함수
 * @param msg 메세지
 * @param err 에러
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function ErrorInMsgProcess(msg: Message, err: any) {
  msg.reply(`Error Occured While Progress \n Error: ${err}`);
}

// #endregion

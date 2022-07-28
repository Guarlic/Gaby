import ICommand from '../Interfaces/ICommand.js';
import Wallet from './Wallet.js';
import Work from './Work.js';
import Shop from './Shop.js';
import Buy from './Buy.js';
import Debug from './Debug.js';
import Inventory from './Inventory.js';
import Regist from './Regist.js';
import Profile from './Profile.js';
import Ping from './Ping.js';
import Upgrade from './Upgrade.js';
import Secession from './Secession.js';

const CommandBundle: ICommand[] = [
  Wallet,
  Work,
  Shop,
  Buy,
  Debug,
  Inventory,
  Regist,
  Profile,
  Ping,
  Upgrade,
  Secession,
];

export default CommandBundle;

import ICommand from '../Interfaces/ICommand.js';
import Wallet from './Wallet.js';
import Work from './Work.js';
import Shop from './Shop.js';
import Buy from './Buy.js';
import Debug from './Debug.js';
import Inventory from './Inventory.js';
import Regist from './Regist.js';

const CommandBundle: ICommand[] = [
  Wallet,
  Work,
  Shop,
  Buy,
  Debug,
  Inventory,
  Regist,
];

export default CommandBundle;

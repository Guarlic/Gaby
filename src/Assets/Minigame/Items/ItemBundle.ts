import IItem from '../../Interfaces/IItem.js';

const Sword: IItem = {
  name: 'Sword',
  description: 'Normal Sword',
  price: 100,
  level: 'common',
};

const StarSword: IItem = {
  name: 'StarSword',
  description: 'Star Sword',
  price: 320,
  level: 'unique',
};

const Shield: IItem = {
  name: 'Shield',
  description: 'Normal Shield',
  price: 110,
  level: 'common',
};

const Pickaxe: IItem = {
  name: 'Pickaxe',
  description: 'Normal Pickaxe',
  price: 200,
  level: 'rare',
};

const RandomBox: IItem = {
  name: 'RandomBox',
  description: 'Random Box',
  price: 150,
  level: 'unkown',
};

const ItemBundle: IItem[] = [
  Sword,
  StarSword,
  Shield,
  Pickaxe,
  RandomBox,
];

export default ItemBundle;
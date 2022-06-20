import IItem from '../../Interfaces/IItem.js';

const Sword: IItem = {
  name: 'Sword',
  description: 'Normal Sword',
  price: 100,
};

const Shield: IItem = {
  name: 'Shield',
  description: 'Normal Shield',
  price: 110,
};

const Pickaxe: IItem = {
  name: 'Pickaxe',
  description: 'Normal Pickaxe',
  price: 200,
};

const ItemBundle: IItem[] = [
  Sword,
  Shield,
  Pickaxe
];

export default ItemBundle;
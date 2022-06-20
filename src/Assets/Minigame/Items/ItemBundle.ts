import IItem from '../../Interfaces/IItem.js';

/**
 * 울어라 타스참마도
 **/
const Sword: IItem = {
  name: 'Sword',
  description: 'Normal Sword',
  price: 100,
};

/**
 * 운터쉴드!!! 
 **/
const Shield: IItem = {
  name: 'Shield',
  description: 'Normal Shield',
  price: 110,
};

/**
 * 금곡괭이 헤헤헤헤헤헿
 **/
const Pickaxe: IItem = {
  name: 'Pickaxe',
  description: 'Normal Pickaxe',
  price: 200,
};

/**
 * 아이템 어셈블!!
 **/
const ItemBundle: IItem[] = [
  Sword,
  Shield,
  Pickaxe
];

export default ItemBundle;
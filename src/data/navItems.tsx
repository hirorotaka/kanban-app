import { IoHome, IoGridOutline, IoBriefcase } from 'react-icons/io5';
import { NavItem } from '../types/type';

export const defaultNavItems: NavItem[] = [
  { id: '5033751', icon: <IoHome />, label: '仕事用' },
  { id: '5033752', icon: <IoGridOutline />, label: '個人用' },
  { id: '5033753', icon: <IoBriefcase />, label: '家族用' },
];


import { Member, FoodItem, InventoryItem } from '../types';

export const mockMembers: Member[] = [
  { id: '1', name: 'Alok Mishra', preference: 'Non-Veg', amountPaid: 500 },
  { id: '2', name: 'Sagar Nayak', preference: 'Non-Veg', amountPaid: 500 },
  { id: '3', name: 'Ritesh Kumar', preference: 'Veg', amountPaid: 200 },
  { id: '4', name: 'Pooja Das', preference: 'Veg', amountPaid: 500 },
  { id: '5', name: 'Binod Rout', preference: 'Non-Veg', amountPaid: 0 },
  { id: '6', name: 'Smruti Rekha', preference: 'Veg', amountPaid: 500 },
  { id: '7', name: 'Debasish Sahu', preference: 'Non-Veg', amountPaid: 500 },
  { id: '8', name: 'Manas Pradhan', preference: 'Non-Veg', amountPaid: 300 },
];

export const mockFood: FoodItem[] = [
  { id: '1', name: 'Chicken Curry', type: 'Non-Veg' },
  { id: '2', name: 'Mutton Kasa', type: 'Non-Veg' },
  { id: '3', name: 'Paneer Butter Masala', type: 'Veg' },
  { id: '4', name: 'Mixed Veg', type: 'Veg' },
  { id: '5', name: 'Jeera Rice', type: 'Common' },
  { id: '6', name: 'Dal Fry', type: 'Common' },
  { id: '7', name: 'Salad & Papad', type: 'Common' },
  { id: '8', name: 'Gulab Jamun', type: 'Common' },
];

export const mockItems: InventoryItem[] = [
  { id: '1', name: 'Sound Box', isArranged: true },
  { id: '2', name: 'Cooking Utensils', isArranged: true },
  { id: '3', name: 'Disposable Plates', isArranged: false },
  { id: '4', name: 'First Aid Kit', isArranged: true },
  { id: '5', name: 'Drinking Water (20L jars)', isArranged: false },
  { id: '6', name: 'Carpets', isArranged: true },
];

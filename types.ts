
export type FoodType = 'Veg' | 'Non-Veg' | 'Common';
export type DietPreference = 'Veg' | 'Non-Veg';

export interface Member {
  id: string;
  name: string;
  preference: DietPreference;
  amountPaid: number;
}

export interface FoodItem {
  id: string;
  name: string;
  type: FoodType;
}

export interface InventoryItem {
  id: string;
  name: string;
  isArranged: boolean;
}

export interface PicnicStats {
  totalMembers: number;
  totalCollected: number;
  expectedTotal: number;
  feesPerMember: number;
  vegCount: number;
  nonVegCount: number;
}

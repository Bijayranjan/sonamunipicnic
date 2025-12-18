
import { Member, FoodItem, InventoryItem, DietPreference, FoodType } from '../types';

const parseCSV = (csv: string) => {
  // Handle different line endings and filter empty lines
  const lines = csv.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  return lines.slice(1).map(line => {
    // Basic CSV splitting (doesn't handle commas inside quotes, but fine for simple sheets)
    const values = line.split(',').map(v => v.trim());
    const obj: any = {};
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });
    return obj;
  });
};

export const fetchMembers = async (url: string): Promise<Member[]> => {
  if (!url) throw new Error("No URL");
  const res = await fetch(url);
  const text = await res.text();
  const data = parseCSV(text);
  
  return data.map((item, index) => {
    // Flexible preference matching to fix counter malfunction
    const rawPref = (item.preference || item['diet preference'] || item['veg/non-veg'] || "Non-Veg").toLowerCase();
    let normalizedPref: DietPreference = 'Non-Veg';
    if (rawPref.includes('veg') && !rawPref.includes('non')) {
      normalizedPref = 'Veg';
    }

    const amount = Number(item['amount paid'] || item.amountpaid || item.amount || 0);

    return {
      id: String(index + 1),
      name: item.name || "Unknown",
      preference: normalizedPref,
      amountPaid: isNaN(amount) ? 0 : amount
    };
  });
};

export const fetchFood = async (url: string): Promise<FoodItem[]> => {
  if (!url) throw new Error("No URL");
  const res = await fetch(url);
  const text = await res.text();
  const data = parseCSV(text);
  
  return data.map((item, index) => ({
    id: String(index + 1),
    name: item['item name'] || item.itemname || item.name || "Unknown",
    type: (item.type || "Common") as FoodType
  }));
};

export const fetchItems = async (url: string): Promise<InventoryItem[]> => {
  if (!url) throw new Error("No URL");
  const res = await fetch(url);
  const text = await res.text();
  const data = parseCSV(text);
  
  return data.map((item, index) => ({
    id: String(index + 1),
    name: item['item name'] || item.itemname || item.name || "Unknown",
    isArranged: (item.arranged || "").toLowerCase() === 'yes' || (item.arranged || "").toLowerCase() === 'true'
  }));
};

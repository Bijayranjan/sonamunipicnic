
export const PICNIC_DATE = new Date('2025-12-28T07:00:00');
export const PICNIC_LOCATION_URL = "https://share.google/4a7G6O8pay9uFCnGN";
export const PICNIC_SPOT_NAME = "Sonamuni Jungle Beach";
export const FEES_PER_MEMBER: number | null = null; // null indicates 'Undecided'

/**
 * GOOGLE SHEET SETUP:
 * 1. Publish your sheet to web: File > Share > Publish to Web
 * 2. Select "Link" -> "Entire Document" -> "Comma-separated values (.csv)"
 * 3. Paste the URL here.
 */
export const SHEET_URLS = {
  MEMBERS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAQk8mA3mHRx9TFJw4dDakXkC3y0WSfbbJXaYWkbFlUXJ_s9aR5WQkg4vlwtobH8WF74KxEmtz946H/pub?gid=0&single=true&output=csv",
  FOOD: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAQk8mA3mHRx9TFJw4dDakXkC3y0WSfbbJXaYWkbFlUXJ_s9aR5WQkg4vlwtobH8WF74KxEmtz946H/pub?gid=533021685&single=true&output=csv",
  ITEMS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAQk8mA3mHRx9TFJw4dDakXkC3y0WSfbbJXaYWkbFlUXJ_s9aR5WQkg4vlwtobH8WF74KxEmtz946H/pub?gid=372426241&single=true&output=csv"
};

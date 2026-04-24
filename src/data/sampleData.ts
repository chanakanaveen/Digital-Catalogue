// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  emoji: string
}

export interface PriceMatrixEntry {
  size: string
  color: string
  price: number
}

export interface Product {
  id: string
  code: string
  name: string
  subtitle: string
  price_type: 'single' | 'matrix'
  price?: number
  price_unit?: string
  price_matrix?: PriceMatrixEntry[]
  description: string
  key_features: string[]
  pack_size: string
  shelf_life: string
  category_id: string
}

// ─── Valid Company Codes ──────────────────────────────────────────────────────

export const VALID_COMPANY_CODES: Record<string, string> = {
  ACME2025: 'Acme Corporation',
  DEMO: 'Demo Company',
  TEST: 'Test Company',
  SALES: 'Sales Corp',
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const sampleCategories: Category[] = [
  { id: '1', name: 'Beverages', emoji: '🥤' },
  { id: '2', name: 'Snacks', emoji: '🍿' },
  { id: '3', name: 'Dairy & Eggs', emoji: '🥛' },
  { id: '4', name: 'Personal Care', emoji: '🧴' },
  { id: '5', name: 'Home Care', emoji: '🧹' },
  { id: '6', name: 'Baby Care', emoji: '🍼' },
  { id: '7', name: 'Confectionery', emoji: '🍬' },
  { id: '8', name: 'Biscuits & Cookies', emoji: '🍪' },
  { id: '9', name: 'More Categories', emoji: '📦' },
]

// ─── Products by Category ─────────────────────────────────────────────────────

export const sampleProducts: Record<string, Product[]> = {
  '1': [
    {
      id: 'brv-001',
      code: 'BRV-00125',
      name: 'Acme Mineral Water 1L Bottle',
      subtitle: 'Still Water • 1 Litre',
      price_type: 'single',
      price: 20,
      price_unit: 'Per Bottle',
      description:
        'Acme Mineral Water is sourced from natural springs and purified with advanced technology to deliver clean, refreshing and healthy hydration. Ideal for everyday use at home, office, or on the go.',
      key_features: [
        '100% Natural & Pure',
        'Essential Minerals Retained',
        'Safe & Hygienic Packaging',
        'Refreshing Taste',
      ],
      pack_size: '12 Bottles / Case',
      shelf_life: '12 Months',
      category_id: '1',
    },
    {
      id: 'brv-002',
      code: 'BRV-00250',
      name: 'Acme Soft Drink 2L Bottle',
      subtitle: 'Assorted Flavours',
      price_type: 'matrix',
      price_matrix: [
        { size: '500ml', color: 'Cola', price: 18 },
        { size: '500ml', color: 'Orange', price: 18 },
        { size: '500ml', color: 'Lemon', price: 18 },
        { size: '500ml', color: 'Lime', price: 18 },
        { size: '1 Litre', color: 'Cola', price: 28 },
        { size: '1 Litre', color: 'Orange', price: 28 },
        { size: '1 Litre', color: 'Lemon', price: 28 },
        { size: '1 Litre', color: 'Lime', price: 28 },
        { size: '2 Litre', color: 'Cola', price: 48 },
        { size: '2 Litre', color: 'Orange', price: 48 },
        { size: '2 Litre', color: 'Lemon', price: 48 },
        { size: '2 Litre', color: 'Lime', price: 48 },
      ],
      description:
        'Acme Soft Drink is available in four refreshing flavours and three convenient sizes. Made with real fruit essence and no artificial colours.',
      key_features: [
        'Real Fruit Essence',
        'No Artificial Colours',
        'Available in 4 Flavours',
        'Chilled or Room Temperature',
      ],
      pack_size: '24 Bottles / Case',
      shelf_life: '9 Months',
      category_id: '1',
    },
    {
      id: 'brv-003',
      code: 'BRV-00310',
      name: 'Acme Orange Juice 1L Tetra',
      subtitle: '100% Pure Juice • No Added Sugar',
      price_type: 'single',
      price: 85,
      price_unit: 'Per Pack',
      description:
        'Freshly pressed orange juice packed in hygienic Tetra Pak cartons. No preservatives, no added sugar — just the goodness of real oranges.',
      key_features: [
        'No Added Sugar',
        'No Preservatives',
        'Rich in Vitamin C',
        'Tetra Pak Sealed',
      ],
      pack_size: '12 Packs / Case',
      shelf_life: '6 Months (Unopened)',
      category_id: '1',
    },
    {
      id: 'brv-004',
      code: 'BRV-00412',
      name: 'Acme Energy Drink 250ml',
      subtitle: 'Caffeine + B-Vitamins',
      price_type: 'single',
      price: 55,
      price_unit: 'Per Can',
      description:
        'An energising drink with 80 mg of natural caffeine, B-vitamins, and taurine to keep you sharp and focused throughout the day.',
      key_features: [
        '80mg Natural Caffeine',
        'B-Vitamin Complex',
        'Taurine Added',
        'Sugar-Free Option Available',
      ],
      pack_size: '24 Cans / Case',
      shelf_life: '18 Months',
      category_id: '1',
    },
    {
      id: 'brv-005',
      code: 'BRV-00505',
      name: 'Acme Green Tea 500ml',
      subtitle: 'Lightly Sweetened • Chilled',
      price_type: 'single',
      price: 35,
      price_unit: 'Per Bottle',
      description:
        'Brewed with premium green tea leaves and lightly sweetened with cane sugar. Best served chilled.',
      key_features: [
        'Premium Tea Leaves',
        'Lightly Sweetened',
        'Antioxidant Rich',
        'No Artificial Flavours',
      ],
      pack_size: '12 Bottles / Case',
      shelf_life: '8 Months',
      category_id: '1',
    },
  ],
  '2': [
    {
      id: 'snk-001',
      code: 'SNK-00101',
      name: 'Acme Potato Chips Original',
      subtitle: 'Salted • 100g Pack',
      price_type: 'single',
      price: 30,
      price_unit: 'Per Pack',
      description:
        'Crispy potato chips made from the finest potatoes, seasoned with just the right amount of salt. A timeless snack for all occasions.',
      key_features: ['Crispy Texture', 'Lightly Salted', 'No MSG', 'Resealable Pack'],
      pack_size: '24 Packs / Carton',
      shelf_life: '6 Months',
      category_id: '2',
    },
    {
      id: 'snk-002',
      code: 'SNK-00202',
      name: 'Acme Corn Puffs Cheese',
      subtitle: 'Cheesy Flavour • 80g',
      price_type: 'single',
      price: 25,
      price_unit: 'Per Pack',
      description:
        'Light and airy corn puffs coated in rich cheddar cheese flavour. A perfect snack for kids and adults alike.',
      key_features: [
        'Real Cheese Flavour',
        'Light & Airy',
        'Gluten Free',
        'No Artificial Colours',
      ],
      pack_size: '30 Packs / Carton',
      shelf_life: '5 Months',
      category_id: '2',
    },
    {
      id: 'snk-003',
      code: 'SNK-00303',
      name: 'Acme Trail Mix Premium',
      subtitle: 'Nuts, Seeds & Dried Fruit • 200g',
      price_type: 'single',
      price: 120,
      price_unit: 'Per Bag',
      description:
        'A premium blend of almonds, cashews, walnuts, pumpkin seeds, and dried cranberries. A healthy, satisfying snack.',
      key_features: [
        'Mixed Nuts & Seeds',
        'Dried Cranberries',
        'No Added Salt',
        'High in Protein',
      ],
      pack_size: '12 Bags / Carton',
      shelf_life: '10 Months',
      category_id: '2',
    },
  ],
  '3': [
    {
      id: 'dry-001',
      code: 'DRY-00101',
      name: 'Acme Full Cream Milk 1L',
      subtitle: 'Pasteurised • Tetra Pak',
      price_type: 'single',
      price: 65,
      price_unit: 'Per Pack',
      description:
        'Full cream pasteurised milk sourced from local dairy farms. Rich in calcium and protein, ideal for the whole family.',
      key_features: [
        'Full Cream',
        'Pasteurised & Safe',
        'High Calcium',
        'Tetra Pak Sealed',
      ],
      pack_size: '12 Packs / Case',
      shelf_life: '3 Months (UHT)',
      category_id: '3',
    },
    {
      id: 'dry-002',
      code: 'DRY-00202',
      name: 'Acme Cheddar Cheese Block 400g',
      subtitle: 'Mature Cheddar • Block',
      price_type: 'single',
      price: 210,
      price_unit: 'Per Block',
      description:
        'Aged mature cheddar cheese with a sharp, tangy flavour. Ideal for sandwiches, cooking, and cheese boards.',
      key_features: ['Mature 12-Month Aged', 'Sharp Flavour', 'Vacuum Sealed', 'Vegetarian Rennet'],
      pack_size: '6 Blocks / Case',
      shelf_life: '6 Months (Sealed)',
      category_id: '3',
    },
  ],
  '4': [
    {
      id: 'prs-001',
      code: 'PRS-00101',
      name: 'Acme Moisturising Lotion 200ml',
      subtitle: 'Aloe Vera & Vitamin E',
      price_type: 'single',
      price: 95,
      price_unit: 'Per Bottle',
      description:
        'A lightweight daily moisturiser enriched with aloe vera and Vitamin E. Absorbs quickly and leaves skin soft and hydrated.',
      key_features: ['Aloe Vera Extract', 'Vitamin E Enriched', 'Non-Greasy', 'Dermatologist Tested'],
      pack_size: '48 Bottles / Carton',
      shelf_life: '24 Months',
      category_id: '4',
    },
    {
      id: 'prs-002',
      code: 'PRS-00202',
      name: 'Acme Herbal Shampoo 350ml',
      subtitle: 'Anti-Dandruff Formula',
      price_type: 'single',
      price: 145,
      price_unit: 'Per Bottle',
      description:
        'Herbal shampoo with neem and tea tree extracts for effective anti-dandruff protection and healthy scalp maintenance.',
      key_features: [
        'Neem & Tea Tree Extract',
        'Anti-Dandruff',
        'pH Balanced',
        'Sulphate Free',
      ],
      pack_size: '24 Bottles / Carton',
      shelf_life: '24 Months',
      category_id: '4',
    },
  ],
  '5': [],
  '6': [
    {
      id: 'bby-001',
      code: 'BBY-00101',
      name: 'Acme Baby Diapers Newborn',
      subtitle: 'Size S • 0–5kg • 40 Count',
      price_type: 'single',
      price: 350,
      price_unit: 'Per Pack',
      description:
        'Ultra-soft baby diapers designed for newborns. With a wetness indicator and breathable outer layer for 12-hour dryness.',
      key_features: [
        'Wetness Indicator',
        '12-Hour Protection',
        'Breathable Layer',
        'Dermatologically Tested',
      ],
      pack_size: '6 Packs / Carton',
      shelf_life: '36 Months',
      category_id: '6',
    },
    {
      id: 'bby-002',
      code: 'BBY-00202',
      name: 'Acme Baby Lotion 100ml',
      subtitle: 'Gentle Formula • 0–12 Months',
      price_type: 'single',
      price: 110,
      price_unit: 'Per Bottle',
      description:
        'A mild, fragrance-free lotion specially formulated for newborn and infant skin. Hypoallergenic and paediatrician approved.',
      key_features: ['Fragrance Free', 'Hypoallergenic', 'Paediatrician Approved', 'No Parabens'],
      pack_size: '24 Bottles / Carton',
      shelf_life: '24 Months',
      category_id: '6',
    },
  ],
  '7': [
    {
      id: 'cnf-001',
      code: 'CNF-00101',
      name: 'Acme Dark Chocolate Bar 70g',
      subtitle: '70% Cocoa • Rich & Smooth',
      price_type: 'single',
      price: 75,
      price_unit: 'Per Bar',
      description:
        'Premium dark chocolate made with 70% finest cocoa. Smooth, rich and slightly bitter — a connoisseur\'s choice.',
      key_features: ['70% Cocoa', 'No Artificial Flavours', 'Fair Trade Cocoa', 'Vegan Friendly'],
      pack_size: '24 Bars / Carton',
      shelf_life: '12 Months',
      category_id: '7',
    },
    {
      id: 'cnf-002',
      code: 'CNF-00202',
      name: 'Acme Fruit Jellies Assorted',
      subtitle: 'Mixed Fruit Flavours • 200g',
      price_type: 'single',
      price: 55,
      price_unit: 'Per Box',
      description:
        'Soft and chewy fruit jellies in assorted flavours including strawberry, mango, orange and lime. A family favourite.',
      key_features: ['Assorted Flavours', 'No Artificial Colours', 'Gluten Free', 'Individually Wrapped'],
      pack_size: '24 Boxes / Carton',
      shelf_life: '9 Months',
      category_id: '7',
    },
  ],
  '8': [
    {
      id: 'bsc-001',
      code: 'BSC-00101',
      name: 'Acme Butter Cookies 200g',
      subtitle: 'Rich Butter Flavour • Tin',
      price_type: 'single',
      price: 125,
      price_unit: 'Per Tin',
      description:
        'Classic butter cookies baked to golden perfection. Available in a beautiful reusable tin — perfect for gifting.',
      key_features: ['Real Butter', 'Golden Baked', 'Reusable Tin', 'No Preservatives'],
      pack_size: '12 Tins / Carton',
      shelf_life: '9 Months',
      category_id: '8',
    },
    {
      id: 'bsc-002',
      code: 'BSC-00202',
      name: 'Acme Digestive Biscuits 400g',
      subtitle: 'High Fibre Wholewheat',
      price_type: 'single',
      price: 65,
      price_unit: 'Per Pack',
      description:
        'Wholesome wholewheat digestive biscuits with high fibre content. Ideal with tea or as a light snack any time of day.',
      key_features: ['High Fibre', 'Wholewheat', 'Low Sugar', 'No Artificial Additives'],
      pack_size: '20 Packs / Carton',
      shelf_life: '8 Months',
      category_id: '8',
    },
    {
      id: 'bsc-003',
      code: 'BSC-00303',
      name: 'Acme Cream Sandwich Cookies 300g',
      subtitle: 'Chocolate & Vanilla Cream',
      price_type: 'single',
      price: 45,
      price_unit: 'Per Pack',
      description:
        'Two crisp chocolate biscuit layers sandwiching a generous vanilla cream filling. Loved by kids and adults alike.',
      key_features: ['Double Chocolate Biscuit', 'Vanilla Cream Centre', 'Twist & Lick Design', 'Snack Packs Available'],
      pack_size: '24 Packs / Carton',
      shelf_life: '7 Months',
      category_id: '8',
    },
  ],
  '9': [],
}

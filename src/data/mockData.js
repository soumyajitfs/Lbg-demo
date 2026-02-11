// ============================================================
// Ticketing Management System — Mock Data
// Each DSAR ticket can have MULTIPLE products
// ============================================================

// ── Helper: generate 10 pre-populated notes for a given created date ──
const buildNotes = (baseDate) => {
  const texts = [
    "Customer profile found under current address on PBS and Cobra.",
    "Additional address found added on pega.(No profile found)",
    "Product found.",
    "YPSOR trawl added pluto updated",
    "Setup pack, CINS and Hub attached. Archive Memos updated.",
    "YPSOR updated on SharePoint and uploaded under PLUTO.",
    "30 90 days customer ACK letter attached with specified product.",
    "Homeworking spreadsheet updated.",
    "Calls spreadsheet updated.",
    "Setup pack and 30 days ACK letter attached on PEGA.",
  ];
  const authors = ["John Smith", "Sarah Connor", "Emily Davis"];
  const base = new Date(baseDate);
  return texts.map((text, i) => {
    const d = new Date(base);
    d.setHours(9 + i, i * 7 % 60, 0);
    const ts = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    return { id: i + 1, text, author: authors[i % authors.length], timestamp: ts };
  });
};

export const ticketRecords = [
  {
    caseId: "DSAR-001",
    agreementNumber: "AGR-880001",
    brandName: "Lloyds Mixed",
    dsarType: "Lloyds Mixed Product",
    customerName: "James Wilson",
    status: "Open",
    createdDate: "2026-01-15",
    email: "james.wilson@example.com",
    phone: "+44 7700 900123",
    address: "12 Baker Street, London, NW1 6XE",
    products: [
      { productId: "PROD-5001", productName: "Credit Card", rollNumber: "RL-110001" },
      { productId: "PROD-5010", productName: "Savings", rollNumber: "RL-110005" },
      { productId: "PROD-5011", productName: "Loan", rollNumber: "RL-110006" },
    ],
    notes: buildNotes("2026-01-15"),
  },
  {
    caseId: "DSAR-002",
    agreementNumber: "AGR-990001",
    brandName: "HBOS Mixed",
    dsarType: "HBOS Mixed Product",
    customerName: "Sarah Thompson",
    status: "In Progress",
    createdDate: "2026-01-22",
    email: "sarah.thompson@example.com",
    phone: "+44 7700 900456",
    address: "45 Oxford Road, Manchester, M1 4BH",
    products: [
      { productId: "PROD-5002", productName: "Mortgage", rollNumber: "RL-220001" },
      { productId: "PROD-5012", productName: "Credit Card", rollNumber: "RL-220005" },
    ],
    notes: buildNotes("2026-01-22"),
  },
  {
    caseId: "DSAR-003",
    agreementNumber: "AGR-770001",
    brandName: "Asset Finance",
    dsarType: "Asset Finance",
    customerName: "David Clarke",
    status: "Completed",
    createdDate: "2026-02-01",
    email: "david.clarke@example.com",
    phone: "+44 7700 900789",
    address: "8 Queen Street, Edinburgh, EH2 1JE",
    products: [
      { productId: "PROD-5003", productName: "Loan", rollNumber: "RL-330001" },
      { productId: "PROD-5013", productName: "Savings", rollNumber: "RL-330005" },
      { productId: "PROD-5014", productName: "Mortgage", rollNumber: "RL-330006" },
    ],
    notes: buildNotes("2026-02-01"),
  },
  {
    caseId: "DSAR-004",
    agreementNumber: "AGR-880002",
    brandName: "Lloyds Mixed",
    dsarType: "Lloyds Mixed Product",
    customerName: "Emily Roberts",
    status: "Open",
    createdDate: "2026-02-05",
    email: "emily.roberts@example.com",
    phone: "+44 7700 900321",
    address: "23 High Street, Bristol, BS1 2AW",
    products: [
      { productId: "PROD-5005", productName: "Savings", rollNumber: "RL-110002" },
      { productId: "PROD-5015", productName: "Credit Card", rollNumber: "RL-110007" },
    ],
    notes: buildNotes("2026-02-05"),
  },
  {
    caseId: "DSAR-005",
    agreementNumber: "AGR-660001",
    brandName: "HBOS Mixed",
    dsarType: "HBOS Mixed Product",
    customerName: "Michael Brown",
    status: "In Progress",
    createdDate: "2026-02-06",
    email: "michael.brown@example.com",
    phone: "+44 7700 900654",
    address: "99 Victoria Lane, Leeds, LS1 5DL",
    products: [
      { productId: "PROD-5004", productName: "Mortgage", rollNumber: "RL-440001" },
      { productId: "PROD-5016", productName: "Loan", rollNumber: "RL-440005" },
      { productId: "PROD-5017", productName: "Savings", rollNumber: "RL-440006" },
    ],
    notes: buildNotes("2026-02-06"),
  },
  {
    caseId: "DSAR-006",
    agreementNumber: "AGR-990002",
    brandName: "Asset Finance",
    dsarType: "Asset Finance",
    customerName: "Laura Mitchell",
    status: "Open",
    createdDate: "2026-02-08",
    email: "laura.mitchell@example.com",
    phone: "+44 7700 900987",
    address: "7 Castle Road, Cardiff, CF10 1BU",
    products: [
      { productId: "PROD-5006", productName: "Loan", rollNumber: "RL-220002" },
      { productId: "PROD-5018", productName: "Mortgage", rollNumber: "RL-220006" },
    ],
    notes: buildNotes("2026-02-08"),
  },
];

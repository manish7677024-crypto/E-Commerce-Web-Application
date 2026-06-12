import { useState, useEffect, useReducer, createContext, useContext } from "react";

// ─── Theme & Design Tokens ───────────────────────────────────────────────────
const theme = {
  bg: "#020917",
  surface: "#071428",
  surfaceHigh: "#0D1F3C",
  border: "#1A3A5C",
  accent: "#00D4FF",
  accentLight: "#67E8FF",
  accentDim: "#00D4FF18",
  accentGrad: "linear-gradient(135deg, #00D4FF, #7B2FFF)",
  success: "#00F5A0",
  warning: "#FFB800",
  danger: "#FF4D6D",
  textPrimary: "#E8F4FF",
  textSecondary: "#7BA7CC",
  textMuted: "#3A6080",
};

// ─── Mock Data ───────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: 1,  name: "Wireless Headphones Pro",    category: "Electronics", price: 129.99, stock: 24, image: "🎧", description: "Premium noise-cancelling wireless headphones with 30hr battery life.", rating: 4.8, reviews: 342 },
  { id: 2,  name: "Mechanical Keyboard RGB",    category: "Electronics", price: 89.99,  stock: 18, image: "⌨️", description: "Tactile mechanical switches with per-key RGB lighting.", rating: 4.6, reviews: 215 },
  { id: 3,  name: "Ultra-Slim Laptop Stand",    category: "Accessories", price: 49.99,  stock: 52, image: "💻", description: "Aluminium stand, 6 adjustable heights, folds flat.", rating: 4.7, reviews: 189 },
  { id: 4,  name: "USB-C Hub 7-in-1",           category: "Accessories", price: 39.99,  stock: 35, image: "🔌", description: "4K HDMI, 3×USB-A, SD, microSD, 100W PD charging.", rating: 4.5, reviews: 421 },
  { id: 5,  name: "Ergonomic Mouse",            category: "Electronics", price: 59.99,  stock: 0,  image: "🖱️", description: "Vertical grip design, 6 programmable buttons, silent clicks.", rating: 4.4, reviews: 98 },
  { id: 6,  name: "Desk LED Strip Light",       category: "Accessories", price: 24.99,  stock: 67, image: "💡", description: "RGB smart strip, app-controlled, music sync mode.", rating: 4.3, reviews: 156 },
  { id: 7,  name: "Webcam 4K Auto-focus",       category: "Electronics", price: 99.99,  stock: 11, image: "📷", description: "4K 30fps, built-in stereo mic, HDR, privacy shutter.", rating: 4.9, reviews: 274 },
  { id: 8,  name: "Cable Management Kit",       category: "Accessories", price: 19.99,  stock: 83, image: "🗂️", description: "50-piece kit: velcro straps, clips, sleeves, labels.", rating: 4.2, reviews: 312 },
  { id: 9,  name: "Smart Watch Series X",       category: "Wearables",   price: 249.99, stock: 15, image: "⌚", description: "AMOLED display, GPS, heart-rate & SpO2 monitor, 7-day battery.", rating: 4.7, reviews: 518 },
  { id: 10, name: "True Wireless Earbuds",      category: "Electronics", price: 79.99,  stock: 30, image: "🎵", description: "ANC, 6hr playtime + 24hr charging case, IPX5 rated.", rating: 4.5, reviews: 389 },
  { id: 11, name: "Portable SSD 1TB",           category: "Storage",     price: 109.99, stock: 22, image: "💾", description: "USB 3.2 Gen 2, 1050 MB/s read, rugged aluminium shell.", rating: 4.8, reviews: 203 },
  { id: 12, name: "Gaming Headset 7.1",         category: "Gaming",      price: 69.99,  stock: 19, image: "🎮", description: "Virtual 7.1 surround, retractable mic, 50mm drivers.", rating: 4.6, reviews: 144 },
  { id: 13, name: "Wireless Charger 15W",       category: "Accessories", price: 29.99,  stock: 44, image: "🔋", description: "Qi2 compatible, 15W fast charge, LED indicator ring.", rating: 4.4, reviews: 276 },
  { id: 14, name: "4K Monitor 27-inch",         category: "Electronics", price: 399.99, stock: 8,  image: "🖥️", description: "IPS, 144Hz, 1ms, USB-C 90W power delivery.", rating: 4.9, reviews: 621 },
  { id: 15, name: "Bluetooth Speaker 360°",     category: "Electronics", price: 54.99,  stock: 27, image: "🔊", description: "IPX7 waterproof, 20W output, 15hr battery.", rating: 4.5, reviews: 185 },
  { id: 16, name: "Mechanical Gaming Mouse",    category: "Gaming",      price: 74.99,  stock: 14, image: "🕹️", description: "25K DPI optical sensor, 11 programmable buttons, 80hr battery.", rating: 4.7, reviews: 332 },
  { id: 17, name: "VR Headset Lite",            category: "Gaming",      price: 299.99, stock: 5,  image: "🥽", description: "Standalone 6DoF, 2K per-eye display, hand tracking, 128GB.", rating: 4.6, reviews: 158 },
  { id: 18, name: "Smart Desk Lamp RGB",        category: "Accessories", price: 44.99,  stock: 38, image: "🪔", description: "Tunable white + RGB, touch dimmer, USB-A charging port.", rating: 4.4, reviews: 211 },
  { id: 19, name: "NVMe SSD 2TB",              category: "Storage",     price: 159.99, stock: 12, image: "📀", description: "PCIe 4.0, 7000 MB/s read, PS5 compatible, heatsink included.", rating: 4.8, reviews: 429 },
  { id: 20, name: "Desk Organiser Pro",         category: "Accessories", price: 34.99,  stock: 60, image: "🗃️", description: "Bamboo + aluminium, 8 compartments, built-in wireless charging.", rating: 4.3, reviews: 97 },
  { id: 21, name: "Smart Ring Health Tracker",  category: "Wearables",   price: 179.99, stock: 20, image: "💍", description: "Sleep, HRV, SpO2 & temperature tracking. 7-day battery, titanium.", rating: 4.7, reviews: 261 },
  { id: 22, name: "Foldable Drone 4K",          category: "Gadgets",     price: 349.99, stock: 6,  image: "🚁", description: "3-axis gimbal, 4K/60fps, 34min flight, obstacle avoidance.", rating: 4.8, reviews: 134 },
  { id: 23, name: "Mini Projector 1080p",       category: "Electronics", price: 199.99, stock: 9,  image: "📽️", description: "Full HD, 800 ANSI lumens, built-in Android, auto keystone.", rating: 4.5, reviews: 178 },
  { id: 24, name: "Laptop Cooling Pad RGB",     category: "Accessories", price: 39.99,  stock: 41, image: "❄️", description: "5 fans, 6 height levels, RGB underglow, dual USB passthrough.", rating: 4.4, reviews: 302 },
  { id: 25, name: "Graphic Tablet Pro",         category: "Electronics", price: 229.99, stock: 13, image: "🖊️", description: "8192-level pressure, tilt recognition, 10×6\" active area, battery-free pen.", rating: 4.8, reviews: 417 },
  { id: 26, name: "Pocket WiFi Router 5G",      category: "Gadgets",     price: 119.99, stock: 17, image: "📡", description: "Cat20 5G, 10-device sharing, 4000mAh, LCD status display.", rating: 4.6, reviews: 89 },
  { id: 27, name: "Smart Power Strip 6-port",   category: "Accessories", price: 54.99,  stock: 33, image: "⚡", description: "4 AC + 2 USB-C PD, app-controlled, energy monitoring, surge 2000J.", rating: 4.5, reviews: 224 },
  { id: 28, name: "Retro Handheld Console",     category: "Gaming",      price: 89.99,  stock: 22, image: "👾", description: "3.5\" IPS, 10000 games pre-loaded, dual analog sticks, HDMI out.", rating: 4.4, reviews: 376 },
  { id: 29, name: "AI Voice Recorder",          category: "Gadgets",     price: 139.99, stock: 16, image: "🎙️", description: "96kHz, 3-mic array, real-time transcription, 24hr battery.", rating: 4.7, reviews: 143 },
  { id: 30, name: "USB Microphone Studio",      category: "Electronics", price: 84.99,  stock: 28, image: "🎤", description: "Cardioid condenser, 192kHz/24-bit, shock mount + pop filter included.", rating: 4.8, reviews: 509 },
];

const INITIAL_ORDERS = [
  { id: "ORD-1001", userId: "user", items: [{ productId: 1, name: "Wireless Headphones Pro", price: 129.99, qty: 1 }], total: 129.99, status: "Delivered", date: "2025-05-12", address: "123 Main St, Dādri" },
  { id: "ORD-1002", userId: "user", items: [{ productId: 4, name: "USB-C Hub 7-in-1", price: 39.99, qty: 2 }], total: 79.98, status: "Shipped", date: "2025-06-08", address: "123 Main St, Dādri" },
];

// ─── Auth Context ─────────────────────────────────────────────────────────────
const AuthCtx = createContext(null);
const CartCtx = createContext(null);
const AppCtx = createContext(null);

const USERS = [
  { id: "admin", username: "admin", password: "admin123", role: "admin", name: "Admin User" },
  { id: "user", username: "user", password: "user123", role: "user", name: "Alex Johnson" },
];

// ─── Cart Reducer ─────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.find(i => i.id === action.product.id);
      if (exists) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.product, qty: 1 }];
    }
    case "REMOVE": return state.filter(i => i.id !== action.id);
    case "UPDATE_QTY": return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i);
    case "CLEAR": return [];
    default: return state;
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* KEYFRAMES */
  @keyframes fadeInUp   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes scaleIn    { from { opacity:0; transform:scale(.92); } to { opacity:1; transform:scale(1); } }
  @keyframes slideUp    { from { transform:translateY(20px); opacity:0; } to { transform:translateY(0); opacity:1; } }
  @keyframes slideRight { from { opacity:0; transform:translateX(-18px); } to { opacity:1; transform:translateX(0); } }
  @keyframes glowPulse  { 0%,100%{ box-shadow:0 0 12px #00D4FF44; } 50%{ box-shadow:0 0 28px #00D4FF88, 0 0 60px #00D4FF22; } }
  @keyframes shimmer    { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
  @keyframes float      { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-6px); } }
  @keyframes spin       { to { transform:rotate(360deg); } }
  @keyframes borderGlow { 0%,100%{ border-color:#00D4FF55; } 50%{ border-color:#00D4FFcc; } }
  @keyframes ripple     { 0%{ transform:scale(0); opacity:.5; } 100%{ transform:scale(2.5); opacity:0; } }
  @keyframes countUp    { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

  body {
    background: transparent;
    color: ${theme.textPrimary};
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${theme.surface}; }
  ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${theme.accent}55; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── NAV ── */
  .nav {
    background: #071428cc;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid ${theme.border};
    padding: 0 24px;
    height: 62px;
    display: flex;
    align-items: center;
    gap: 16px;
    position: sticky;
    top: 0;
    z-index: 100;
    animation: fadeInDown .4s ease;
  }
  .nav::after {
    content:'';
    position:absolute;
    bottom:0;left:0;right:0;height:1px;
    background: linear-gradient(90deg, transparent, ${theme.accent}44, transparent);
  }
  .nav-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 19px;
    font-weight: 700;
    background: linear-gradient(135deg, ${theme.accent}, #7B2FFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity .2s;
  }
  .nav-logo:hover { opacity:.8; }
  .nav-tabs { display: flex; gap: 4px; flex: 1; padding: 0 16px; overflow-x: auto; }
  .nav-tab {
    padding: 6px 14px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: ${theme.textSecondary};
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all .2s;
    position: relative;
    overflow: hidden;
  }
  .nav-tab::before {
    content:'';
    position:absolute;
    inset:0;
    background: ${theme.accentDim};
    opacity:0;
    transition: opacity .2s;
    border-radius:8px;
  }
  .nav-tab:hover::before { opacity:1; }
  .nav-tab:hover { color: ${theme.textPrimary}; transform: translateY(-1px); }
  .nav-tab.active { background: ${theme.accentDim}; color: ${theme.accentLight}; border: 1px solid ${theme.accent}33; }
  .nav-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
  .badge {
    background: linear-gradient(135deg, ${theme.accent}, #7B2FFF);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 99px;
    padding: 2px 6px;
    min-width: 18px;
    text-align: center;
    animation: glowPulse 2s ease-in-out infinite;
  }
  .avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${theme.accent}22, #7B2FFF22);
    border: 1.5px solid ${theme.accent}66;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700;
    color: ${theme.accentLight};
    cursor: pointer;
    transition: all .2s;
    animation: borderGlow 3s ease-in-out infinite;
  }
  .avatar:hover { transform: scale(1.08); border-color: ${theme.accent}; }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px;
    border-radius: 9px;
    border: none;
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    transition: all .2s;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
  }
  .btn::after {
    content:'';
    position:absolute;
    inset:0;
    background: rgba(255,255,255,.08);
    opacity:0;
    transition: opacity .15s;
  }
  .btn:hover::after { opacity:1; }
  .btn:active { transform: scale(.97); }
  .btn-primary {
    background: linear-gradient(135deg, ${theme.accent}, #7B2FFF);
    color: #fff;
    box-shadow: 0 4px 20px ${theme.accent}44;
  }
  .btn-primary:hover { box-shadow: 0 6px 28px ${theme.accent}66; transform: translateY(-1px); }
  .btn-secondary {
    background: ${theme.surfaceHigh};
    color: ${theme.textPrimary};
    border: 1px solid ${theme.border};
  }
  .btn-secondary:hover { border-color: ${theme.accent}88; color: ${theme.accentLight}; background: ${theme.accentDim}; transform: translateY(-1px); }
  .btn-danger { background: #FF4D6D18; color: ${theme.danger}; border: 1px solid #FF4D6D33; }
  .btn-danger:hover { background: #FF4D6D28; transform: translateY(-1px); }
  .btn-success { background: #00F5A018; color: ${theme.success}; border: 1px solid #00F5A033; }
  .btn-success:hover { background: #00F5A028; transform: translateY(-1px); }
  .btn-sm { padding: 5px 10px; font-size: 12px; }
  .btn:disabled { opacity: .35; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

  /* ── INPUTS ── */
  .input {
    background: ${theme.surfaceHigh};
    border: 1px solid ${theme.border};
    border-radius: 9px;
    padding: 10px 13px;
    color: ${theme.textPrimary};
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    outline: none;
    width: 100%;
    transition: all .2s;
  }
  .input:focus {
    border-color: ${theme.accent}88;
    box-shadow: 0 0 0 3px ${theme.accent}18;
    background: ${theme.surface};
  }
  .input::placeholder { color: ${theme.textMuted}; }
  .label { font-size: 11px; font-weight: 700; color: ${theme.textSecondary}; margin-bottom: 5px; display: block; text-transform: uppercase; letter-spacing: .6px; }
  .field { display: flex; flex-direction: column; gap: 5px; }
  .select {
    background: ${theme.surfaceHigh};
    border: 1px solid ${theme.border};
    border-radius: 9px;
    padding: 10px 13px;
    color: ${theme.textPrimary};
    font-size: 13px;
    outline: none;
    width: 100%;
    transition: border .2s;
  }
  .select:focus { border-color: ${theme.accent}88; }

  /* ── CARDS ── */
  .card {
    background: #071428bb;
    border: 1px solid ${theme.border};
    border-radius: 14px;
    overflow: hidden;
    transition: border-color .2s;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .card-hover {
    transition: border-color .25s, transform .25s, box-shadow .25s;
    animation: fadeInUp .4s ease both;
  }
  .card-hover:hover {
    border-color: ${theme.accent}66;
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${theme.accent}18, 0 4px 16px #00000044;
  }

  /* ── PAGE LAYOUT ── */
  .page { flex: 1; padding: 28px 24px; max-width: 1200px; margin: 0 auto; width: 100%; }
  .page-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 6px;
    background: linear-gradient(135deg, ${theme.textPrimary} 60%, ${theme.accentLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp .35s ease;
  }
  .page-sub { color: ${theme.textSecondary}; font-size: 13px; margin-bottom: 26px; animation: fadeInUp .4s ease; }

  /* ── PRODUCT GRID ── */
  .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 18px; }
  .product-card { display: flex; flex-direction: column; }
  .product-card:nth-child(1) { animation-delay:.05s; }
  .product-card:nth-child(2) { animation-delay:.10s; }
  .product-card:nth-child(3) { animation-delay:.15s; }
  .product-card:nth-child(4) { animation-delay:.20s; }
  .product-card:nth-child(5) { animation-delay:.25s; }
  .product-card:nth-child(6) { animation-delay:.30s; }
  .product-card:nth-child(7) { animation-delay:.35s; }
  .product-card:nth-child(8) { animation-delay:.40s; }
  .product-image {
    font-size: 58px;
    text-align: center;
    padding: 30px 0;
    background: linear-gradient(160deg, ${theme.surfaceHigh}, ${theme.surface});
    transition: transform .3s;
  }
  .card-hover:hover .product-image { transform: scale(1.12) rotate(-3deg); }
  .product-body { padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
  .product-name { font-weight: 600; font-size: 14px; line-height: 1.35; }
  .product-cat {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .8px;
    background: linear-gradient(135deg, ${theme.accent}, #7B2FFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .product-desc { font-size: 12px; color: ${theme.textSecondary}; line-height: 1.5; flex: 1; }
  .product-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
  .product-price {
    font-size: 18px; font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
    background: linear-gradient(135deg, ${theme.textPrimary}, ${theme.accentLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .product-stock { font-size: 11px; color: ${theme.textMuted}; }
  .product-stock.out { color: ${theme.danger}; }
  .rating { display: flex; align-items: center; gap: 4px; font-size: 12px; color: ${theme.warning}; }

  /* ── FILTERS ── */
  .filters { display: flex; gap: 10px; margin-bottom: 22px; flex-wrap: wrap; align-items: center; animation: fadeInUp .4s ease; }
  .filter-chip {
    padding: 5px 14px;
    border-radius: 99px;
    border: 1px solid ${theme.border};
    background: transparent;
    color: ${theme.textSecondary};
    font-size: 12px; font-weight: 600;
    cursor: pointer;
    transition: all .2s;
  }
  .filter-chip:hover { border-color: ${theme.accent}55; color: ${theme.textPrimary}; transform: translateY(-1px); }
  .filter-chip.active {
    background: linear-gradient(135deg, ${theme.accent}22, #7B2FFF22);
    border-color: ${theme.accent}88;
    color: ${theme.accentLight};
    box-shadow: 0 0 12px ${theme.accent}22;
  }
  .search-wrap { position: relative; flex: 1; min-width: 200px; }
  .search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: ${theme.textMuted}; font-size: 14px; }
  .search-input { padding-left: 34px; }

  /* ── CART ── */
  .cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; align-items: start; }
  .cart-item {
    display: grid;
    grid-template-columns: 52px 1fr auto;
    gap: 14px;
    align-items: center;
    padding: 16px;
    animation: slideRight .3s ease both;
  }
  .cart-item + .cart-item { border-top: 1px solid ${theme.border}66; }
  .cart-emoji { font-size: 34px; text-align: center; animation: float 3s ease-in-out infinite; }
  .cart-item-name { font-weight: 600; font-size: 14px; }
  .cart-item-price { font-size: 13px; color: ${theme.textSecondary}; }
  .qty-ctrl { display: flex; align-items: center; gap: 8px; }
  .qty-btn {
    width: 28px; height: 28px;
    border-radius: 7px;
    border: 1px solid ${theme.border};
    background: ${theme.surfaceHigh};
    color: ${theme.textPrimary};
    font-size: 15px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all .2s;
  }
  .qty-btn:hover { border-color: ${theme.accent}; color: ${theme.accentLight}; background: ${theme.accentDim}; transform: scale(1.1); }
  .summary-card { padding: 22px; display: flex; flex-direction: column; gap: 13px; }
  .summary-row { display: flex; justify-content: space-between; font-size: 13px; }
  .summary-total {
    font-size: 19px; font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
    border-top: 1px solid ${theme.border};
    padding-top: 13px;
    background: linear-gradient(135deg, ${theme.textPrimary}, ${theme.accentLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── ORDERS ── */
  .order-card { margin-bottom: 14px; animation: fadeInUp .35s ease both; }
  .order-header { padding: 14px 18px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid ${theme.border}66; flex-wrap: wrap; }
  .order-id { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; color: ${theme.accentLight}; }
  .order-date { font-size: 12px; color: ${theme.textSecondary}; flex: 1; }
  .status-badge { padding: 3px 11px; border-radius: 99px; font-size: 11px; font-weight: 700; }
  .status-Delivered { background: #00F5A018; color: ${theme.success}; border: 1px solid #00F5A033; }
  .status-Shipped { background: #00D4FF18; color: ${theme.accentLight}; border: 1px solid #00D4FF33; }
  .status-Processing { background: #FFB80018; color: ${theme.warning}; border: 1px solid #FFB80033; animation: glowPulse 2s ease-in-out infinite; }
  .status-Cancelled { background: #FF4D6D18; color: ${theme.danger}; border: 1px solid #FF4D6D33; }
  .order-items { padding: 12px 18px; display: flex; flex-direction: column; gap: 8px; }
  .order-item-row { display: flex; justify-content: space-between; font-size: 13px; }

  /* ── ADMIN TABLE ── */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 11px 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; color: ${theme.textMuted}; border-bottom: 1px solid ${theme.border}; }
  td { padding: 13px 16px; border-bottom: 1px solid ${theme.border}22; vertical-align: middle; transition: background .15s; }
  tr { animation: fadeInUp .3s ease both; }
  tr:hover td { background: ${theme.accentDim}; }
  .product-emoji-sm { font-size: 24px; }

  /* ── MODAL ── */
  .modal-backdrop { position: fixed; inset: 0; background: #00000099; backdrop-filter: blur(6px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeInUp .15s ease; }
  .modal {
    background: #071428dd;
    border: 1px solid ${theme.border};
    border-radius: 18px;
    width: 100%; max-width: 490px;
    padding: 26px;
    display: flex; flex-direction: column; gap: 16px;
    animation: scaleIn .2s ease;
    box-shadow: 0 24px 80px #00000088, 0 0 0 1px ${theme.accent}11;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .modal-title { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 4px; }

  /* ── AUTH ── */
  .auth-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
  .auth-card { width: 100%; max-width: 390px; animation: scaleIn .4s ease; }
  .auth-body { padding: 30px; display: flex; flex-direction: column; gap: 18px; }
  .auth-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 30px; font-weight: 700;
    background: linear-gradient(135deg, ${theme.accent}, #7B2FFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 4px;
    animation: float 4s ease-in-out infinite;
  }
  .auth-hint { font-size: 11px; color: ${theme.textMuted}; background: ${theme.surfaceHigh}; border-radius: 8px; padding: 10px 13px; border: 1px solid ${theme.border}; }

  /* ── STATS ── */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; margin-bottom: 26px; }
  .stat-card {
    padding: 20px;
    display: flex; flex-direction: column; gap: 6px;
    animation: fadeInUp .4s ease both;
    position: relative;
    overflow: hidden;
  }
  .stat-card::before {
    content:'';
    position:absolute;
    top:0;left:0;right:0;height:2px;
    background: linear-gradient(90deg, ${theme.accent}, #7B2FFF);
    opacity:.6;
  }
  .stat-label { font-size: 10px; font-weight: 700; color: ${theme.textMuted}; text-transform: uppercase; letter-spacing: .7px; }
  .stat-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px; font-weight: 700;
    background: linear-gradient(135deg, ${theme.textPrimary}, ${theme.accentLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: countUp .5s ease;
  }
  .stat-sub { font-size: 12px; color: ${theme.textSecondary}; }

  /* ── CHECKOUT STEPS ── */
  .steps { display: flex; align-items: center; gap: 0; margin-bottom: 30px; animation: fadeInUp .35s ease; }
  .step { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: ${theme.textMuted}; transition: color .3s; }
  .step.active { color: ${theme.accentLight}; }
  .step.done { color: ${theme.success}; }
  .step-dot {
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    flex-shrink: 0;
    transition: all .3s;
  }
  .step.active .step-dot { box-shadow: 0 0 14px ${theme.accent}66; animation: glowPulse 2s ease-in-out infinite; }
  .step.done .step-dot { background: ${theme.success}22; }
  .step-line { flex: 1; height: 1px; background: linear-gradient(90deg, ${theme.border}, ${theme.border}); margin: 0 8px; }
  .checkout-layout { display: grid; grid-template-columns: 1fr 300px; gap: 22px; align-items: start; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
  .form-full { grid-column: 1/-1; }

  /* ── TOAST ── */
  .toast {
    position: fixed;
    bottom: 26px; right: 26px;
    background: linear-gradient(135deg, ${theme.surface}, ${theme.surfaceHigh});
    border: 1px solid ${theme.accent}44;
    border-radius: 12px;
    padding: 13px 18px;
    font-size: 13px; font-weight: 600;
    z-index: 300;
    box-shadow: 0 8px 40px ${theme.accent}22, 0 4px 16px #00000066;
    display: flex; align-items: center; gap: 10px;
    animation: slideUp .25s ease;
    color: ${theme.accentLight};
  }

  /* ── MISC ── */
  .empty-state { text-align: center; padding: 70px 20px; color: ${theme.textMuted}; animation: fadeInUp .4s ease; }
  .empty-icon { font-size: 52px; margin-bottom: 14px; animation: float 3s ease-in-out infinite; }
  .tab-bar { display: flex; gap: 4px; margin-bottom: 22px; border-bottom: 1px solid ${theme.border}; }
  .tab-btn { padding: 8px 16px; border: none; background: transparent; color: ${theme.textSecondary}; font-size: 13px; font-weight: 600; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all .2s; }
  .tab-btn:hover { color: ${theme.textPrimary}; }
  .tab-btn.active { color: ${theme.accentLight}; border-bottom-color: ${theme.accent}; }
  .divider { height: 1px; background: linear-gradient(90deg, transparent, ${theme.border}, transparent); margin: 10px 0; }
`;

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2800); return () => clearTimeout(t); }, []);
  return <div className="toast">✓ {msg}</div>;
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function handle() {
    const u = USERS.find(u => u.username === form.username && u.password === form.password);
    if (!u) { setErr("Invalid username or password."); return; }
    onLogin(u);
  }

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <div className="auth-body">
          <div className="auth-logo">⚡ ShopWave</div>
          <p style={{ textAlign: "center", color: theme.textSecondary, fontSize: 13 }}>Sign in to your account</p>
          <div className="field"><label className="label">Username</label><input className="input" value={form.username} onChange={set("username")} placeholder="admin or user" /></div>
          <div className="field"><label className="label">Password</label><input className="input" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handle()} /></div>
          {err && <p style={{ color: theme.danger, fontSize: 12 }}>{err}</p>}
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px" }} onClick={handle}>Sign In</button>
          <div className="auth-hint">
            <b>Demo accounts:</b><br />
            Admin: <code>admin</code> / <code>admin123</code><br />
            User: <code>user</code> / <code>user123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ user, page, setPage, cartCount, onLogout }) {
  const userTabs = [
    { id: "catalog", label: "Shop" },
    { id: "cart", label: `Cart${cartCount > 0 ? ` (${cartCount})` : ""}` },
    { id: "orders", label: "My Orders" },
    { id: "feedback", label: "Feedback" },
  ];
  const adminTabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "catalog", label: "Shop" },
    { id: "admin-products", label: "Products" },
    { id: "admin-orders", label: "Orders" },
    { id: "admin-feedback", label: "Feedback" },
  ];
  const tabs = user.role === "admin" ? adminTabs : userTabs;

  return (
    <nav className="nav">
      <span className="nav-logo" onClick={() => setPage(user.role === "admin" ? "dashboard" : "catalog")}>⚡ ShopWave</span>
      <div className="nav-tabs">
        {tabs.map(t => (
          <button key={t.id} className={`nav-tab${page === t.id ? " active" : ""}`} onClick={() => setPage(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className="nav-right">
        {user.role === "user" && cartCount > 0 && (
          <button className="btn btn-sm btn-secondary" onClick={() => setPage("cart")}>🛒 <span className="badge">{cartCount}</span></button>
        )}
        <div className="avatar" title={`${user.name} (${user.role})`}>{user.name[0]}</div>
        <button className="btn btn-sm btn-secondary" onClick={onLogout}>Sign Out</button>
      </div>
    </nav>
  );
}

// ─── Product Catalog ──────────────────────────────────────────────────────────
function CatalogPage({ products, onAdd }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p =>
    (cat === "All" || p.category === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1 className="page-title">Product Catalog</h1>
      <p className="page-sub">{products.length} products available</p>
      <div className="filters">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="input search-input" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {cats.map(c => (
          <button key={c} className={`filter-chip${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">🔍</div>No products match your search.</div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <div key={p.id} className="card card-hover product-card">
              <div className="product-image">{p.image}</div>
              <div className="product-body">
                <div className="product-cat">{p.category}</div>
                <div className="product-name">{p.name}</div>
                <div className="rating">{"★".repeat(Math.round(p.rating))} <span style={{ color: theme.textMuted }}>{p.rating} ({p.reviews})</span></div>
                <div className="product-desc">{p.description}</div>
                <div className="product-footer">
                  <span className="product-price">${p.price.toFixed(2)}</span>
                  <span className={`product-stock${p.stock === 0 ? " out" : ""}`}>{p.stock > 0 ? `${p.stock} left` : "Out of stock"}</span>
                </div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} disabled={p.stock === 0} onClick={() => onAdd(p)}>
                  {p.stock === 0 ? "Unavailable" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────
function CartPage({ cart, dispatch, setPage }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) return (
    <div className="page">
      <h1 className="page-title">Your Cart</h1>
      <div className="empty-state">
        <div className="empty-icon">🛒</div>
        <p>Your cart is empty.</p>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setPage("catalog")}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <h1 className="page-title">Your Cart</h1>
      <p className="page-sub">{cart.reduce((s, i) => s + i.qty, 0)} item(s)</p>
      <div className="cart-layout">
        <div className="card">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-emoji">{item.image}</div>
              <div>
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">${item.price.toFixed(2)} each</div>
                <div className="qty-ctrl" style={{ marginTop: 8 }}>
                  <button className="qty-btn" onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })}>−</button>
                  <span style={{ fontSize: 14, fontWeight: 600, minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })}>+</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <span style={{ fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</span>
                <button className="btn btn-danger btn-sm" onClick={() => dispatch({ type: "REMOVE", id: item.id })}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card summary-card">
          <div style={{ fontSize: 15, fontWeight: 700 }}>Order Summary</div>
          <div className="summary-row"><span style={{ color: theme.textSecondary }}>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span style={{ color: theme.textSecondary }}>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="summary-row"><span style={{ color: theme.textSecondary }}>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 11 }} onClick={() => setPage("checkout")}>Proceed to Checkout</button>
          <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setPage("catalog")}>Continue Shopping</button>
          <button className="btn btn-danger" style={{ width: "100%", justifyContent: "center" }} onClick={() => dispatch({ type: "CLEAR" })}>🗑️ Clear Cart</button>
        </div>
      </div>
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────────────
function CheckoutPage({ cart, dispatch, setPage, onOrderPlace }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvv: "" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + 9.99 + subtotal * 0.08;

  const steps = ["Shipping", "Payment", "Review"];

  function placeOrder() {
    onOrderPlace(cart, total, form.address + ", " + form.city);
    dispatch({ type: "CLEAR" });
    setPage("orders");
  }

  return (
    <div className="page">
      <h1 className="page-title">Checkout</h1>
      <div className="steps">
        {steps.map((s, i) => (
          <>
            <div key={s} className={`step${step === i ? " active" : step > i ? " done" : ""}`}>
              <div className="step-dot">{step > i ? "✓" : i + 1}</div>
              {s}
            </div>
            {i < steps.length - 1 && <div className="step-line" />}
          </>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
          {step === 0 && (
            <>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Shipping Details</div>
              <div className="form-grid">
                <div className="field form-full"><label className="label">Full Name</label><input className="input" value={form.name} onChange={set("name")} placeholder="Alex Johnson" /></div>
                <div className="field form-full"><label className="label">Email</label><input className="input" value={form.email} onChange={set("email")} placeholder="alex@example.com" /></div>
                <div className="field form-full"><label className="label">Address</label><input className="input" value={form.address} onChange={set("address")} placeholder="123 Main Street" /></div>
                <div className="field"><label className="label">City</label><input className="input" value={form.city} onChange={set("city")} placeholder="Dādri" /></div>
                <div className="field"><label className="label">ZIP Code</label><input className="input" value={form.zip} onChange={set("zip")} placeholder="203207" /></div>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: "flex-end" }} disabled={!form.name || !form.address} onClick={() => setStep(1)}>Continue to Payment →</button>
            </>
          )}
          {step === 1 && (
            <>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Payment Details</div>
              <div className="form-grid">
                <div className="field form-full"><label className="label">Card Number</label><input className="input" value={form.card} onChange={set("card")} placeholder="4242 4242 4242 4242" /></div>
                <div className="field"><label className="label">Expiry</label><input className="input" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" /></div>
                <div className="field"><label className="label">CVV</label><input className="input" value={form.cvv} onChange={set("cvv")} placeholder="123" /></div>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button className="btn btn-secondary" onClick={() => setStep(0)}>← Back</button>
                <button className="btn btn-primary" disabled={!form.card} onClick={() => setStep(2)}>Review Order →</button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Review Your Order</div>
              <div style={{ fontSize: 13, color: theme.textSecondary }}><b style={{ color: theme.textPrimary }}>Ship to:</b> {form.name}, {form.address}, {form.city} {form.zip}</div>
              <div style={{ fontSize: 13, color: theme.textSecondary }}><b style={{ color: theme.textPrimary }}>Card:</b> •••• •••• •••• {form.card.slice(-4) || "4242"}</div>
              <div className="divider" />
              {cart.map(i => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span>{i.image} {i.name} ×{i.qty}</span>
                  <span style={{ fontWeight: 600 }}>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-success" onClick={placeOrder}>✓ Place Order</button>
              </div>
            </>
          )}
        </div>
        <div className="card summary-card">
          <div style={{ fontSize: 14, fontWeight: 700 }}>Items ({cart.length})</div>
          {cart.map(i => (
            <div key={i.id} className="summary-row">
              <span style={{ color: theme.textSecondary }}>{i.image} {i.name} ×{i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── Orders Page ──────────────────────────────────────────────────────────────
function OrdersPage({ orders, userId }) {
  const myOrders = orders.filter(o => o.userId === userId).slice().reverse();
  if (myOrders.length === 0) return (
    <div className="page">
      <h1 className="page-title">My Orders</h1>
      <div className="empty-state"><div className="empty-icon">📦</div><p>No orders yet.</p></div>
    </div>
  );
  return (
    <div className="page">
      <h1 className="page-title">My Orders</h1>
      <p className="page-sub">{myOrders.length} order(s)</p>
      {myOrders.map(o => (
        <div key={o.id} className="card order-card">
          <div className="order-header">
            <span className="order-id">{o.id}</span>
            <span className="order-date">{o.date}</span>
            <span className={`status-badge status-${o.status}`}>{o.status}</span>
            <span style={{ fontWeight: 700 }}>${o.total.toFixed(2)}</span>
          </div>
          <div className="order-items">
            <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>📍 {o.address}</div>
            {o.items.map((i, idx) => (
              <div key={idx} className="order-item-row">
                <span style={{ color: theme.textSecondary }}>{i.name} ×{i.qty}</span>
                <span style={{ fontWeight: 600 }}>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard({ products, orders }) {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, sub: "All time", icon: "💰" },
    { label: "Total Orders", value: orders.length, sub: `${orders.filter(o => o.status === "Processing").length} processing`, icon: "📦" },
    { label: "Products", value: products.length, sub: `${products.filter(p => p.stock === 0).length} out of stock`, icon: "🏷️" },
    { label: "Customers", value: 1, sub: "Registered users", icon: "👤" },
  ];
  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">Store overview</p>
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="card stat-card">
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Recent Orders</h2>
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Order ID</th><th>Date</th><th>Total</th><th>Status</th><th>Address</th></tr></thead>
          <tbody>
            {orders.slice().reverse().slice(0, 5).map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 700, color: theme.accentLight }}>{o.id}</td>
                <td style={{ color: theme.textSecondary }}>{o.date}</td>
                <td style={{ fontWeight: 600 }}>${o.total.toFixed(2)}</td>
                <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                <td style={{ color: theme.textSecondary }}>{o.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Admin Products ───────────────────────────────────────────────────────────
function AdminProducts({ products, setProducts, showToast }) {
  const [modal, setModal] = useState(null); // null | "add" | product
  const [form, setForm] = useState({ name: "", category: "Electronics", price: "", stock: "", description: "", image: "📦" });
  const emojis = ["📦", "🎧", "⌨️", "💻", "🔌", "🖱️", "💡", "📷", "🗂️", "🖥️", "📱", "🎮"];
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function openAdd() { setForm({ name: "", category: "Electronics", price: "", stock: "", description: "", image: "📦" }); setModal("add"); }
  function openEdit(p) { setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, description: p.description, image: p.image }); setModal(p); }

  function save() {
    if (modal === "add") {
      setProducts(ps => [...ps, { id: Date.now(), ...form, price: +form.price, stock: +form.stock, rating: 4.0, reviews: 0 }]);
      showToast("Product added");
    } else {
      setProducts(ps => ps.map(p => p.id === modal.id ? { ...p, ...form, price: +form.price, stock: +form.stock } : p));
      showToast("Product updated");
    }
    setModal(null);
  }

  function del(id) { setProducts(ps => ps.filter(p => p.id !== id)); showToast("Product deleted"); }

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h1 className="page-title">Products</h1>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>
      <p className="page-sub">{products.length} products</p>
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><span className="product-emoji-sm">{p.image}</span> <span style={{ fontWeight: 600 }}>{p.name}</span></td>
                <td><span style={{ fontSize: 11, color: theme.accentLight, fontWeight: 600 }}>{p.category}</span></td>
                <td style={{ fontWeight: 600 }}>${p.price.toFixed(2)}</td>
                <td><span className={p.stock === 0 ? "product-stock out" : "product-stock"}>{p.stock}</span></td>
                <td style={{ color: theme.warning }}>★ {p.rating}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => del(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div className="modal-title">{modal === "add" ? "Add Product" : "Edit Product"}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {emojis.map(em => (
                <button key={em} onClick={() => setForm(f => ({ ...f, image: em }))}
                  style={{ fontSize: 22, background: form.image === em ? theme.accentDim : "transparent", border: `1px solid ${form.image === em ? theme.accent : theme.border}`, borderRadius: 8, padding: "4px 8px", cursor: "pointer" }}>{em}</button>
              ))}
            </div>
            <div className="field"><label className="label">Product Name</label><input className="input" value={form.name} onChange={set("name")} placeholder="Product name" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="field">
                <label className="label">Category</label>
                <select className="select" value={form.category} onChange={set("category")}>
                  {["Electronics", "Accessories", "Software", "Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field"><label className="label">Price ($)</label><input className="input" type="number" value={form.price} onChange={set("price")} placeholder="0.00" /></div>
              <div className="field"><label className="label">Stock</label><input className="input" type="number" value={form.stock} onChange={set("stock")} placeholder="0" /></div>
            </div>
            <div className="field"><label className="label">Description</label><input className="input" value={form.description} onChange={set("description")} placeholder="Brief description…" /></div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" disabled={!form.name || !form.price} onClick={save}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Admin Orders ─────────────────────────────────────────────────────────────
function AdminOrders({ orders, setOrders, showToast }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
  const shown = filter === "All" ? orders : orders.filter(o => o.status === filter);

  function updateStatus(id, status) {
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o));
    showToast("Order status updated");
  }

  return (
    <div className="page">
      <h1 className="page-title">All Orders</h1>
      <p className="page-sub">{orders.length} orders total</p>
      <div className="filters" style={{ marginBottom: 16 }}>
        {statuses.map(s => (
          <button key={s} className={`filter-chip${filter === s ? " active" : ""}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Items</th><th>Status</th><th>Update</th></tr></thead>
          <tbody>
            {shown.slice().reverse().map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 700, color: theme.accentLight }}>{o.id}</td>
                <td style={{ color: theme.textSecondary }}>{o.userId}</td>
                <td style={{ color: theme.textSecondary }}>{o.date}</td>
                <td style={{ fontWeight: 600 }}>${o.total.toFixed(2)}</td>
                <td style={{ color: theme.textSecondary }}>{o.items.length} item(s)</td>
                <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                <td>
                  <select className="select" style={{ padding: "4px 8px", fontSize: 12, width: "auto" }} value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                    {["Processing", "Shipped", "Delivered", "Cancelled"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Feedback Page (User) ────────────────────────────────────────────────────
function FeedbackPage({ feedbacks, userId, userName, onSubmit, showToast }) {
  const [rating, setRating] = useState(5);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [hover, setHover] = useState(0);

  const myFeedback = feedbacks.filter(f => f.userId === userId).slice().reverse();

  function submit() {
    if (!message.trim()) return;
    onSubmit({
      id: `FB-${Date.now()}`,
      userId, userName,
      rating, subject: subject.trim() || "General Feedback",
      message: message.trim(),
      date: new Date().toISOString().split("T")[0],
    });
    setSubject(""); setMessage(""); setRating(5);
    showToast("Thanks for your feedback!");
  }

  return (
    <div className="page">
      <h1 className="page-title">Feedback</h1>
      <p className="page-sub">Tell us what you think — your input helps us improve</p>

      <div className="cart-layout">
        <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Share Your Experience</div>
          <div className="field">
            <label className="label">Rating</label>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <span
                  key={n}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(n)}
                  style={{ fontSize: 28, cursor: "pointer", color: (hover || rating) >= n ? theme.warning : theme.border, transition: "color .15s, transform .15s", transform: (hover || rating) >= n ? "scale(1.1)" : "scale(1)" }}
                >★</span>
              ))}
              <span style={{ alignSelf: "center", marginLeft: 8, fontSize: 13, color: theme.textSecondary }}>{rating} / 5</span>
            </div>
          </div>
          <div className="field"><label className="label">Subject</label><input className="input" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Checkout experience, Delivery speed..." /></div>
          <div className="field">
            <label className="label">Your Feedback</label>
            <textarea className="input" rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us what went well or what we can improve…" style={{ resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }} />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: "flex-end" }} disabled={!message.trim()} onClick={submit}>Submit Feedback</button>
        </div>

        <div className="card summary-card">
          <div style={{ fontSize: 14, fontWeight: 700 }}>Your Submitted Feedback</div>
          {myFeedback.length === 0 ? (
            <p style={{ fontSize: 12, color: theme.textMuted }}>You haven't submitted any feedback yet.</p>
          ) : myFeedback.map(f => (
            <div key={f.id} style={{ borderTop: `1px solid ${theme.border}66`, paddingTop: 10, marginTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{f.subject}</span>
                <span style={{ color: theme.warning, fontSize: 12 }}>{"★".repeat(f.rating)}</span>
              </div>
              <p style={{ fontSize: 12, color: theme.textSecondary, marginTop: 4, lineHeight: 1.5 }}>{f.message}</p>
              <span style={{ fontSize: 11, color: theme.textMuted }}>{f.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admin Feedback ───────────────────────────────────────────────────────────
function AdminFeedback({ feedbacks }) {
  const sorted = feedbacks.slice().reverse();
  const avg = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length) : 0;

  return (
    <div className="page">
      <h1 className="page-title">Customer Feedback</h1>
      <p className="page-sub">{feedbacks.length} response(s) · Average rating {avg.toFixed(1)} ★</p>

      <div className="stats-grid">
        <div className="card stat-card">
          <div style={{ fontSize: 24 }}>⭐</div>
          <div className="stat-label">Average Rating</div>
          <div className="stat-value">{avg.toFixed(1)}</div>
          <div className="stat-sub">out of 5.0</div>
        </div>
        <div className="card stat-card">
          <div style={{ fontSize: 24 }}>💬</div>
          <div className="stat-label">Total Responses</div>
          <div className="stat-value">{feedbacks.length}</div>
          <div className="stat-sub">from customers</div>
        </div>
        <div className="card stat-card">
          <div style={{ fontSize: 24 }}>🌟</div>
          <div className="stat-label">5-Star Reviews</div>
          <div className="stat-value">{feedbacks.filter(f => f.rating === 5).length}</div>
          <div className="stat-sub">{feedbacks.length ? Math.round(100 * feedbacks.filter(f => f.rating === 5).length / feedbacks.length) : 0}% of total</div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">💬</div><p>No feedback submitted yet.</p></div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Subject</th><th>Rating</th><th>Message</th><th>Date</th></tr></thead>
            <tbody>
              {sorted.map(f => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 600 }}>{f.userName}</td>
                  <td>{f.subject}</td>
                  <td style={{ color: theme.warning, whiteSpace: "nowrap" }}>{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</td>
                  <td style={{ color: theme.textSecondary, maxWidth: 360 }}>{f.message}</td>
                  <td style={{ color: theme.textSecondary, whiteSpace: "nowrap" }}>{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


const SKY_CSS = `
  .sky-canvas {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
    background: radial-gradient(ellipse at 50% 0%, #0a1a3a 0%, #050f24 35%, #02050f 70%, #00030a 100%);
  }

  /* ── AURORA CURTAINS ── */
  @keyframes aurora1 {
    0%   { transform: translateX(-40%) scaleY(1)   rotate(-5deg); opacity:.22; }
    25%  { transform: translateX(-10%) scaleY(1.6) rotate( 2deg); opacity:.45; }
    50%  { transform: translateX( 20%) scaleY(1.2) rotate(-1deg); opacity:.30; }
    75%  { transform: translateX( 5%)  scaleY(1.8) rotate( 4deg); opacity:.50; }
    100% { transform: translateX(-40%) scaleY(1)   rotate(-5deg); opacity:.22; }
  }
  @keyframes aurora2 {
    0%   { transform: translateX( 15%) scaleY(1.1) rotate( 3deg); opacity:.18; }
    33%  { transform: translateX(-30%) scaleY(.7)  rotate(-4deg); opacity:.38; }
    66%  { transform: translateX( 35%) scaleY(1.5) rotate( 2deg); opacity:.28; }
    100% { transform: translateX( 15%) scaleY(1.1) rotate( 3deg); opacity:.18; }
  }
  @keyframes aurora3 {
    0%   { transform: translateX(-5%)  scaleY(.8)  rotate(-2deg); opacity:.12; }
    40%  { transform: translateX( 40%) scaleY(1.4) rotate( 5deg); opacity:.32; }
    80%  { transform: translateX(-20%) scaleY(1.1) rotate(-1deg); opacity:.20; }
    100% { transform: translateX(-5%)  scaleY(.8)  rotate(-2deg); opacity:.12; }
  }
  @keyframes aurora4 {
    0%   { transform: translateX( 30%) scaleY(1.3) rotate( 6deg); opacity:.16; }
    50%  { transform: translateX(-35%) scaleY(.9)  rotate(-3deg); opacity:.36; }
    100% { transform: translateX( 30%) scaleY(1.3) rotate( 6deg); opacity:.16; }
  }

  .aurora { position:absolute; width:240%; height:380px; left:-70%; border-radius:50%; filter:blur(55px); will-change:transform,opacity; }
  .aur1 { background:radial-gradient(ellipse at 50% 50%, #00AAFF88 0%, #0066CC44 35%, #003388 55%, transparent 72%); top:-40px; animation:aurora1 16s ease-in-out infinite; }
  .aur2 { background:radial-gradient(ellipse at 50% 50%, #33CCFF66 0%, #1144BB33 40%, transparent 68%);              top: 20px; animation:aurora2 22s ease-in-out infinite; }
  .aur3 { background:radial-gradient(ellipse at 50% 50%, #6644FF44 0%, #2200AA22 40%, transparent 65%);              top:-20px; animation:aurora3 28s ease-in-out infinite; }
  .aur4 { background:radial-gradient(ellipse at 50% 50%, #00CCAA33 0%, #00669950 50%, transparent 70%);              top: 60px; animation:aurora4 20s ease-in-out infinite; }

  /* ── STORM CLOUDS ── */
  @keyframes cloudDrift1 { 0%,100%{transform:translateX(0) scale(1);} 50%{transform:translateX(50px) scale(1.05);} }
  @keyframes cloudDrift2 { 0%,100%{transform:translateX(0) scale(1);} 50%{transform:translateX(-60px) scale(.97);} }
  @keyframes cloudDrift3 { 0%,100%{transform:translateX(0) scale(1);} 50%{transform:translateX(35px) scale(1.02);} }
  @keyframes cloudFlash {
    0%,100%{ opacity:0; }
    /* flash 1 */
    2%{ opacity:.55; } 4%{ opacity:0; } 6%{ opacity:.35; } 8%{ opacity:0; }
    /* pause */
    /* flash 2 */
    45%{ opacity:.70; } 46.5%{ opacity:0; } 48%{ opacity:.45; } 49%{ opacity:0; }
    /* flash 3 */
    78%{ opacity:.60; } 79%{ opacity:0; } 80%{ opacity:.30; } 81%{ opacity:0; }
  }
  @keyframes cloudFlash2 {
    0%,100%{ opacity:0; }
    10%{ opacity:.65; } 11.5%{ opacity:0; } 13%{ opacity:.40; } 14%{ opacity:0; }
    55%{ opacity:.50; } 56%{ opacity:0; } 57.5%{ opacity:.30; } 58.5%{ opacity:0; }
    88%{ opacity:.75; } 89%{ opacity:0; } 90%{ opacity:.45; } 91%{ opacity:0; }
  }
  @keyframes cloudFlash3 {
    0%,100%{ opacity:0; }
    20%{ opacity:.80; } 21%{ opacity:0; } 22.5%{ opacity:.50; } 23%{ opacity:0; }
    65%{ opacity:.60; } 66%{ opacity:0; } 67%{ opacity:.35; } 68%{ opacity:0; }
    93%{ opacity:.70; } 94%{ opacity:0; }
  }

  .cloud { position:absolute; border-radius:50%; filter:blur(40px); }
  .cloud-body { position:absolute; overflow:hidden; }

  /* Cloud 1 — left storm cloud */
  .cloud1-wrap { position:absolute; top:8%; left:-2%; width:340px; height:160px; animation:cloudDrift1 18s ease-in-out infinite; }
  .cloud1 { inset:0; border-radius:80px; background:radial-gradient(ellipse at 50% 40%, #1a1a2e 0%, #0d0d1a 60%, transparent 100%); filter:blur(8px); }
  .cloud1-hi { position:absolute; inset:-10px; border-radius:90px; background:radial-gradient(ellipse at 50% 30%, #22103399 0%, transparent 60%); filter:blur(12px); }

  /* Cloud 2 — center storm cloud */
  .cloud2-wrap { position:absolute; top:5%; left:28%; width:420px; height:200px; animation:cloudDrift2 24s ease-in-out infinite; }
  .cloud2 { inset:0; border-radius:100px; background:radial-gradient(ellipse at 50% 45%, #1e1030 0%, #12091e 55%, transparent 100%); filter:blur(10px); }
  .cloud2-hi { position:absolute; inset:-14px; border-radius:110px; background:radial-gradient(ellipse at 50% 30%, #2a1a4499 0%, transparent 60%); filter:blur(14px); }

  /* Cloud 3 — right storm cloud */
  .cloud3-wrap { position:absolute; top:10%; right:-4%; width:380px; height:180px; animation:cloudDrift3 20s ease-in-out infinite; }
  .cloud3 { inset:0; border-radius:90px; background:radial-gradient(ellipse at 50% 40%, #1a0d28 0%, #0f0818 60%, transparent 100%); filter:blur(9px); }
  .cloud3-hi { position:absolute; inset:-12px; border-radius:100px; background:radial-gradient(ellipse at 50% 30%, #251344 0%, transparent 55%); filter:blur(13px); }

  /* ── SKY-BLUE LIGHTNING INSIDE CLOUDS ── */

  /* Cloud interior glow flashes (diffuse blue light inside cloud) */
  .cloud1-flash { position:absolute; inset:-20px; border-radius:100px; background:radial-gradient(ellipse at 50% 60%, #00BFFFCC 0%, #0099DD55 40%, transparent 70%); filter:blur(18px); animation:cloudFlash  8s ease-in-out infinite; }
  .cloud2-flash { position:absolute; inset:-24px; border-radius:120px; background:radial-gradient(ellipse at 50% 60%, #00D4FFCC 0%, #0088CC55 40%, transparent 70%); filter:blur(22px); animation:cloudFlash2 11s ease-in-out infinite; }
  .cloud3-flash { position:absolute; inset:-20px; border-radius:110px; background:radial-gradient(ellipse at 50% 60%, #33CCFFCC 0%, #0077BB55 40%, transparent 70%); filter:blur(18px); animation:cloudFlash3  9s ease-in-out infinite; }

  /* Lightning bolt SVG-style bolts using CSS clip-path */
  @keyframes bolt1 {
    0%,100%{ opacity:0; transform:scaleY(0); transform-origin:top center; }
    2%     { opacity:1; transform:scaleY(1); }
    5%     { opacity:0; transform:scaleY(1.1); }
    6%     { opacity:.6; transform:scaleY(1); }
    9%     { opacity:0; }
    45%    { opacity:0; transform:scaleY(0); }
    46%    { opacity:1; transform:scaleY(1); }
    49%    { opacity:0; }
    79%    { opacity:0; transform:scaleY(0); }
    80%    { opacity:.8; transform:scaleY(1); }
    83%    { opacity:0; }
  }
  @keyframes bolt2 {
    0%,100%{ opacity:0; transform:scaleY(0); transform-origin:top center; }
    11%    { opacity:0; transform:scaleY(0); }
    12%    { opacity:1; transform:scaleY(1); }
    15%    { opacity:0; transform:scaleY(1.05); }
    16%    { opacity:.5; transform:scaleY(1); }
    19%    { opacity:0; }
    56%    { opacity:0; transform:scaleY(0); }
    57%    { opacity:.9; transform:scaleY(1); }
    60%    { opacity:0; }
    89%    { opacity:0; transform:scaleY(0); }
    90%    { opacity:.7; transform:scaleY(1); }
    93%    { opacity:0; }
  }
  @keyframes bolt3 {
    0%,100%{ opacity:0; transform:scaleY(0); transform-origin:top center; }
    21%    { opacity:0; transform:scaleY(0); }
    22%    { opacity:1; transform:scaleY(1); }
    25%    { opacity:0; transform:scaleY(1.08); }
    26%    { opacity:.6; transform:scaleY(1); }
    29%    { opacity:0; }
    66%    { opacity:0; transform:scaleY(0); }
    67%    { opacity:.85; transform:scaleY(1); }
    70%    { opacity:0; }
    94%    { opacity:0; transform:scaleY(0); }
    95%    { opacity:.75; transform:scaleY(1); }
    98%    { opacity:0; }
  }

  /* ── BRANCH FORKS — mirror the opacity timing of their parent bolt, plus rotation/scale ── */
  @keyframes branchL1 {
    0%,100%{ opacity:0; transform:rotate(-32deg) scaleX(0); }
    2%     { opacity:1; transform:rotate(-32deg) scaleX(1); }
    5%     { opacity:0; transform:rotate(-32deg) scaleX(1.15); }
    6%     { opacity:.55; transform:rotate(-32deg) scaleX(1); }
    9%     { opacity:0; }
    45%    { opacity:0; transform:rotate(-32deg) scaleX(0); }
    46%    { opacity:.9; transform:rotate(-32deg) scaleX(1); }
    49%    { opacity:0; }
    79%    { opacity:0; transform:rotate(-32deg) scaleX(0); }
    80%    { opacity:.7; transform:rotate(-32deg) scaleX(1); }
    83%    { opacity:0; }
  }
  @keyframes branchR1 {
    0%,100%{ opacity:0; transform:rotate(28deg) scaleX(0); }
    2%     { opacity:.85; transform:rotate(28deg) scaleX(1); }
    5%     { opacity:0; transform:rotate(28deg) scaleX(1.1); }
    6%     { opacity:.4; transform:rotate(28deg) scaleX(1); }
    9%     { opacity:0; }
    45%    { opacity:0; transform:rotate(28deg) scaleX(0); }
    46%    { opacity:.75; transform:rotate(28deg) scaleX(1); }
    49%    { opacity:0; }
    79%    { opacity:0; transform:rotate(28deg) scaleX(0); }
    80%    { opacity:.6; transform:rotate(28deg) scaleX(1); }
    83%    { opacity:0; }
  }
  @keyframes branchL2 {
    0%,100%{ opacity:0; transform:rotate(-30deg) scaleX(0); }
    12%    { opacity:1; transform:rotate(-30deg) scaleX(1); }
    15%    { opacity:0; transform:rotate(-30deg) scaleX(1.1); }
    16%    { opacity:.5; transform:rotate(-30deg) scaleX(1); }
    19%    { opacity:0; }
    56%    { opacity:0; transform:rotate(-30deg) scaleX(0); }
    57%    { opacity:.85; transform:rotate(-30deg) scaleX(1); }
    60%    { opacity:0; }
    89%    { opacity:0; transform:rotate(-30deg) scaleX(0); }
    90%    { opacity:.7; transform:rotate(-30deg) scaleX(1); }
    93%    { opacity:0; }
  }
  @keyframes branchR2 {
    0%,100%{ opacity:0; transform:rotate(34deg) scaleX(0); }
    12%    { opacity:.8; transform:rotate(34deg) scaleX(1); }
    15%    { opacity:0; transform:rotate(34deg) scaleX(1.12); }
    16%    { opacity:.45; transform:rotate(34deg) scaleX(1); }
    19%    { opacity:0; }
    56%    { opacity:0; transform:rotate(34deg) scaleX(0); }
    57%    { opacity:.65; transform:rotate(34deg) scaleX(1); }
    60%    { opacity:0; }
    89%    { opacity:0; transform:rotate(34deg) scaleX(0); }
    90%    { opacity:.55; transform:rotate(34deg) scaleX(1); }
    93%    { opacity:0; }
  }
  @keyframes branchL3 {
    0%,100%{ opacity:0; transform:rotate(-26deg) scaleX(0); }
    22%    { opacity:.9; transform:rotate(-26deg) scaleX(1); }
    25%    { opacity:0; transform:rotate(-26deg) scaleX(1.1); }
    26%    { opacity:.5; transform:rotate(-26deg) scaleX(1); }
    29%    { opacity:0; }
    66%    { opacity:0; transform:rotate(-26deg) scaleX(0); }
    67%    { opacity:.75; transform:rotate(-26deg) scaleX(1); }
    70%    { opacity:0; }
    94%    { opacity:0; transform:rotate(-26deg) scaleX(0); }
    95%    { opacity:.65; transform:rotate(-26deg) scaleX(1); }
    98%    { opacity:0; }
  }
  @keyframes branchR3 {
    0%,100%{ opacity:0; transform:rotate(36deg) scaleX(0); }
    22%    { opacity:.7; transform:rotate(36deg) scaleX(1); }
    25%    { opacity:0; transform:rotate(36deg) scaleX(1.12); }
    26%    { opacity:.4; transform:rotate(36deg) scaleX(1); }
    29%    { opacity:0; }
    66%    { opacity:0; transform:rotate(36deg) scaleX(0); }
    67%    { opacity:.55; transform:rotate(36deg) scaleX(1); }
    70%    { opacity:0; }
    94%    { opacity:0; transform:rotate(36deg) scaleX(0); }
    95%    { opacity:.5; transform:rotate(36deg) scaleX(1); }
    98%    { opacity:0; }
  }

  /* Generic branch fork shape — a tapered sliver of light extending from the bolt */
  .bolt-branch {
    position:absolute; height:3px; border-radius:2px;
    background:linear-gradient(90deg, #00EEFF, #00BBFF66, transparent);
    filter: blur(.5px) drop-shadow(0 0 6px #00DDFF) drop-shadow(0 0 14px #00AAFF);
    transform-origin: left center;
  }

  /* Main bolt structure using div with border tricks */
  .bolt-container { position:absolute; pointer-events:none; }

  /* Cloud 1 bolt */
  .bolt1-wrap { top:8%; left:8%; width:80px; height:180px; animation:bolt1 8s linear infinite; }
  .bolt1-wrap .bolt-main {
    position:absolute; top:0; left:50%;
    width:0; height:0;
    border-left: 14px solid transparent;
    border-right: 4px solid transparent;
    border-top: 80px solid #00CCFF;
    filter: drop-shadow(0 0 6px #00DDFF) drop-shadow(0 0 14px #00AAFF) drop-shadow(0 0 28px #0088CC88);
    transform:translateX(-50%);
  }
  .bolt1-wrap .bolt-lower {
    position:absolute; top:72px; left:55%;
    width:0; height:0;
    border-left: 6px solid transparent;
    border-right: 16px solid transparent;
    border-top: 90px solid #00EEFF;
    filter: drop-shadow(0 0 8px #00FFFF) drop-shadow(0 0 18px #00BBFF) drop-shadow(0 0 36px #0099CC88);
    transform:translateX(-50%);
  }
  .bolt1-wrap .bolt-glow {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:4px; height:100%; background:linear-gradient(180deg,#00CCFF,#00EEFF,#00BBFF,transparent);
    filter:blur(4px); border-radius:2px;
  }

  /* Cloud 2 bolt A */
  .bolt2a-wrap { top:5%; left:34%; width:80px; height:200px; animation:bolt2 11s linear infinite; }
  .bolt2a-wrap .bolt-main {
    position:absolute; top:0; left:50%;
    width:0; height:0;
    border-left: 16px solid transparent;
    border-right: 3px solid transparent;
    border-top: 95px solid #33DDFF;
    filter: drop-shadow(0 0 8px #00EEFF) drop-shadow(0 0 20px #00CCFF) drop-shadow(0 0 40px #00AAFFAA);
    transform:translateX(-50%);
  }
  .bolt2a-wrap .bolt-lower {
    position:absolute; top:87px; left:60%;
    width:0; height:0;
    border-left: 5px solid transparent;
    border-right: 18px solid transparent;
    border-top: 100px solid #00FFFF;
    filter: drop-shadow(0 0 10px #00FFFF) drop-shadow(0 0 24px #00DDFF) drop-shadow(0 0 50px #00BBFFAA);
    transform:translateX(-50%);
  }
  .bolt2a-wrap .bolt-glow {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:5px; height:100%; background:linear-gradient(180deg,#33DDFF,#00FFFF,#00CCFF,transparent);
    filter:blur(5px); border-radius:2px;
  }

  /* Cloud 2 bolt B (second bolt, offset) */
  .bolt2b-wrap { top:5%; left:45%; width:60px; height:160px; animation:bolt3 11s linear infinite; animation-delay:1.5s; }
  .bolt2b-wrap .bolt-main {
    position:absolute; top:0; left:50%;
    width:0; height:0;
    border-left: 12px solid transparent;
    border-right: 3px solid transparent;
    border-top: 75px solid #00CCEE;
    filter: drop-shadow(0 0 6px #00DDFF) drop-shadow(0 0 16px #00AABB);
    transform:translateX(-50%);
  }
  .bolt2b-wrap .bolt-lower {
    position:absolute; top:68px; left:40%;
    width:0; height:0;
    border-left: 4px solid transparent;
    border-right: 13px solid transparent;
    border-top: 80px solid #00EEFF;
    filter: drop-shadow(0 0 7px #00FFFF) drop-shadow(0 0 18px #00CCFF);
    transform:translateX(-50%);
  }
  .bolt2b-wrap .bolt-glow {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:3px; height:100%; background:linear-gradient(180deg,#00CCEE,#00EEFF,transparent);
    filter:blur(3px); border-radius:2px;
  }

  /* Cloud 3 bolt */
  .bolt3-wrap { top:10%; right:10%; width:70px; height:170px; animation:bolt3 9s linear infinite; }
  .bolt3-wrap .bolt-main {
    position:absolute; top:0; left:50%;
    width:0; height:0;
    border-left: 13px solid transparent;
    border-right: 4px solid transparent;
    border-top: 80px solid #00BBFF;
    filter: drop-shadow(0 0 7px #00CCFF) drop-shadow(0 0 18px #0099EE) drop-shadow(0 0 35px #0088DD88);
    transform:translateX(-50%);
  }
  .bolt3-wrap .bolt-lower {
    position:absolute; top:74px; left:57%;
    width:0; height:0;
    border-left: 5px solid transparent;
    border-right: 15px solid transparent;
    border-top: 85px solid #00DDFF;
    filter: drop-shadow(0 0 9px #00EEFF) drop-shadow(0 0 22px #00BBFF) drop-shadow(0 0 44px #00AAFFAA);
    transform:translateX(-50%);
  }
  .bolt3-wrap .bolt-glow {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:4px; height:100%; background:linear-gradient(180deg,#00BBFF,#00DDFF,#0099EE,transparent);
    filter:blur(4px); border-radius:2px;
  }

  /* Screen flash when lightning strikes (faint blue tint over whole page) */
  @keyframes screenFlash {
    0%,100%{ opacity:0; }
    2%  { opacity:.04; } 3%  { opacity:0; }
    46% { opacity:.03; } 47% { opacity:0; }
    80% { opacity:.05; } 81% { opacity:0; }
  }
  @keyframes screenFlash2 {
    0%,100%{ opacity:0; }
    12% { opacity:.04; } 13% { opacity:0; }
    57% { opacity:.03; } 58% { opacity:0; }
    90% { opacity:.05; } 91% { opacity:0; }
  }
  .screen-flash1 { position:fixed; inset:0; background:#00AAFF; pointer-events:none; z-index:2; animation:screenFlash  8s linear infinite; }
  .screen-flash2 { position:fixed; inset:0; background:#0088CC; pointer-events:none; z-index:2; animation:screenFlash2 11s linear infinite; }

  /* ── NEBULA CLOUDS ── */
  @keyframes nebulaFloat  { 0%,100%{transform:translate(0,0) scale(1);opacity:.08;} 50%{transform:translate(60px,-30px) scale(1.15);opacity:.20;} }
  @keyframes nebulaFloat2 { 0%,100%{transform:translate(0,0) scale(1);opacity:.06;} 50%{transform:translate(-50px,40px) scale(.9);opacity:.16;} }
  .nebula { position:absolute; border-radius:50%; filter:blur(90px); animation:ease-in-out infinite; }
  .neb1 { width:700px;height:350px;top:-80px; left:-150px; background:radial-gradient(ellipse,#0055FF55,transparent 70%); animation-name:nebulaFloat; animation-duration:26s; }
  .neb2 { width:600px;height:300px;top: 30px; right:-120px;background:radial-gradient(ellipse,#5522CC44,transparent 70%); animation-name:nebulaFloat2;animation-duration:32s; }
  .neb3 { width:500px;height:250px;top:100px; left:25%;    background:radial-gradient(ellipse,#0099CC33,transparent 70%); animation-name:nebulaFloat; animation-duration:40s;animation-delay:-15s; }
  .neb4 { width:400px;height:200px;top:-30px; left:55%;    background:radial-gradient(ellipse,#1133AA,transparent 70%);   animation-name:nebulaFloat2;animation-duration:34s;animation-delay:-8s; }

  /* ── SHOOTING STARS ── */
  @keyframes shoot { 0%{transform:translateX(0) translateY(0);opacity:0;} 5%{opacity:1;} 100%{transform:translateX(-1100px) translateY(500px);opacity:0;} }
  .sstar { position:absolute; height:2px; border-radius:9px;
    background:linear-gradient(90deg,rgba(255,255,255,0),#66CCFF,#ffffff,transparent);
    animation:shoot linear infinite; opacity:0; transform:rotate(215deg);
    box-shadow:0 0 6px 1px #33AAFF88; }
  .ss1{width:200px;top: 6%;left:92%;animation-duration:3.2s;animation-delay:0.0s;}
  .ss2{width:140px;top:14%;left:78%;animation-duration:4.8s;animation-delay:1.4s;}
  .ss3{width:240px;top: 4%;left:99%;animation-duration:2.8s;animation-delay:3.0s;}
  .ss4{width:110px;top:18%;left:65%;animation-duration:5.5s;animation-delay:0.8s;}
  .ss5{width:190px;top: 2%;left:85%;animation-duration:4.0s;animation-delay:2.2s;}
  .ss6{width:160px;top:11%;left:88%;animation-duration:5.0s;animation-delay:4.5s;}
  .ss7{width:260px;top: 8%;left:72%;animation-duration:3.5s;animation-delay:1.0s;}
  .ss8{width:130px;top:22%;left:95%;animation-duration:6.2s;animation-delay:5.8s;}
  .ss9{width:175px;top: 3%;left:82%;animation-duration:3.8s;animation-delay:2.7s;}
  .ss10{width:210px;top:16%;left:60%;animation-duration:4.3s;animation-delay:0.3s;}
  .ss11{width:150px;top: 9%;left:97%;animation-duration:5.8s;animation-delay:3.7s;}
  .ss12{width:280px;top: 1%;left:89%;animation-duration:3.0s;animation-delay:6.5s;}

  /* ── FLOATING EMBERS ── */
  @keyframes ember1 { 0%{transform:translateY(105vh) translateX(0) scale(0);opacity:0;} 8%{opacity:.9;} 92%{opacity:.5;} 100%{transform:translateY(-60px) translateX( 80px) scale(1.3);opacity:0;} }
  @keyframes ember2 { 0%{transform:translateY(105vh) translateX(0) scale(0);opacity:0;} 8%{opacity:.7;} 92%{opacity:.3;} 100%{transform:translateY(-60px) translateX(-100px) scale(.8);opacity:0;} }
  @keyframes ember3 { 0%{transform:translateY(105vh) translateX(0) scale(0);opacity:0;} 8%{opacity:.8;} 92%{opacity:.4;} 100%{transform:translateY(-60px) translateX( 50px) scale(1.1);opacity:0;} }
  @keyframes ember4 { 0%{transform:translateY(105vh) translateX(0) scale(0);opacity:0;} 8%{opacity:.6;} 92%{opacity:.2;} 100%{transform:translateY(-60px) translateX(-60px) scale(.9);opacity:0;} }
  .ember { position:absolute; border-radius:50%; animation:linear infinite; }
  .em-r1 { background:radial-gradient(circle,#33AAFFcc,#0066FF44,transparent); }
  .em-r2 { background:radial-gradient(circle,#66CCFFbb,#0044AA22,transparent); }
  .em-r3 { background:radial-gradient(circle,#8855FFaa,#3300AA22,transparent); }
  .em-r4 { background:radial-gradient(circle,#00DDCCaa,#00667711,transparent); }

  /* ── STAR FIELD ── */
  @keyframes twinkle  { 0%,100%{opacity:.08;transform:scale(1);}  50%{opacity:.95;transform:scale(1.6);} }
  @keyframes twinkle2 { 0%,100%{opacity:.12;transform:scale(1);}  50%{opacity:.70;transform:scale(1.3);} }
  .sdot  { position:absolute; border-radius:50%; animation:twinkle  ease-in-out infinite; }
  .sdot2 { position:absolute; border-radius:50%; animation:twinkle2 ease-in-out infinite; background:#99AAFF; }

  /* ── PULSING MOON ── */
  @keyframes moonPulse { 0%,100%{box-shadow:0 0 30px 10px #00AAFF33,0 0 60px 20px #0066CC22;} 50%{box-shadow:0 0 50px 20px #00AAFF55,0 0 100px 40px #0066CC33;} }
  .moon { position:absolute; top:6%; right:12%; width:70px; height:70px; border-radius:50%;
    background:radial-gradient(circle at 38% 38%, #CCEEFF, #66AAEE, #1144AA);
    animation:moonPulse 5s ease-in-out infinite; box-shadow:0 0 40px 15px #00AAFF44; }
  .moon::after { content:''; position:absolute; inset:-2px; border-radius:50%;
    background:transparent; border:1px solid #66CCFF33;
    animation:moonPulse 5s ease-in-out infinite reverse; }

  /* ── GROUND GLOW ── */
  .ground-glow { position:absolute; bottom:0; left:0; right:0; height:220px;
    background:linear-gradient(0deg,#0066FF1A 0%,#0044AA11 40%,transparent 100%); }
  .ground-line { position:absolute; bottom:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,#3399FF55,#00AAFFAA,#3399FF55,transparent);
    animation:moonPulse 4s ease-in-out infinite; }

  /* ── LAYOUT ── */
  .app-content { position:relative; z-index:3; display:flex; flex-direction:column; min-height:100vh; }
`;

// Pre-compute stable random values
const EMBERS = Array.from({length:32},(_,i)=>({
  id:i, size:4+(i*7)%14,
  left:`${(i*31+7)%100}%`,
  duration:`${10+(i*3)%20}s`,
  delay:`${(i*5)%18}s`,
  cls:['em-r1','em-r2','em-r3','em-r4'][i%4],
  anim:['ember1','ember2','ember3','ember4'][i%4],
}));

const WHITE_STARS = Array.from({length:70},(_,i)=>({
  id:i, size:.5+(i*1.7)%2.5,
  left:`${(i*37+3)%100}%`, top:`${5+(i*23)%55}%`,
  dur:`${2+(i*1.1)%4}s`, delay:`${(i*0.7)%5}s`,
}));

const RED_STARS = Array.from({length:40},(_,i)=>({
  id:i, size:.5+(i*1.3)%2,
  left:`${(i*53+17)%100}%`, top:`${3+(i*19)%50}%`,
  dur:`${1.5+(i*0.9)%3.5}s`, delay:`${(i*1.1)%6}s`,
}));

function SkyBackground() {
  return (
    <>
      <style>{SKY_CSS}</style>

      {/* Full-page screen flashes when lightning strikes */}
      <div className="screen-flash1"/>
      <div className="screen-flash2"/>

      <div className="sky-canvas">
        {/* Nebula clouds */}
        <div className="nebula neb1"/><div className="nebula neb2"/>
        <div className="nebula neb3"/><div className="nebula neb4"/>
        {/* Aurora curtains */}
        <div className="aurora aur1"/><div className="aurora aur2"/>
        <div className="aurora aur3"/><div className="aurora aur4"/>
        {/* Blood moon */}
        <div className="moon"/>

        {/* ══ STORM CLOUD 1 (left) with lightning ══ */}
        <div className="cloud1-wrap" style={{position:'absolute'}}>
          <div className="cloud1" style={{position:'absolute',inset:0,borderRadius:80,background:'radial-gradient(ellipse at 50% 40%,#1a1a2e,#0d0d1a 60%,transparent)',filter:'blur(8px)'}}/>
          <div className="cloud1-hi" style={{position:'absolute',inset:-10,borderRadius:90,background:'radial-gradient(ellipse at 50% 30%,#22103399,transparent 60%)',filter:'blur(12px)'}}/>
          {/* Lightning interior glow */}
          <div className="cloud1-flash" style={{position:'absolute',inset:-20,borderRadius:100,background:'radial-gradient(ellipse at 50% 60%,#00BFFFCC,#0099DD55 40%,transparent 70%)',filter:'blur(18px)',animation:'cloudFlash 8s ease-in-out infinite'}}/>
          {/* Lightning bolt */}
          <div className="bolt-container bolt1-wrap" style={{position:'absolute',top:0,left:'8%',width:80,height:180,animation:'bolt1 8s linear infinite'}}>
            <div className="bolt-glow" style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:4,height:'100%',background:'linear-gradient(180deg,#00CCFF,#00EEFF,#00BBFF,transparent)',filter:'blur(4px)',borderRadius:2}}/>
            <div className="bolt-main" style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'14px solid transparent',borderRight:'4px solid transparent',borderTop:'80px solid #00CCFF',filter:'drop-shadow(0 0 6px #00DDFF) drop-shadow(0 0 14px #00AAFF) drop-shadow(0 0 28px #0088CC88)'}}/>
            <div className="bolt-lower" style={{position:'absolute',top:72,left:'55%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'6px solid transparent',borderRight:'16px solid transparent',borderTop:'90px solid #00EEFF',filter:'drop-shadow(0 0 8px #00FFFF) drop-shadow(0 0 18px #00BBFF) drop-shadow(0 0 36px #0099CC88)'}}/>
            {/* Branch forks */}
            <div className="bolt-branch" style={{top:34,left:'46%',width:30,animation:'branchL1 8s linear infinite'}}/>
            <div className="bolt-branch" style={{top:58,left:'52%',width:22,animation:'branchR1 8s linear infinite'}}/>
          </div>
        </div>

        {/* ══ STORM CLOUD 2 (center) with TWO lightning bolts ══ */}
        <div className="cloud2-wrap" style={{position:'absolute'}}>
          <div style={{position:'absolute',inset:0,borderRadius:100,background:'radial-gradient(ellipse at 50% 45%,#1e1030,#12091e 55%,transparent)',filter:'blur(10px)'}}/>
          <div style={{position:'absolute',inset:-14,borderRadius:110,background:'radial-gradient(ellipse at 50% 30%,#2a1a4499,transparent 60%)',filter:'blur(14px)'}}/>
          {/* Lightning interior glow */}
          <div style={{position:'absolute',inset:-24,borderRadius:120,background:'radial-gradient(ellipse at 50% 60%,#00D4FFCC,#0088CC55 40%,transparent 70%)',filter:'blur(22px)',animation:'cloudFlash2 11s ease-in-out infinite'}}/>
          {/* Bolt A */}
          <div className="bolt-container bolt2a-wrap" style={{position:'absolute',top:0,left:'22%',width:80,height:200,animation:'bolt2 11s linear infinite'}}>
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:5,height:'100%',background:'linear-gradient(180deg,#33DDFF,#00FFFF,#00CCFF,transparent)',filter:'blur(5px)',borderRadius:2}}/>
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'16px solid transparent',borderRight:'3px solid transparent',borderTop:'95px solid #33DDFF',filter:'drop-shadow(0 0 8px #00EEFF) drop-shadow(0 0 20px #00CCFF) drop-shadow(0 0 40px #00AAFFAA)'}}/>
            <div style={{position:'absolute',top:87,left:'60%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'5px solid transparent',borderRight:'18px solid transparent',borderTop:'100px solid #00FFFF',filter:'drop-shadow(0 0 10px #00FFFF) drop-shadow(0 0 24px #00DDFF) drop-shadow(0 0 50px #00BBFFAA)'}}/>
            {/* Branch forks */}
            <div className="bolt-branch" style={{top:30,left:'48%',width:34,animation:'branchL2 11s linear infinite'}}/>
            <div className="bolt-branch" style={{top:62,left:'54%',width:26,animation:'branchR2 11s linear infinite'}}/>
            <div className="bolt-branch" style={{top:110,left:'58%',width:24,animation:'branchL2 11s linear infinite', animationDelay:'.3s'}}/>
          </div>
          {/* Bolt B */}
          <div className="bolt-container bolt2b-wrap" style={{position:'absolute',top:0,left:'55%',width:60,height:160,animation:'bolt3 11s linear infinite',animationDelay:'1.5s'}}>
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:3,height:'100%',background:'linear-gradient(180deg,#00CCEE,#00EEFF,transparent)',filter:'blur(3px)',borderRadius:2}}/>
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'12px solid transparent',borderRight:'3px solid transparent',borderTop:'75px solid #00CCEE',filter:'drop-shadow(0 0 6px #00DDFF) drop-shadow(0 0 16px #00AABB)'}}/>
            <div style={{position:'absolute',top:68,left:'40%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'4px solid transparent',borderRight:'13px solid transparent',borderTop:'80px solid #00EEFF',filter:'drop-shadow(0 0 7px #00FFFF) drop-shadow(0 0 18px #00CCFF)'}}/>
            {/* Branch fork */}
            <div className="bolt-branch" style={{top:42,left:'45%',width:22,animation:'branchR3 11s linear infinite',animationDelay:'1.5s'}}/>
          </div>
        </div>

        {/* ══ STORM CLOUD 3 (right) with lightning ══ */}
        <div className="cloud3-wrap" style={{position:'absolute'}}>
          <div style={{position:'absolute',inset:0,borderRadius:90,background:'radial-gradient(ellipse at 50% 40%,#1a0d28,#0f0818 60%,transparent)',filter:'blur(9px)'}}/>
          <div style={{position:'absolute',inset:-12,borderRadius:100,background:'radial-gradient(ellipse at 50% 30%,#251344,transparent 55%)',filter:'blur(13px)'}}/>
          {/* Lightning interior glow */}
          <div style={{position:'absolute',inset:-20,borderRadius:110,background:'radial-gradient(ellipse at 50% 60%,#33CCFFCC,#0077BB55 40%,transparent 70%)',filter:'blur(18px)',animation:'cloudFlash3 9s ease-in-out infinite'}}/>
          {/* Bolt */}
          <div className="bolt-container bolt3-wrap" style={{position:'absolute',top:0,right:'14%',width:70,height:170,animation:'bolt3 9s linear infinite'}}>
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:4,height:'100%',background:'linear-gradient(180deg,#00BBFF,#00DDFF,#0099EE,transparent)',filter:'blur(4px)',borderRadius:2}}/>
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'13px solid transparent',borderRight:'4px solid transparent',borderTop:'80px solid #00BBFF',filter:'drop-shadow(0 0 7px #00CCFF) drop-shadow(0 0 18px #0099EE) drop-shadow(0 0 35px #0088DD88)'}}/>
            <div style={{position:'absolute',top:74,left:'57%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'5px solid transparent',borderRight:'15px solid transparent',borderTop:'85px solid #00DDFF',filter:'drop-shadow(0 0 9px #00EEFF) drop-shadow(0 0 22px #00BBFF) drop-shadow(0 0 44px #00AAFFAA)'}}/>
            {/* Branches */}
            <div className="bolt-branch" style={{top:26,left:'48%',width:28,animation:'branchL3 9s linear infinite'}}/>
            <div className="bolt-branch" style={{top:50,left:'55%',width:24,animation:'branchR3 9s linear infinite'}}/>
            <div className="bolt-branch" style={{top:96,left:'60%',width:20,animation:'branchL3 9s linear infinite', animationDelay:'.25s'}}/>
          </div>
        </div>

        {/* Shooting stars */}
        {['ss1','ss2','ss3','ss4','ss5','ss6','ss7','ss8','ss9','ss10','ss11','ss12'].map(c=>(
          <div key={c} className={`sstar ${c}`}/>
        ))}
        {/* White star field */}
        {WHITE_STARS.map(s=>(
          <div key={s.id} className="sdot" style={{width:s.size,height:s.size,left:s.left,top:s.top,background:'#ffffff',animationDuration:s.dur,animationDelay:s.delay}}/>
        ))}
        {/* Red star field */}
        {RED_STARS.map(s=>(
          <div key={s.id} className="sdot2" style={{width:s.size,height:s.size,left:s.left,top:s.top,animationDuration:s.dur,animationDelay:s.delay}}/>
        ))}
        {/* Rising embers */}
        {EMBERS.map(e=>(
          <div key={e.id} className={`ember ${e.cls}`} style={{width:e.size,height:e.size,left:e.left,bottom:0,animationName:e.anim,animationDuration:e.duration,animationDelay:e.delay}}/>
        ))}
        {/* Ground effects */}
        <div className="ground-glow"/>
        <div className="ground-line"/>
      </div>
    </>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("catalog");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [toast, setToast] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  function showToast(msg) { setToast(msg); }
  function addToCart(p) { dispatch({ type: "ADD", product: p }); showToast(`${p.name} added to cart`); }
  function addFeedback(fb) { setFeedbacks(fs => [...fs, fb]); }

  function placeOrder(items, total, address) {
    const newOrder = {
      id: `ORD-${1003 + orders.length}`,
      userId: user.id,
      items: items.map(i => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty })),
      total,
      status: "Processing",
      date: new Date().toISOString().split("T")[0],
      address,
    };
    setOrders(os => [...os, newOrder]);
    showToast("Order placed successfully!");
  }

  function handleLogin(u) {
    setUser(u);
    setPage(u.role === "admin" ? "dashboard" : "catalog");
  }

  if (!user) return (
    <>
      <style>{css}</style>
      <SkyBackground />
      <div className="app-content">
        <nav className="nav"><span className="nav-logo">⚡ ShopWave</span></nav>
        <LoginPage onLogin={handleLogin} />
      </div>
    </>
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <style>{css}</style>
      <SkyBackground />
      <div className="app-content">
        <Navbar user={user} page={page} setPage={setPage} cartCount={cartCount} onLogout={() => { setUser(null); setPage("catalog"); dispatch({ type: "CLEAR" }); }} />
        {page === "catalog" && <CatalogPage products={products} onAdd={addToCart} />}
        {page === "cart" && <CartPage cart={cart} dispatch={dispatch} setPage={setPage} />}
        {page === "checkout" && <CheckoutPage cart={cart} dispatch={dispatch} setPage={setPage} onOrderPlace={placeOrder} />}
        {page === "orders" && <OrdersPage orders={orders} userId={user.id} />}
        {page === "feedback" && <FeedbackPage feedbacks={feedbacks} userId={user.id} userName={user.name} onSubmit={addFeedback} showToast={showToast} />}
        {page === "dashboard" && <AdminDashboard products={products} orders={orders} />}
        {page === "admin-products" && <AdminProducts products={products} setProducts={setProducts} showToast={showToast} />}
        {page === "admin-orders" && <AdminOrders orders={orders} setOrders={setOrders} showToast={showToast} />}
        {page === "admin-feedback" && <AdminFeedback feedbacks={feedbacks} />}
        {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}

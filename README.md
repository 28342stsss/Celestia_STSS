# CELESTIA — เว็บพรรคสภานักเรียน (React + Vite)

## รันบนเครื่อง (VS Code)
```bash
npm install
npm run dev
```
เปิด http://localhost:5173

## Build
```bash
npm run build      # ได้โฟลเดอร์ dist/
npm run preview    # ลองดูผล build
```

## Deploy บน Vercel
1. push โค้ดขึ้น GitHub
2. vercel.com → Add New → Project → Import repo นี้
3. Framework Preset: **Vite** (auto-detect) → Deploy

## โครงสร้าง
- `src/Celestia.jsx` — หน้าเว็บทั้งหมด (component เดียว)
- `src/logos.js` — โลโก้พรรค + โลโก้โรงเรียน (ฝัง base64)
- `src/main.jsx` — จุด mount React

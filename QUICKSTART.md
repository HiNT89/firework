# 🎆 QUICK START - Fireworks React App

## ⚡ Chạy ngay trong 3 bước

### 1️⃣ Cài đặt

```bash
cd d:\Workspace\HiNT\firework
npm install
```

### 2️⃣ Chạy

```bash
npm run dev
```

### 3️⃣ Mở trình duyệt

```
http://localhost:3000
```

---

## 📋 Commands Cheat Sheet

```bash
npm install          # Cài đặt dependencies
npm run dev          # Chạy dev server
npm run build        # Build production
npm run preview      # Preview production build
.\setup.ps1          # Setup wizard (PowerShell)
```

---

## 📁 File Structure Map

```
src/
├── App.jsx                   # 🎯 Main component
├── main.jsx                  # 🚀 Entry point
├── styles.scss               # 🎨 Styles
├── components/
│   ├── Controls.jsx          # ⏯️ Play/pause/sound/settings
│   ├── Menu.jsx              # ⚙️ Settings menu
│   └── HelpModal.jsx         # ❓ Help dialog
├── hooks/
│   └── useStore.js           # 💾 State + persistence
└── fireworks/
    └── fireworks.js          # 🎆 Engine wrapper
```

---

## 🎯 Features Checklist

### ✅ Working

- [x] UI Components
- [x] Settings Menu
- [x] State Management
- [x] LocalStorage
- [x] Responsive Design

### ⚠️ Need Integration

- [ ] Canvas Animation
- [ ] Fireworks Rendering
- [ ] Sound Effects

---

## 📖 Documentation Quick Links

| File                                         | Purpose                    |
| -------------------------------------------- | -------------------------- |
| [README.md](README.md)                       | 📘 Overview & installation |
| [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) | 🔧 Engine integration      |
| [COMPARISON.md](COMPARISON.md)               | 📊 Vanilla JS vs React     |
| [SUMMARY.md](SUMMARY.md)                     | ✨ Complete summary        |

---

## 🎨 Customize

### Change Colors

Edit: `src/fireworks/fireworks.js`

```javascript
export const COLOR = {
  Red: "#ff0043",
  Green: "#14fc56",
  // ...add your colors
};
```

### Modify UI

Edit components: `src/components/*.jsx`

### Update Styles

Edit: `src/styles.scss`

---

## 🐛 Troubleshooting

### Port 3000 đã sử dụng?

```bash
# Change port trong vite.config.js
server: { port: 3001 }
```

### Canvas trống?

- Normal! Cần tích hợp fireworks engine
- Xem: [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)

### npm install lỗi?

```bash
# Clear cache
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 🚀 Next Steps

1. **Test UI**: `npm run dev` → Check UI works
2. **Read Docs**: Xem INTEGRATION_GUIDE.md
3. **Add Engine**: Copy logic từ main.js
4. **Customize**: Edit theo ý muốn!

---

## 💡 Pro Tips

- Use React DevTools extension
- Check browser console for errors
- Hot reload works automatically
- Edit code and see changes instantly

---

## 📞 Need Help?

1. Check [README.md](README.md)
2. Read [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
3. See [COMPARISON.md](COMPARISON.md)
4. Check original [main.js](main.js)

---

## ⭐ Key Files

| Original                  | React                     |
| ------------------------- | ------------------------- |
| `index.html` (147 lines)  | `src/App.jsx` (170 lines) |
| `main.js` (2332 lines)    | Split into modules        |
| `styles.scss` (388 lines) | `src/styles.scss`         |

---

## 🎉 You're Ready!

```bash
npm install && npm run dev
```

**That's it!** UI sẽ hiển thị ngay. Canvas trống là bình thường.

---

**Happy Coding! 🚀✨**

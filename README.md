# Firework React Application

Ứng dụng pháo hoa được chuyển đổi sang React JS.

## Cấu trúc dự án

```
firework/
├── src/
│   ├── components/          # React components
│   │   ├── Controls.jsx     # Nút điều khiển (play/pause, sound, settings)
│   │   ├── Menu.jsx         # Menu cài đặt
│   │   └── HelpModal.jsx    # Modal trợ giúp
│   ├── hooks/
│   │   └── useStore.js      # Custom hook quản lý state
│   ├── fireworks/
│   │   └── fireworks.js     # Logic pháo hoa (cần tích hợp code gốc)
│   ├── App.jsx              # Component chính
│   ├── main.jsx             # Entry point
│   └── styles.scss          # Styles
├── index-react.html         # HTML cho React app
├── package.json
├── vite.config.js
└── README.md
```

## Các file gốc (Vanilla JS)

- `index.html` - HTML gốc
- `main.js` - JavaScript gốc (2332 dòng)
- `styles.scss` - Styles gốc

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

## Những gì đã chuyển đổi

### ✅ Hoàn thành:

1. **Project Structure**: Thiết lập Vite + React
2. **Components**:
   - App.jsx - Component chính
   - Controls.jsx - Điều khiển play/pause/sound/settings
   - Menu.jsx - Menu cài đặt với tất cả options
   - HelpModal.jsx - Modal hiển thị trợ giúp
3. **State Management**: Custom hook `useStore` thay thế store pattern gốc
4. **Persistence**: LocalStorage integration để lưu settings
5. **UI**: Toàn bộ UI được chuyển sang JSX

### ⚠️ Cần hoàn thiện:

**Fireworks Logic** (`src/fireworks/fireworks.js`):

- File `main.js` gốc có 2332 dòng code phức tạp
- Cần tích hợp các dependencies:
  - Stage.js (canvas rendering library)
  - MyMath.js (utility functions)
  - fscreen.js (fullscreen API)
- Logic bao gồm:
  - Shell creation & launching
  - Particle physics & animation
  - Canvas rendering với trails
  - Auto-launch sequences
  - Sound effects
  - Collision detection
  - Performance optimization

## Cách tích hợp hoàn chỉnh Fireworks Logic

### Option 1: Refactor toàn bộ (Khuyến nghị)

Chia nhỏ `main.js` thành các modules:

```
src/fireworks/
├── core/
│   ├── Stage.js
│   ├── Shell.js
│   ├── Star.js
│   └── Spark.js
├── utils/
│   ├── math.js
│   └── colors.js
├── physics/
│   └── particles.js
└── fireworks.js (main controller)
```

### Option 2: Wrap code gốc (Nhanh hơn)

1. Copy 3 libraries vào `public/libs/`:
   - Stage.js
   - MyMath.js
   - fscreen.js
2. Copy logic từ `main.js` vào `src/fireworks/fireworks.js`
3. Export functions cần thiết và import vào React components

## Dependencies còn thiếu

```bash
# Nếu cần audio
npm install howler

# Nếu cần animation utilities
npm install gsap
```

## Sử dụng

Sau khi cài đặt:

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`

## Features

- ✨ Multiple shell types (Random, Crackle, Palm, Ring)
- 📏 Adjustable shell sizes
- 🎨 Quality settings (Low/Normal/High)
- 🌌 Sky lighting effects
- 🔊 Sound effects (cần tích hợp)
- 🎯 Auto-launch & Finale mode
- 📱 Responsive design
- 💾 Settings persistence

## Credits

- Original code by [Caleb Miller](https://cmiller.tech/)
- React conversion: [Your Name]

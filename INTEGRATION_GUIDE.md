# HƯỚNG DẪN TÍCH HỢP FIREWORKS ENGINE

## Tổng quan

Source code gốc trong `main.js` (2332 dòng) chứa toàn bộ logic pháo hoa phức tạp. Để React app hoạt động đầy đủ, bạn cần tích hợp phần này.

## Bước 1: Copy External Libraries

Tạo thư mục `public/libs/` và thêm các file:

### 1. fscreen.js

Download từ: https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/fscreen%401.0.1.js

### 2. Stage.js

Download từ: https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/Stage%400.1.4.js

### 3. MyMath.js

Download từ: https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/MyMath.js

## Bước 2: Tích hợp Fireworks Logic

### Option A: Quick Integration (Khuyến nghị để test nhanh)

1. Copy toàn bộ code từ `main.js` (từ dòng 400 trở đi - phần logic chính)
2. Paste vào `src/fireworks/engine.js`
3. Export các functions cần thiết
4. Load external scripts trong `index-react.html`:

```html
<head>
  <!-- Thêm trước </head> -->
  <script src="/libs/fscreen@1.0.1.js"></script>
  <script src="/libs/Stage@0.1.4.js"></script>
  <script src="/libs/MyMath.js"></script>
</head>
```

### Option B: Modern Refactor (Cho production)

Cấu trúc module hoá:

```
src/fireworks/
├── engine/
│   ├── Stage.js          # Canvas rendering
│   ├── Shell.js          # Shell class
│   ├── Star.js           # Star particle class
│   ├── Spark.js          # Spark trail class
│   └── BurstFlash.js     # Flash effects
├── physics/
│   ├── particles.js      # Particle system
│   └── gravity.js        # Physics calculations
├── sequences/
│   ├── auto-launch.js    # Auto-launch patterns
│   └── finale.js         # Finale sequences
├── utils/
│   ├── colors.js         # Color utilities
│   ├── math.js           # Math utilities
│   └── sounds.js         # Sound effects
└── fireworks.js          # Main controller
```

## Bước 3: Update fireworks.js

Thay thế nội dung `src/fireworks/fireworks.js`:

```javascript
import { Stage } from "./engine/Stage";
// Import other modules...

let trailsStage;
let mainStage;
let animationFrameId;

export function initFireworks(trailsCanvas, mainCanvas, state, callbacks) {
  // Initialize Stage instances
  trailsStage = new Stage(trailsCanvas);
  mainStage = new Stage(mainCanvas);

  // Setup resize handler
  const handleResize = () => {
    // Resize logic
  };
  window.addEventListener("resize", handleResize);
  handleResize();

  // Setup animation loop
  let lastTime = Date.now();
  const render = () => {
    const now = Date.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    // Update and render logic here
    update(dt);

    animationFrameId = requestAnimationFrame(render);
  };

  // Start
  render();
  callbacks.onLoaded?.();

  // Cleanup
  return () => {
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(animationFrameId);
  };
}

function update(dt) {
  // Update all particles, shells, etc.
}

// Export other utilities...
```

## Bước 4: Testing

```bash
npm install
npm run dev
```

## Các phần cần implement:

### Core Physics

- ✅ Gravity & acceleration
- ✅ Particle trails
- ✅ Color blending
- ✅ Collision detection

### Shell Types

- ✅ Random shells
- ✅ Crackle shells
- ✅ Palm shells
- ✅ Ring shells
- ✅ Crossette shells
- ✅ Floral shells
- ✅ Falling leaves
- ✅ Willow shells
- ✅ Horse tail

### Features

- ✅ Auto-launch sequences
- ✅ Finale mode
- ✅ Sound effects (cần audio library)
- ✅ Long exposure effect
- ✅ Sky lighting
- ✅ Performance scaling

## Troubleshooting

### Libraries không load

- Đảm bảo files trong `public/libs/`
- Check browser console cho errors
- Verify script tags trong HTML

### Canvas không render

- Check canvas refs trong React
- Verify Stage initialization
- Check browser console

### Performance issues

- Lower quality setting
- Reduce shell size
- Disable sky lighting
- Check device specs

## Resources

- Original code: `main.js`
- Original HTML: `index.html`
- CodePen demo: [Link nếu có]

## Support

Nếu cần trợ giúp, check:

1. Browser console errors
2. Network tab (libraries loaded?)
3. React DevTools (components rendered?)

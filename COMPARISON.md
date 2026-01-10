# 📊 So sánh chi tiết: Vanilla JS vs React

## Cấu trúc Files

### Vanilla JS (Gốc)

```
firework/
├── index.html          (147 dòng)
├── main.js            (2332 dòng)
└── styles.scss        (388 dòng)

Total: 3 files, ~2867 dòng code
```

### React (Mới)

```
firework/
├── src/
│   ├── components/
│   │   ├── Controls.jsx       (35 dòng)
│   │   ├── Menu.jsx           (190 dòng)
│   │   └── HelpModal.jsx      (60 dòng)
│   ├── hooks/
│   │   └── useStore.js        (110 dòng)
│   ├── fireworks/
│   │   └── fireworks.js       (50 dòng + logic cần thêm)
│   ├── App.jsx                (170 dòng)
│   ├── main.jsx               (10 dòng)
│   └── styles.scss            (388 dòng)
├── index-react.html           (12 dòng)
├── package.json
└── vite.config.js

Total: 11+ files, modular structure
```

## Code Comparison

### 1. State Management

#### Vanilla JS

```javascript
// Global store object
const store = {
  _listeners: new Set(),
  state: {
    paused: true,
    soundEnabled: false,
    menuOpen: false,
    config: { ... }
  },

  setState(nextState) {
    const prevState = this.state;
    this.state = Object.assign({}, this.state, nextState);
    this._dispatch(prevState);
    this.persist();
  },

  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.remove(listener);
  }
};
```

#### React

```javascript
// Custom hook với React hooks
export function useStore(initialState) {
  const [state, setState] = useState(initialState);

  // Auto-persist with useEffect
  useEffect(() => {
    localStorage.setItem('cm_fireworks_data', JSON.stringify({
      schemaVersion: '1.2',
      data: { ...state.config }
    }));
  }, [state.config]);

  const togglePause = (toggle) => {
    setState(prev => ({
      ...prev,
      paused: typeof toggle === 'boolean' ? toggle : !prev.paused
    }));
  };

  return { state, togglePause, ... };
}
```

### 2. UI Rendering

#### Vanilla JS

```javascript
// Manual DOM manipulation
const appNodes = {
  stageContainer: ".stage-container",
  pauseBtn: ".pause-btn",
  pauseBtnSVG: ".pause-btn use",
  // ... many more selectors
};

// Convert selectors to nodes
Object.keys(appNodes).forEach((key) => {
  appNodes[key] = document.querySelector(appNodes[key]);
});

// Manual updates
function renderApp(state) {
  const pauseBtnIcon = `#icon-${state.paused ? "play" : "pause"}`;
  appNodes.pauseBtnSVG.setAttribute("href", pauseBtnIcon);
  appNodes.pauseBtnSVG.setAttribute("xlink:href", pauseBtnIcon);

  appNodes.controls.classList.toggle("hide", state.config.hideControls);
  appNodes.menu.classList.toggle("hide", !state.menuOpen);
  // ... many more manual updates
}

// Subscribe to changes
store.subscribe(renderApp);
```

#### React

```javascript
// Declarative JSX - auto re-render
function Controls({ paused, onPause, pauseBtnIcon }) {
  return (
    <div className="controls">
      <div className="btn pause-btn" onClick={onPause}>
        <svg fill="white" width="24" height="24">
          <use href={`#icon-${pauseBtnIcon}`}></use>
        </svg>
      </div>
    </div>
  );
}

// In App.jsx
const pauseBtnIcon = state.paused ? "play" : "pause";
<Controls
  paused={state.paused}
  onPause={togglePause}
  pauseBtnIcon={pauseBtnIcon}
/>;
```

### 3. Event Handling

#### Vanilla JS

```javascript
// Manual event listeners
appNodes.pauseBtn.addEventListener("click", togglePause);
appNodes.soundBtn.addEventListener("click", toggleSound);
appNodes.settingsBtn.addEventListener("click", () => toggleMenu(true));

// Form handling
appNodes.shellType.addEventListener("change", () => {
  updateConfig({ shell: appNodes.shellType.value });
});
```

#### React

```javascript
// Inline event handlers
<div className="btn pause-btn" onClick={() => onPause()}>

// Controlled inputs
<select
  value={config.shell}
  onChange={(e) => onConfigChange({ shell: e.target.value })}
>
  {shellTypes.map(type => (
    <option key={type} value={type}>{type}</option>
  ))}
</select>
```

### 4. Component Structure

#### Vanilla JS

```javascript
// Single file with everything mixed
- Global variables (lines 1-100)
- Store definition (lines 100-200)
- Helper functions (lines 200-400)
- DOM manipulation (lines 400-600)
- Event handlers (lines 600-800)
- Fireworks logic (lines 800-2332)
```

#### React

```javascript
// Separated into modules
- App.jsx          → Main component
- Controls.jsx     → Control buttons
- Menu.jsx         → Settings menu
- HelpModal.jsx    → Help dialog
- useStore.js      → State management
- fireworks.js     → Fireworks engine
```

## Advantages & Disadvantages

### Vanilla JS

**Ưu điểm:**

- ✅ Không cần dependencies
- ✅ Bundle size nhỏ
- ✅ Load nhanh
- ✅ Dễ deploy (chỉ 3 files)

**Nhược điểm:**

- ❌ Code dài trong 1 file (2332 lines)
- ❌ Khó maintain
- ❌ Manual DOM updates
- ❌ Không có type safety
- ❌ Khó test
- ❌ Khó tái sử dụng components

### React

**Ưu điểm:**

- ✅ Code modular, dễ maintain
- ✅ Components tái sử dụng
- ✅ Declarative UI
- ✅ Auto re-render
- ✅ Dễ test
- ✅ Rich ecosystem
- ✅ Developer tools
- ✅ Type safety (nếu dùng TypeScript)

**Nhược điểm:**

- ❌ Cần build process
- ❌ Larger bundle size
- ❌ Dependencies overhead
- ❌ Learning curve
- ❌ Setup phức tạp hơn

## Performance Comparison

### Initial Load

- **Vanilla JS**: ~50KB (minified)
- **React**: ~150KB+ (React + ReactDOM + app code)

### Runtime Performance

- **Vanilla JS**: Direct DOM manipulation, có thể nhanh hơn cho simple updates
- **React**: Virtual DOM overhead, nhưng optimized cho complex UIs

### Memory Usage

- **Vanilla JS**: Minimal
- **React**: Higher (Virtual DOM, React runtime)

## When to use what?

### Vanilla JS phù hợp khi:

- ✅ Simple, single-page animations
- ✅ No complex state management needed
- ✅ Need smallest possible bundle
- ✅ Quick prototypes
- ✅ Educational purposes

### React phù hợp khi:

- ✅ Complex UI với nhiều components
- ✅ Need to scale/maintain long-term
- ✅ Multiple developers
- ✅ Want component reusability
- ✅ Plan to add more features
- ✅ Need testing infrastructure

## Migration Benefits

### Từ Vanilla JS sang React:

1. **Maintainability** ⬆️

   - Code organized by feature
   - Easier to find and fix bugs
   - Clear component boundaries

2. **Scalability** ⬆️

   - Easy to add new features
   - Components can be reused
   - State management is centralized

3. **Developer Experience** ⬆️

   - Hot module replacement
   - React DevTools
   - Better debugging

4. **Team Collaboration** ⬆️
   - Clear code structure
   - Components can be developed independently
   - Easier code reviews

## Kết luận

Cả hai approaches đều có giá trị:

- **Vanilla JS**: Tốt cho projects nhỏ, simple animations
- **React**: Better cho long-term maintenance và scalability

Việc convert sang React có ý nghĩa nếu:

- Bạn muốn mở rộng features
- Cần maintain lâu dài
- Làm việc nhóm
- Muốn reuse components

---

**Note**: Fireworks engine (2332 lines) có thể giữ nguyên logic, chỉ cần wrap vào React structure.

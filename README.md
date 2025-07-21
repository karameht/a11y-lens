# 🔍 A11yLens Documentation

> Real-time accessibility checking for React apps based on axe-core.

A11yLens is a developer tool that brings accessibility testing directly into your development workflow. No more switching tabs, no more browser extensions - just drop it into your React app and get instant feedback on accessibility issues.

## 📦 Installation

```bash
npm install @karameht/a11y-lens
```

## 🚀 Quick Start

### Basic Setup

```tsx
import { A11yLens } from "@karameht/a11y-lens";
import "@karameht/a11y-lens/styles.css";

function App() {
  return (
    <div>
      {/* Your app */}
      <h1>My App</h1>
      <button>Click me</button>

      {/* A11yLens panel */}
      <A11yLens />
    </div>
  );
}
```

That's it! A11yLens will automatically:

- ✅ Detect your environment (development/production)
- ✅ Run accessibility scans using axe-core
- ✅ Show results in a floating panel
- ✅ Hide itself in production builds

## 🎛️ Configuration

### Component Props

```tsx
interface A11yLensProps {
  /** Enable/disable the component */
  enabled?: boolean;
  /** Force show even in production */
  forceShow?: boolean;
  /** Custom environment check */
  environment?: string;
  /** Show debug info in footer */
  debug?: boolean;
}
```

### Examples

```tsx
// Basic usage (recommended)
<A11yLens />

// Force show in production
<A11yLens forceShow={true} />

// Enable debug panel
<A11yLens debug={true} />

// Disable completely
<A11yLens enabled={false} />

// Custom environment override
<A11yLens environment="staging" />
```

## 🌍 Framework Support

A11yLens works seamlessly with all modern React frameworks:

### Vite

```bash
# .env.local
VITE_A11Y_LENS_ENV=development
```

### Next.js

```bash
# .env.local
NEXT_PUBLIC_A11Y_LENS_ENV=development
```

### Remix

```tsx
// Uses NODE_ENV automatically
<A11yLens />
```

### Astro

```bash
# .env
ASTRO_ENV=development
# OR
VITE_A11Y_LENS_ENV=development
```

## 🎨 User Interface

### Panel States

A11yLens has three main states:

1. **Minimized** (default) - Small button in bottom-left corner
2. **Expanded** - Full panel showing scan results
3. **Hidden** - Not visible (production mode)

### Tabs

- **Issues Tab** - Shows accessibility violations
  - Red badge when violations found
  - Green badge when no issues
- **Passed Tab** - Shows successful accessibility checks
  - Always green badge

### Features

- **Auto-scan** - Runs automatically when component mounts
- **Manual scan** - Click "Scan" button to re-run
- **Element highlighting** - Click "Find element" to highlight DOM elements
- **Documentation links** - Direct links to axe-core docs
- **Debug panel** - Environment and framework information

## 🔧 Advanced Usage

### Environment Detection

A11yLens automatically detects your environment using this priority order:

1. `environment` prop (if provided)
2. A11yLens-specific env vars (`VITE_A11Y_LENS_ENV`, `NEXT_PUBLIC_A11Y_LENS_ENV`)
3. App-level env vars (`VITE_APP_ENV`, `NEXT_PUBLIC_APP_ENV`)
4. Framework-specific vars (`MODE`, `NODE_ENV`)
5. Framework flags (`DEV`, `PROD`)
6. Fallback to `"development"`

### Custom Styling

A11yLens uses CSS custom properties for theming:

```css
:root {
  --a11y-accent: #00c7e6;
  --a11y-bg-primary: #0a0b0f;
  --a11y-bg-secondary: #13151a;
  --a11y-text-primary: #ffffff;
  /* ... customize colors */
}
```

### Programmatic Access

```tsx
import { useA11yScan } from "@karameht/a11y-lens";

function MyComponent() {
  const { results, isScanning, runScan, error } = useA11yScan({
    autoScan: true,
    scanDelay: 1000,
    retryDelay: 100,
  });

  return (
    <div>
      <button onClick={runScan} disabled={isScanning}>
        {isScanning ? "Scanning..." : "Run Scan"}
      </button>

      {results && <div>Found {results.violations.length} issues</div>}

      {error && <div>Error: {error}</div>}
    </div>
  );
}
```

## 🛠️ Troubleshooting

### A11yLens not showing?

1. **Check environment detection:**

   ```tsx
   <A11yLens debug={true} />
   ```

   Open the debug panel to see detected environment.

2. **Force show for testing:**

   ```tsx
   <A11yLens forceShow={true} />
   ```

3. **Check console logs:**

   ```text
   A11yLens: Disabled in production mode (nextjs). Use forceShow=true to override.
   ```

### Framework-specific setup

| Framework | Environment Variable                    |
| --------- | --------------------------------------- |
| Vite      | `VITE_A11Y_LENS_ENV=development`        |
| Next.js   | `NEXT_PUBLIC_A11Y_LENS_ENV=development` |
| Remix     | Uses `NODE_ENV` automatically           |
| Astro     | `ASTRO_ENV=development`                 |

### Scan errors?

- **"already running"** - Axe-core scan already in progress (auto-retries)
- **"Element not found"** - DOM element was removed/changed
- **"Cannot highlight"** - Element is not visually highlightable (html, head, etc.)

## 📊 Understanding Results

### Violation Levels

A11yLens shows violations by impact level:

- 🔴 **Critical** - Major accessibility barriers
- 🟠 **Serious** - Significant issues for users
- 🟡 **Moderate** - Noticeable problems
- 🔵 **Minor** - Small improvements

### Violation Information

Each violation shows:

- **Impact badge** - Severity level
- **Element count** - Number of affected DOM elements
- **Description** - What the problem is
- **Help text** - How to fix it
- **Element location** - CSS selector path
- **Action buttons**:
  - **Find element** - Highlights the element in DOM
  - **Read docs** - Opens axe-core documentation

### Passed Checks

The "Passed" tab shows:

- **WCAG level** - Which WCAG guidelines passed
- **Element count** - Number of elements that passed
- **Description** - What was tested
- **Documentation link** - Learn more about the check

## 🏗️ Architecture

### Components Structure

```text
A11yLens/
├── A11yLens.tsx          # Main component
├── modules/
│   └── components/
│       ├── layout/       # Header, Footer, Summary
│       ├── violation/    # ViolationList, ViolationItem
│       ├── passed/       # PassedList
│       ├── states/       # LoadingState, SuccessState
│       └── common/       # ActionButtons, Icons, etc.
├── shared/
│   ├── hooks/           # useA11yScan
│   ├── services/        # axe.service
│   ├── utils/           # env, dom, impact utils
│   └── types/           # TypeScript definitions
└── styles.css          # Complete CSS
```

### Service Layer

- **axe.service.ts** - Handles axe-core integration, retries, errors
- **useA11yScan.ts** - React hook for scan lifecycle management
- **dom.utils.ts** - DOM manipulation and element highlighting
- **env.utils.ts** - Framework-agnostic environment detection

## 🎯 Best Practices

### Development Workflow

1. **Install A11yLens** early in development
2. **Keep it always visible** during development
3. **Fix violations immediately** - don't let them accumulate
4. **Use element highlighting** to quickly locate issues
5. **Read the documentation** links for proper fixes

### Performance Tips

- A11yLens **auto-hides in production** - no bundle impact
- Scans run **asynchronously** - won't block your app
- **Lazy loads axe-core** - only when needed
- **Memory-safe** - proper cleanup on unmount

### Accessibility Priorities

Focus on violations in this order:

1. 🔴 **Critical** - Fix immediately
2. 🟠 **Serious** - Fix before next release
3. 🟡 **Moderate** - Fix in current sprint
4. 🔵 **Minor** - Fix when possible

## 📝 Examples

### Production Build Check

```tsx
// Only show in development and staging
<A11yLens
  enabled={process.env.NODE_ENV !== 'production'}
/>

// Or force show for testing
<A11yLens
  forceShow={window.location.hostname === 'staging.myapp.com'}
/>
```

### Custom Hook Usage

```tsx
function AccessibilityDashboard() {
  const { results, isScanning, runScan } = useA11yScan();

  const criticalIssues =
    results?.violations.filter((v) => v.impact === "critical") || [];

  return (
    <div>
      <h2>Accessibility Status</h2>
      <button onClick={runScan}>
        {isScanning ? "Scanning..." : "Run Scan"}
      </button>

      {criticalIssues.length > 0 && (
        <div style={{ color: "red" }}>
          ⚠️ {criticalIssues.length} critical issues found!
        </div>
      )}
    </div>
  );
}
```

### Conditional Rendering

```tsx
function App() {
  const isDev = process.env.NODE_ENV === "development";
  const isStaging = window.location.hostname.includes("staging");

  return (
    <div>
      <MyApp />

      {/* Only show in dev and staging */}
      {(isDev || isStaging) && <A11yLens debug={isDev} />}
    </div>
  );
}
```

## 🔒 Security & Privacy

- **No data collection** - Everything runs locally
- **No network requests** - Except for documentation links
- **No tracking** - No analytics or telemetry
- **Open source** - Full transparency
- **Production safe** - Auto-hides in production builds

## 🤝 Contributing

A11yLens is built with modern React patterns and TypeScript. The codebase is designed for:

- **Maintainability** - Clean separation of concerns
- **Extensibility** - Easy to add new features
- **Type safety** - Full TypeScript coverage
- **Performance** - Optimized for development workflow
- **Accessibility** - Eating our own dog food

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Credits

- **axe-core** - The accessibility testing engine that powers A11yLens
- **Deque Systems** - For building the best accessibility testing tools on the planet
- **React community** - For the patterns and practices that make this possible

---

**Built with ❤️ by [karameht](https://karameht.com)**

_Code with soul. Always._

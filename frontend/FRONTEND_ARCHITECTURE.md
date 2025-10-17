]633;E;echo "# DigIlit Frontend Project Structure";3cb48870-c9c4-46f2-a595-19222fa4889d]633;C# DigIlit Frontend Project Structure

## Current Directory Tree
```
.
├── .next
│   ├── cache
│   │   ├── swc
│   │   │   └── plugins
│   │   │       └── linux_x86_64_18.0.0
│   │   ├── webpack
│   │   │   ├── client-development
│   │   │   │   ├── 0.pack.gz
│   │   │   │   └── index.pack.gz
│   │   │   ├── client-production
│   │   │   │   ├── 0.pack
│   │   │   │   └── index.pack
│   │   │   ├── edge-server-production
│   │   │   │   ├── 0.pack
│   │   │   │   └── index.pack
│   │   │   └── server-production
│   │   │       ├── 0.pack
│   │   │       ├── index.pack
│   │   │       └── index.pack.old
│   │   └── next-devtools-config.json
│   ├── diagnostics
│   │   ├── build-diagnostics.json
│   │   └── framework.json
│   ├── server
│   │   ├── app
│   │   │   ├── _not-found
│   │   │   │   ├── page.js
│   │   │   │   ├── page.js.nft.json
│   │   │   │   └── page_client-reference-manifest.js
│   │   │   ├── page.js
│   │   │   ├── page.js.nft.json
│   │   │   └── page_client-reference-manifest.js
│   │   ├── chunks
│   │   │   ├── 611.js
│   │   │   └── 778.js
│   │   ├── pages
│   │   │   ├── _app.js
│   │   │   ├── _app.js.nft.json
│   │   │   ├── _document.js
│   │   │   ├── _document.js.nft.json
│   │   │   ├── _error.js
│   │   │   └── _error.js.nft.json
│   │   ├── app-paths-manifest.json
│   │   ├── dynamic-css-manifest.js
│   │   ├── interception-route-rewrite-manifest.js
│   │   ├── middleware-build-manifest.js
│   │   ├── middleware-manifest.json
│   │   ├── middleware-react-loadable-manifest.js
│   │   ├── next-font-manifest.js
│   │   ├── next-font-manifest.json
│   │   ├── pages-manifest.json
│   │   ├── server-reference-manifest.js
│   │   ├── server-reference-manifest.json
│   │   └── webpack-runtime.js
│   ├── static
│   │   ├── AV-fC1qEVqOL-LC2sXyna
│   │   │   ├── _buildManifest.js
│   │   │   └── _ssgManifest.js
│   │   └── chunks
│   │       ├── app
│   │       │   ├── _not-found
│   │       │   │   └── page-5e3b48f6857f6807.js
│   │       │   ├── layout-ea917baca648c97c.js
│   │       │   └── page-dd0c02a40175c533.js
│   │       ├── pages
│   │       │   ├── _app-e6c798220e1f4608.js
│   │       │   └── _error-cb2a52f75f2162e2.js
│   │       ├── 255-bb38f9c54ac64e21.js
│   │       ├── 4bd1b696-c023c6e3521b1417.js
│   │       ├── framework-a6e0b7e30f98059a.js
│   │       ├── main-1c2f867668d4ec37.js
│   │       ├── main-app-d429316feeb10232.js
│   │       ├── polyfills-42372ed130431b0a.js
│   │       └── webpack-30b9dd9193356b11.js
│   ├── types
│   │   ├── app
│   │   │   ├── layout.ts
│   │   │   └── page.ts
│   │   ├── cache-life.d.ts
│   │   ├── package.json
│   │   ├── routes.d.ts
│   │   └── validator.ts
│   ├── app-build-manifest.json
│   ├── build-manifest.json
│   ├── dynamic-css-manifest.json
│   ├── package.json
│   ├── react-loadable-manifest.json
│   └── trace
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── backups
│   ├── nextjs_20251017_175834
│   │   ├── app
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── next.config.js
│   │   ├── next.config.mjs
│   │   ├── package-lock.json
│   │   ├── postcss.config.mjs
│   │   ├── tailwind.config.js
│   │   └── tsconfig.json
│   └── nextjs_20251017_181708
│       ├── app
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── pages
│       │   └── _app.tsx
│       ├── next.config.mjs
│       ├── package-lock.json
│       ├── postcss.config.mjs
│       ├── tailwind.config.js
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── components
│   ├── voice
│   │   └── VoiceAssistantButton.tsx
│   ├── DiglitLanding.jsx
│   └── TopBar.tsx
├── hooks
│   └── useVoiceAssistant.ts
├── pages
│   └── _app.tsx
├── .env.local
├── Build
├── FRONTEND_ARCHITECTURE.md
├── globals.css
├── next-env.d.ts
├── next.config.mjs
├── nextjs-optimizer.sh
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
├── tailwind.config.ts
└── tsconfig.json

36 directories, 104 files
```

## Logical Architecture Mind Map
```
DIGILIT FRONTEND ARCHITECTURE:
│
├── 🎨 Presentation Layer
│   ├── Components → Reusable UI Elements
│   ├── Pages → Route Components
│   ├── Styles → CSS/SCSS/Theming
│   └── Assets → Images, Icons, Fonts
│
├── ⚡ Business Logic Layer
│   ├── State Management → Global State
│   ├── Hooks → Custom React Logic
│   ├── Services → API Communication
│   └── Utils → Helper Functions
│
├── 🛣️  Routing & Navigation
│   ├── Route Definitions
│   ├── Navigation Flow
│   └── Protected Routes
│
├── 🔧 Configuration
│   ├── Build Settings
│   ├── Environment Variables
│   └── Deployment Config
│
└── 🧪 Testing & Quality
    ├── Unit Tests
    ├── Integration Tests
    └── E2E Tests

DATA FLOW:
User Input → Components → State → API → Backend
API Response → State → Components → UI Update
```
]633;E;echo "DIGILIT FRONTEND ARCHITECTURE:";3cb48870-c9c4-46f2-a595-19222fa4889d]633;CDIGILIT FRONTEND ARCHITECTURE:
│
├── 🎨 Presentation Layer
│   ├── Components → Reusable UI Elements
│   ├── Pages → Route Components
│   ├── Styles → CSS/SCSS/Theming
│   └── Assets → Images, Icons, Fonts
│
├── ⚡ Business Logic Layer
│   ├── State Management → Global State
│   ├── Hooks → Custom React Logic
│   ├── Services → API Communication
│   └── Utils → Helper Functions
│
├── 🛣️  Routing & Navigation
│   ├── Route Definitions
│   ├── Navigation Flow
│   └── Protected Routes
│
├── 🔧 Configuration
│   ├── Build Settings
│   ├── Environment Variables
│   └── Deployment Config
│
└── 🧪 Testing & Quality
    ├── Unit Tests
    ├── Integration Tests
    └── E2E Tests

DATA FLOW:
User Input → Components → State → API → Backend
API Response → State → Components → UI Update
```

#!/bin/bash
set -e

echo "== DIGILIT Frontend Setup =="

# 1. Init Next.js if not present
if [ ! -f package.json ]; then
  npx create-next-app@latest . --use-npm --typescript --eslint --tailwind --src-dir --app --no-example --import-alias "@/*"
fi

# 2. Install required dependencies
npm install framer-motion @tailwindcss/forms

# 3. Create Tailwind config if missing
if [ ! -f tailwind.config.js ]; then
  npx tailwindcss init -p
fi

# 4. Ensure Tailwind config includes forms plugin
grep -q "@tailwindcss/forms" tailwind.config.js || \
  sed -i "/plugins:/a\    require('@tailwindcss/forms')," tailwind.config.js

# 5. Create /components and copy DiglitLanding.jsx if not present
mkdir -p components
if [ ! -f components/DiglitLanding.jsx ]; then
  echo "// Paste your DiglitLanding.jsx here" > components/DiglitLanding.jsx
fi

# 6. Scaffold /app/page.jsx to use DiglitLanding
mkdir -p app
cat > app/page.jsx <<EOF
import DiglitLanding from '../components/DiglitLanding';
export default function Page() {
  return <DiglitLanding />;
}
EOF

# 7. Add global styles if missing
mkdir -p styles
cat > styles/globals.css <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# 8. Ensure _app.js imports global styles (for pages dir fallback)
if [ ! -f pages/_app.js ]; then
  mkdir -p pages
  echo "import '../styles/globals.css'; export default function App({ Component, pageProps }) { return <Component {...pageProps} />; }" > pages/_app.js
fi

# 9. Add .nvmrc for Node 20.17.0
echo "20.17.0" > .nvmrc

# 10. Add .gitignore
cat > .gitignore <<EOF
node_modules
.next
dist
.env
.DS_Store
*.log
coverage
out
EOF

# 11. Add netlify.toml
cat > netlify.toml <<EOF
[build]
  command = "npm run build"
  publish = ".next"
EOF

# 12. Reminder for public assets
mkdir -p public
echo "Place reality.jpg and quantum.jpg in the /public directory." > public/README.txt

echo "== DIGILIT Frontend Ready! =="
echo "Next steps:"
echo "1. Paste your DiglitLanding.jsx into components/DiglitLanding.jsx"
echo "2. Add reality.jpg and quantum.jpg to /public"
echo "3. Run: nvm use && npm install && npm run dev"
echo "4. Deploy to Netlify!"
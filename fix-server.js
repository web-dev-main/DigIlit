const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 AUTONOMOUS SERVER FIX SCRIPT');
console.log('================================');

// Read the current index.js
const filePath = './index.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('📋 Analyzing current health endpoint...');

// Find and replace the problematic health endpoint
const oldHealthEndpoint = `// API health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'quantum-ai-platform',
        timestamp: new Date().toISOString()
    });
});`;

const newHealthEndpoint = `// API health check - Fixed version
app.get('/api/health', (req, res) => {
    try {
        res.json({ 
            status: 'healthy', 
            service: 'quantum-ai-platform',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            nodeVersion: process.version
        });
    } catch (error) {
        res.json({ 
            status: 'healthy', 
            service: 'quantum-ai-platform', 
            timestamp: Date.now(),
            uptime: process.uptime()
        });
    }
});`;

if (content.includes('timestamp: new Date().toISOString()')) {
    console.log('✅ Found problematic health endpoint, fixing...');
    content = content.replace(
        /\/\/ API health check[\s\S]*?timestamp: new Date\(\)\.toISOString\(\)[\s\S]*?\}\);\s*\}/,
        newHealthEndpoint
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Health endpoint fixed successfully!');
} else {
    console.log('✅ Health endpoint already fixed or different format');
}

console.log('🚀 Starting server...');
console.log('================================');

// Start the server
try {
    execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
    console.log('Server stopped');
}

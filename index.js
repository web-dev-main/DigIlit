import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory (diglit-quantum frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API health check
app.get('/api/health', (req, res) => {
    const now = new Date();
    res.json({ 
        status: 'healthy', 
        service: 'diglit-quantum-platform',
        timestamp: now.toISOString(),
        uptime: process.uptime()
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'API is working correctly.',
        data: {
            sample: 'This is test data from your backend for the diglit-quantum frontend.'
        }
    });
});

// Serve main page - fallback to index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('==================================================');
    console.log('🌌 DIGLIT QUANTUM PLATFORM - SERVER STARTED');
    console.log('==================================================');
    console.log(`📍 Frontend: http://localhost:${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/api/health`);
    console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
    console.log('==================================================');
});

export default app;

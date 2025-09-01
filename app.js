const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Dosti And Dialogues - Home',
        currentYear: new Date().getFullYear()
    });
});

app.get('/terms', (req, res) => {
    res.render('terms', { 
        title: 'Terms & Conditions - Dosti And Dialogues',
        currentYear: new Date().getFullYear()
    });
});

app.get('/privacy', (req, res) => {
    res.render('privacy', { 
        title: 'Privacy Policy - Dosti And Dialogues',
        currentYear: new Date().getFullYear()
    });
});

app.get('/disclaimer', (req, res) => {
    res.render('disclaimer', { 
        title: 'Disclaimer - Dosti And Dialogues',
        currentYear: new Date().getFullYear()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - Page Not Found',
        currentYear: new Date().getFullYear()
    });
});

app.listen(PORT, () => {
    console.log(`🎧 Dosti And Dialogues server running on http://localhost:${PORT}`);
});
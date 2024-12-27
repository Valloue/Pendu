const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Configurer CORS pour permettre les requêtes depuis votre frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Route pour ajouter un nouveau mot
app.post('/api/words', async (req, res) => {
    try {
        const { word, hint1, hint2, hint3, difficulty } = req.body;
        const csvLine = `${word},${hint1},${hint2},${hint3},${difficulty}\n`;
        const filePath = path.join(__dirname, 'data', 'words.csv');
        
        // Crée le dossier data s'il n'existe pas
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        await fs.appendFile(filePath, csvLine, 'utf8');
        res.json({ success: true, message: 'Mot ajouté avec succès' });
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout du mot' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 
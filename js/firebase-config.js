// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0lAsmtpPP7xAi_cdD37S0Y9-BrFGbI3I",
  authDomain: "appmanu-35671.firebaseapp.com",
  projectId: "appmanu-35671",
  storageBucket: "appmanu-35671.firebasestorage.app",
  messagingSenderId: "973453079153",
  appId: "1:973453079153:web:91fe12cbb1081cb3ed61d0",
  measurementId: "G-D283W2WBSW"
};

// Initialisation de Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Gestionnaire Firebase avec gestion d'erreurs améliorée
class FirebaseManager {
    static async addWord(wordData) {
        try {
            // Vérification des données avant l'envoi
            if (!wordData.word || !wordData.difficulty) {
                throw new Error('Données manquantes');
            }

            // Formatage des données
            const data = {
                word: wordData.word.toUpperCase(),
                hints: [
                    wordData.hint1 || '',
                    wordData.hint2 || '',
                    wordData.hint3 || ''
                ],
                difficulty: wordData.difficulty,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Ajout du document dans la collection appropriée
            await db.collection('words').doc(wordData.word).set(data);
            console.log('Mot ajouté avec succès:', wordData.word);
            return true;
        } catch (error) {
            console.error("Erreur lors de l'ajout du mot:", error);
            throw error; // Propage l'erreur pour une meilleure gestion
        }
    }

    static async getWords() {
        try {
            const snapshot = await db.collection('words').get();
            const words = [];
            snapshot.forEach(doc => {
                words.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return words;
        } catch (error) {
            console.error("Erreur lors de la récupération des mots:", error);
            throw error;
        }
    }
} 
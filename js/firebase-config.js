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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Modification de la classe HangmanGame pour utiliser Firebase
class FirebaseManager {
    static async addWord(wordData) {
        try {
            await db.collection('words').add({
                word: wordData.word.toUpperCase(),
                hints: [wordData.hint1, wordData.hint2, wordData.hint3],
                difficulty: wordData.difficulty,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Erreur lors de l'ajout du mot:", error);
            return false;
        }
    }

    static async getWords() {
        try {
            const snapshot = await db.collection('words').get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Erreur lors de la récupération des mots:", error);
            return [];
        }
    }

    static async addComment(commentData) {
        try {
            if (!commentData.object || !commentData.text || !commentData.email) {
                throw new Error('Données manquantes');
            }

            const data = {
                object: commentData.object,
                text: commentData.text,
                email: commentData.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('comments').add(data);
            console.log('Commentaire ajouté avec succès');
            return true;
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
            throw error;
        }
    }
} 
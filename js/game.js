const defaultWords = [
    {
        word: "javascript",
        hint1: "Langage de programmation",
        hint2: "Utilisé pour le web",
        hint3: "Fonctionne dans le navigateur",
        difficulty: "facile"
    },
    // Ajoutez d'autres mots par défaut...
];

class HangmanGame {
    constructor() {
        this.difficulties = {
            facile: {
                words: [
                    'AMIS', 'AMOUR', 'ARBRE', 'AUTOBUS', 'AVION', 'BALLON', 'BANANE', 'BANC', 
                    'BATEAU', 'BEBE', 'BIJOU', 'BLANCHE', 'BOIRE', 'BONBON', 'CELLULE', 
                    'CHAISE', 'CHAPEAU', 'CHAT', 'CHATEAU', 'CHIEN', 'CIEL', 'CLE', 'CLUB',
                    'COEUR', 'COUTEAU', 'CRAYON', 'CROIX', 'ECOLE', 'ELEPHANT', 'FENETRE',
                    'FEUILLE', 'FLEUR', 'FORET', 'FROMAGE', 'GATEAU', 'GAZON', 'GELEE',
                    'GIRAFE', 'GOMME', 'HIVER', 'JARDIN', 'JAUNE', 'LAIT', 'LEGUME',
                    'LIMONADE', 'LINGE', 'LIT', 'LIVRE', 'LOUP', 'LUNE', 'LUNETTES',
                    'MAISON', 'MAMAN', 'MER', 'MERE', 'MIEL', 'MIROIR', 'MOITIE',
                    'MONDE', 'NEIGE', 'NEZ', 'NOMBRIL', 'NUIT', 'OEUF', 'OISEAU',
                    'ORANGE', 'PAIN', 'PAPA', 'PECHE', 'PERE', 'PHOTO', 'PIANO',
                    'PLAGE', 'PLUIE', 'POISSON', 'POMME', 'PORTE', 'PYJAMAS', 'REVE',
                    'RIRE', 'RUE', 'SAVON', 'SOLEIL', 'SOURIRE', 'SOURIS', 'SUCRE',
                    'TABLE', 'TASSE', 'TIGRE', 'TRAIN', 'TROUSSE', 'VACHE', 'VELO',
                    'VENT', 'VILLE', 'VOITURE'
                ],
                attempts: 13
            },
            intermediaire: {
                words: [
                    'AMICAL', 'AVENTURE', 'BIBLIOTHEQUE', 'BICYCLETTE', 'BRODERIE',
                    'CASCADE', 'CELEBRATION', 'CHARISME', 'CLARINETTE', 'COMPLICITE',
                    'COURAGE', 'COURONNE', 'DYNAMIQUE', 'ECLIPSE', 'ENCHANTEMENT',
                    'ENERGIE', 'ENIGMATIQUE', 'EQUILIBRE', 'ETINCELLE', 'FANTOME',
                    'HARMONIE', 'HORIZON', 'MYSTERE', 'MELODIE', 'MIRACLE', 'SCINTILLANT',
                    'EBULLITION', 'ENDURANCE', 'EPANOUIR', 'ESCARGOT', 'EXPLOITATION',
                    'FORGERON', 'FOUDRE', 'FOURMIS', 'FRAGILE', 'GIROUETTE', 'GRAMMAIRE',
                    'HELICE', 'LANTERNES', 'LIBERTE', 'MACARON', 'MAREE', 'MONTAGNE',
                    'NUAGE', 'OMBRE', 'OMBRELLE', 'PALISSADE', 'PARASOL', 'PENDENTIF',
                    'PENINSULE', 'PHARE', 'PIETON', 'PIRATE', 'PIVERT', 'PLASTRON',
                    'PLOMBIER', 'PLONGEE', 'PLUME', 'POESIE', 'POIGNARD', 'PRISON',
                    'PROGRES', 'PROMENADE', 'PYRAMIDE', 'REFUGE', 'REVOLUTION',
                    'RIVIERE', 'RUCHE', 'SECRETS', 'SERPENT', 'SIRENE', 'SOLITUDE',
                    'SOMNAMBULE', 'SQUELETTE', 'SYMPHONIE', 'TAPIS', 'TECHNOLOGIE',
                    'TEMPETE', 'TRESOR', 'TROUPEAU', 'UNIVERS', 'VERTIGE', 'VOYAGE',
                    'ZEN'
                ],
                attempts: 13
            },
            difficile: {
                words: [
                    'ABNEGATION', 'ABRICOTIER', 'ABYSSE', 'ACROSTICHE', 'AGNOSTICISME',
                    'ASTERISQUE', 'BABILLARD', 'BALSAMIQUE', 'BALUSTRE', 'BASKETBALL',
                    'BENEFIQUE', 'BROCANTEUR', 'CAMBRIOLEUSE', 'CARACOLER', 'CHAMPAGNE',
                    'CHIMERE', 'CLANDESTIN', 'CLOCHE', 'COEXISTER', 'CONTEXTE',
                    'CONTRAVENTION', 'CYBERSPACE', 'DEBACLE', 'DESENCHANTEMENT',
                    'DILIGENCE', 'DIPHTONGUE', 'DISSONANCE', 'EBULLITION', 'ELEPHANTIASIS'
                ],
                attempts: 13
            },
            impossible: {
                words: [
                    'ANTICONSTITUTIONNELLEMENT', 'HEXAKOSIOIHEXEKONTAHEXAPHOBIE', 'HIPPOPOTOMONSTROSESQUIPPEDALIOPHOBIE',
                    'OTORHINOLARYNGOLOGISTE', 'PARALLELEPIPEDE', 'SPECTROPHOTOMETRIE', 'THYROIDECTOMIE',
                    'ULTRAMICROSCOPIQUE', 'XERODERME', 'ZEPPELIN', 'ZOOLOGIE', 'ZUGZWANG', 'ZYKLON'
                ],
                attempts: 13
            }
        };
        
        this.currentDifficulty = 'intermediaire';
        this.word = '';
        this.guessedLetters = new Set();
        this.canvas = document.getElementById('hangmanCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.errors = 0;
        this.initDifficultyButtons();
        this.initKeyboardEvents();
        this.init();

        this.hints = {
            facile: {
                'AMIS': [
                    'On en a plusieurs dans la vie',
                    'Personnes avec qui on aime passer du temps',
                    'Ils sont là dans les bons et mauvais moments'
                ],
                'AMOUR': [
                    'Sentiment fort du cœur',
                    'Cupidon en est le symbole',
                    'Peut être représenté par un cœur rouge'
                ],
                'ARBRE': [
                    'A des feuilles et des branches',
                    'Pousse dans la nature',
                    'Donne de l\'ombre en été'
                ],
                'AUTOBUS': [
                    'Transport en commun',
                    'Véhicule avec beaucoup de sièges',
                    'S\'arrête à des stations dfinies'
                ],
                'AVION': [
                    'Voyage dans les airs',
                    'A des ailes pour voler',
                    'Décolle des aéroports'
                ],
                'BALLON': [
                    'Objet rond et gonflé',
                    'Peut s\'envoler dans le ciel',
                    'Utilisé dans de nombreux sports'
                ],
                'BANANE': [
                    'Fruit jaune',
                    'A une forme courbée',
                    'Les singes l\'adorent'
                ],
                'BANC': [
                    'On s\'assoit dessus',
                    'Souvent dans les parcs',
                    'Peut être en bois ou en métal'
                ],
                'BATEAU': [
                    'Flotte sur l\'eau',
                    'Moyen de transport maritime',
                    'A un capitaine pour le diriger'
                ],
                'BEBE': [
                    'Très jeune enfant',
                    'Dort beaucoup',
                    'Boit du lait au biberon'
                ],
                'BIJOU': [
                    'Objet précieux',
                    'Peut être en or ou en argent',
                    'Se porte comme décoration'
                ],
                'BLANCHE': [
                    'Couleur de la neige',
                    'Opposé du noir',
                    'Couleur de la pureté'
                ],
                'BOIRE': [
                    'Action quotidienne',
                    'Nécessaire à la vie',
                    'Se fait avec un verre'
                ],
                'BONBON': [
                    'Friandise sucrée',
                    'Les enfants en raffolent',
                    'Peut être à la menthe ou au fruit'
                ],
                'CELLULE': [
                    'Plus petite partie vivante',
                    'Visible au microscope',
                    'Compose tous les êtres vivants'
                ],
                'CHAISE': [
                    'Meuble quotidien',
                    'Pour s\'asseoir',
                    'A généralement quatre pieds'
                ],
                'CHAPEAU': [
                    'Accessoire de tête',
                    'Protège du soleil',
                    'Complète une tenue'
                ],
                'CHAT': [
                    'Animal qui ronronne',
                    'Aime chasser les souris',
                    'Animal de compagnie indépendant'
                ],
                'CHATEAU': [
                    'Grande demeure fortifiée',
                    'Habitation de roi',
                    'A des tours et des douves'
                ],
                'CHIEN': [
                    'Animal fidèle',
                    'Aboie pour communiquer',
                    'On le promène avec une laisse'
                ],
                'CIEL': [
                    'Au-dessus de nos têtes',
                    'Bleu par beau temps',
                    'Les oiseaux y volent'
                ],
                'CLE': [
                    'Ouvre les portes',
                    'En métal généralement',
                    'Permet d\'accéder à un lieu fermé'
                ],
                'CLUB': [
                    'Groupe organisé',
                    'Lieu de rencontre',
                    'Association de personnes'
                ],
                'COEUR': [
                    'Organe vital',
                    'Symbole de l\'amour',
                    'Bat dans la poitrine'
                ],
                'COUTEAU': [
                    'Ustensile de cuisine',
                    'Pour couper',
                    'A une lame tranchante'
                ],
                'CRAYON': [
                    'Outil pour écrire',
                    'En bois et mine',
                    'S\'utilise avec une gomme'
                ],
                'CROIX': [
                    'Symbole en forme de +',
                    'Signe religieux',
                    'Marque l\'emplacement'
                ],
                'ECOLE': [
                    'Lieu d\'apprentissage',
                    'Les enfants y vont chaque jour',
                    'On y trouve des professeurs'
                ],
                'ELEPHANT': [
                    'Grand mammifère',
                    'A une trompe',
                    'Animal d\'Afrique ou d\'Asie'
                ],
                'FENETRE': [
                    'Laisse passer la lumière',
                    'Ouverture dans un mur',
                    'Peut s\'ouvrir et se fermer'
                ],
                'FEUILLE': [
                    'Partie verte d\'un arbre',
                    'Tombe en automne',
                    'Peut être de papier'
                ],
                'FORET': [
                    'Lieu plein d\'arbres',
                    'Habitat naturel',
                    'Les bûcherons y travaillent'
                ],
                'FROMAGE': [
                    'Produit laitier',
                    'Spécialité française',
                    'Se mange après le plat'
                ],
                'GATEAU': [
                    'Dessert sucré',
                    'Pour les anniversaires',
                    'Se partage en parts'
                ],
                'GAZON': [
                    'Herbe courte',
                    'Dans les jardins',
                    'Se tond régulièrement'
                ],
                'GELEE': [
                    'Consistance tremblante',
                    'Peut être sucrée ou salée',
                    'Se solidifie au froid'
                ],
                'GIRAFE': [
                    'Animal au long cou',
                    'Vit en Afrique',
                    'Mange les feuilles des arbres'
                ],
                'GOMME': [
                    'Efface les erreurs',
                    'Utilisée avec un crayon',
                    'En caoutchouc généralement'
                ],
                'HIVER': [
                    'Saison froide',
                    'Période de neige',
                    'Commence en décembre'
                ],
                'JARDIN': [
                    'Espace vert',
                    'On y cultive des plantes',
                    'Derrière ou devant la maison'
                ],
                'JAUNE': [
                    'Couleur du soleil',
                    'Comme le citron',
                    'Couleur des poussins'
                ],
                'LAIT': [
                    'Boisson blanche',
                    'Vient de la vache',
                    'Les bébés en boivent'
                ],
                'LEGUME': [
                    'Bon pour la santé',
                    'Pousse dans le potager',
                    'Se mange souvent cuit'
                ],
                'LIMONADE': [
                    'Boisson pétillante',
                    'Souvent au citron',
                    'Rafraîchissante en été'
                ],
                'LINGE': [
                    'À laver régulièrement',
                    'Se met dans la machine',
                    'Vêtements et tissus'
                ],
                'LIT': [
                    'Meuble pour dormir',
                    'A des oreillers',
                    'On y passe la nuit'
                ],
                'LIVRE': [
                    'Contient des pages',
                    'Pour lire des histoires',
                    'Se trouve à la bibliothèque'
                ],
                'LOUP': [
                    'Animal sauvage',
                    'Cousin du chien',
                    'Hurle à la lune'
                ],
                'LUNE': [
                    'Astre de la nuit',
                    'Satellite de la Terre',
                    'Change de forme chaque nuit'
                ],
                'LUNETTES': [
                    'Aide à voir',
                    'Se pose sur le nez',
                    'Avec deux verres'
                ],
                'MAISON': [
                    'Lieu d\'habitation',
                    'A un toit et des murs',
                    'On y vit en famille'
                ],
                'MAMAN': [
                    'Parent féminin',
                    'Donne naissance',
                    'Synonyme de mère'
                ],
                'MER': [
                    'Grande étendue d\'eau salée',
                    'On s\'y baigne en été',
                    'Les poissons y vivent'
                ],
                'MERE': [
                    'Parent féminin',
                    'S\'occupe des enfants',
                    'Synonyme de maman'
                ],
                'MIEL': [
                    'Produit par les abeilles',
                    'Très sucré',
                    'Doré et collant'
                ],
                'MIROIR': [
                    'Reflète l\'image',
                    'Surface réfléchissante',
                    'Pour se regarder'
                ],
                'MOITIE': [
                    'Une des deux parts égales',
                    'Divise en deux',
                    '50% du total'
                ],
                'MONDE': [
                    'La planète Terre',
                    'L\'ensemble des humains',
                    'Notre environnement global'
                ],
                'NEIGE': [
                    'Tombe en hiver',
                    'Blanche et froide',
                    'Pour faire des bonhommes'
                ],
                'NEZ': [
                    'Pour sentir les odeurs',
                    'Au milieu du visage',
                    'Peut être bouché'
                ],
                'NOMBRIL': [
                    'Au milieu du ventre',
                    'Trace de naissance',
                    'Marque de la naissance'
                ],
                'NUIT': [
                    'Période sombre',
                    'Moment de dormir',
                    'Opposé du jour'
                ],
                'OEUF': [
                    'Pondu par les poules',
                    'Coquille fragile',
                    'Pour faire une omelette'
                ],
                'OISEAU': [
                    'Animal qui vole',
                    'A des plumes',
                    'Fait son nid'
                ],
                'ORANGE': [
                    'Fruit rond',
                    'Couleur du fruit',
                    'Plein de vitamine C'
                ],
                'PAIN': [
                    'Aliment de base',
                    'Fait par le boulanger',
                    'Croustillant et doré'
                ],
                'PAPA': [
                    'Parent masculin',
                    'Le père de famille',
                    'Mari de maman'
                ],
                'PECHE': [
                    'Fruit doux et juteux',
                    'Peau duveteuse',
                    'Fruit d\'été'
                ],
                'PERE': [
                    'Parent masculin',
                    'Chef de famille',
                    'Synonyme de papa'
                ],
                'PHOTO': [
                    'Image capturée',
                    'Souvenir figé',
                    'Prise avec un appareil'
                ],
                'PIANO': [
                    'Instrument de musique',
                    'A des touches noires et blanches',
                    'Grand instrument à cordes'
                ],
                'PLAGE': [
                    'Bord de mer',
                    'Sable et vagues',
                    'Pour bronzer en été'
                ],
                'PLUIE': [
                    'Tombe du ciel',
                    'Mouille la terre',
                    'Fait pousser les plantes'
                ],
                'POISSON': [
                    'Vit dans l\'eau',
                    'A des écailles',
                    'Nage avec des nageoires'
                ],
                'PORTE': [
                    'S\'ouvre et se ferme',
                    'Permet d\'entrer et sortir',
                    'Nécessite une clé parfois'
                ],
                'PYJAMAS': [
                    'Vêtement de nuit',
                    'Pour dormir confortablement',
                    'Tenue de chambre'
                ],
                'REVE': [
                    'Pendant le sommeil',
                    'Histoire dans notre tête',
                    'Peut être agréable ou effrayant'
                ],
                'RIRE': [
                    'Expression de joie',
                    'Fait du bien au moral',
                    'Son joyeux et contagieux'
                ],
                'RUE': [
                    'Voie de circulation',
                    'Entre les maisons',
                    'Les voitures y passent'
                ],
                'SAVON': [
                    'Pour se laver',
                    'Fait de la mousse',
                    'Produit d\'hygiène'
                ],
                'SOLEIL': [
                    'Astre du jour',
                    'Source de chaleur',
                    'Brille dans le ciel'
                ],
                'SOURIRE': [
                    'Expression du visage',
                    'Montre la joie',
                    'Avec les lèvres'
                ],
                'SOURIS': [
                    'Petit rongeur',
                    'Aime le fromage',
                    'Peur des chats'
                ],
                'SUCRE': [
                    'Goût doux',
                    'Dans le café',
                    'Blanc et cristallisé'
                ],
                'TABLE': [
                    'Meuble à manger',
                    'Pour poser des objets',
                    'A plusieurs pieds'
                ],
                'TASSE': [
                    'Pour boire',
                    'Contient des boissons chaudes',
                    'Souvent avec une anse'
                ],
                'TIGRE': [
                    'Félin rayé',
                    'Grand chat sauvage',
                    'Prédateur orange et noir'
                ],
                'TRAIN': [
                    'Transport sur rails',
                    'Long véhicule',
                    'A une locomotive'
                ],
                'TROUSSE': [
                    'Pour ranger les stylos',
                    'Accessoire scolaire',
                    'Contient le matériel'
                ],
                'VACHE': [
                    'Animal de la ferme',
                    'Donne du lait',
                    'Fait meuh'
                ],
                'VELO': [
                    'Deux roues',
                    'Transport à pédales',
                    'Pour faire du sport'
                ],
                'VENT': [
                    'Déplace l\'air',
                    'Fait bouger les feuilles',
                    'Peut être fort ou doux'
                ],
                'VILLE': [
                    'Grande agglomération',
                    'Beaucoup d\'habitants',
                    'Opposé de campagne'
                ],
                'VOITURE': [
                    'Véhicule à quatre roues',
                    'Transport motorisé',
                    'Sur la route'
                ]
            },
            intermediaire: {
                'AMICAL': [
                    'Qualifie une bonne relation',
                    'Synonyme de sympathique',
                    'Comportement bienveillant envers les autres'
                ],
                'AVENTURE': [
                    'Expérience excitante',
                    'Peut être dangereuse ou mystérieuse',
                    'Les explorateurs en vivent beaucoup'
                ],
                'BIBLIOTHEQUE': [
                    'Lieu rempli de savoir',
                    'On y trouve des milliers de livres',
                    'Endroit silencieux pour étudier'
                ],
                'BICYCLETTE': [
                    'Véhicule à deux roues',
                    'Propulsé par les jambes',
                    'Écologique et bon pour la santé'
                ],
                'BRODERIE': [
                    'Art du fil et de l\'aiguille',
                    'Décore les tissus',
                    'Création de motifs sur du tissu'
                ],
                'CASCADE': [
                    'Chute d\'eau naturelle',
                    'Fait beaucoup de bruit',
                    'On en trouve en montagne'
                ],
                'CELEBRATION': [
                    'Moment de fête',
                    'Marque un événement important',
                    'Occasion de se réunir et se réjouir'
                ],
                'CHARISME': [
                    'Qualité naturelle d\'attraction',
                    'Les leaders en ont souvent',
                    'Pouvoir de séduction et d\'influence'
                ],
                'CLARINETTE': [
                    'Instrument de musique',
                    'Fait partie des bois',
                    'Instrument à anche simple'
                ],
                'COMPLICITE': [
                    'Relation étroite',
                    'Entente parfaite',
                    'Partage de secrets et de moments'
                ],
                'COURAGE': [
                    'Force morale',
                    'Permet d\'affronter les dangers',
                    'Qualité des héros'
                ],
                'COURONNE': [
                    'Symbole royal',
                    'Cercle précieux',
                    'Portée sur la tête des monarques'
                ],
                'DYNAMIQUE': [
                    'Plein d\'énergie',
                    'Toujours en mouvement',
                    'Opposé à statique'
                ],
                'ECLIPSE': [
                    'Phénomène céleste',
                    'Cache temporairement un astre',
                    'Peut être solaire ou lunaire'
                ],
                'ENCHANTEMENT': [
                    'État de bonheur intense',
                    'Comme dans un conte de fées',
                    'Sensation magique'
                ],
                'ENERGIE': [
                    'Source de force',
                    'Nécessaire pour agir',
                    'Peut être renouvelable'
                ],
                'ENIGMATIQUE': [
                    'Difficile à comprendre',
                    'Plein de mystère',
                    'Caractère mystérieux et intriguant'
                ],
                'EQUILIBRE': [
                    'État de stabilité',
                    'Ni trop, ni trop peu',
                    'Important pour ne pas tomber'
                ],
                'ETINCELLE': [
                    'Petite lumière brève',
                    'Jaillit du feu',
                    'Peut démarrer un incendie'
                ],
                'FANTOME': [
                    'Esprit qui fait peur',
                    'Apparaît souvent la nuit',
                    'Est transparent selon les légendes'
                ],
                'HARMONIE': [
                    'Accord parfait',
                    'Belle combinaison',
                    'Crée une sensation agréable'
                ],
                'HORIZON': [
                    'Ligne au loin',
                    'Où le ciel touche la terre',
                    'Semble impossible à atteindre'
                ],
                'MYSTERE': [
                    'Chose inexpliquée',
                    'Intrigue les détectives',
                    'Demande à être résolu'
                ],
                'MELODIE': [
                    'Suite de notes musicales',
                    'Agréable à l\'oreille',
                    'On peut la siffler ou la chanter'
                ],
                'MIRACLE': [
                    'Événement extraordinaire',
                    'Semble impossible',
                    'Considéré comme divin'
                ],
                'SCINTILLANT': [
                    'Brille de mille feux',
                    'Comme les étoiles',
                    'Effet brillant et intermittent'
                ],
                'EBULLITION': [
                    'Phénomène de chaleur',
                    'L\'eau �� 100 degrés',
                    'Formation de bulles'
                ],
                'ENDURANCE': [
                    'Capacité physique',
                    'Résistance à l\'effort',
                    'Qualité des marathoniens'
                ],
                'EPANOUIR': [
                    'Se développer pleinement',
                    'S\'ouvrir comme une fleur',
                    'Atteindre le bien-être'
                ],
                'ESCARGOT': [
                    'Animal très lent',
                    'Porte sa maison',
                    'Laisse une trace brillante'
                ],
                'EXPLOITATION': [
                    'Utilisation de ressources',
                    'Mise en valeur',
                    'Travail d\'une terre ou d\'une mine'
                ],
                'FORGERON': [
                    'Travaille le métal',
                    'Utilise une forge',
                    'Fabrique des objets en fer'
                ],
                'FOUDRE': [
                    'Éclair dans le ciel',
                    'Pendant l\'orage',
                    'Phénomène électrique naturel'
                ],
                'FOURMIS': [
                    'Insectes sociaux',
                    'Vivent en colonie',
                    'Travailleuses infatigables'
                ],
                'FRAGILE': [
                    'Facilement cassable',
                    'À manipuler avec soin',
                    'Comme du verre'
                ],
                'GIROUETTE': [
                    'Indique le vent',
                    'Tourne sur les toits',
                    'Montre la direction'
                ],
                'GRAMMAIRE': [
                    'Règles du langage',
                    'Structure d\'une langue',
                    'Pour bien écrire'
                ],
                'HELICE': [
                    'Fait tourner',
                    'Sur les bateaux ou avions',
                    'Propulse dans l\'air ou l\'eau'
                ],
                'LANTERNES': [
                    'Sources de lumière',
                    'Éclairage portable',
                    'Pour voir dans la nuit'
                ],
                'LIBERTE': [
                    'Pouvoir de choisir',
                    'Sans contrainte',
                    'Droit fondamental'
                ],
                'MACARON': [
                    'Pâtisserie française',
                    'Petit gâteau rond',
                    'Existe en plusieurs couleurs'
                ],
                'MAREE': [
                    'Mouvement de la mer',
                    'Monte et descend',
                    'Influencée par la lune'
                ],
                'MONTAGNE': [
                    'Grande élévation naturelle',
                    'Sommet enneigé',
                    'Pour faire du ski'
                ],
                'NUAGE': [
                    'Formation dans le ciel',
                    'Apporte la pluie',
                    'Masse d\'eau en altitude'
                ],
                'OMBRE': [
                    'Absence de lumière',
                    'Suit nos mouvements',
                    'Projection sombre'
                ],
                'OMBRELLE': [
                    'Protection du soleil',
                    'Petit parasol',
                    'Accessoire ��légant'
                ],
                'PALISSADE': [
                    'Clôture en bois',
                    'Sépare les jardins',
                    'Barrière protectrice'
                ],
                'PARASOL': [
                    'Protection solaire',
                    'Grand parapluie d\'été',
                    'À la plage ou au jardin'
                ],
                'PENDENTIF': [
                    'Bijou qui pend',
                    'Porté au cou',
                    'Attaché à une chaîne'
                ],
                'PENINSULE': [
                    'Terre dans la mer',
                    'Presque une île',
                    'Entourée d\'eau sur trois côtés'
                ],
                'PHARE': [
                    'Tour lumineuse',
                    'Guide les bateaux',
                    'Lumière pour les marins'
                ],
                'PIETON': [
                    'Se déplace à pied',
                    'Utilise les passages protégés',
                    'Marche sur le trottoir'
                ],
                'PIRATE': [
                    'Bandit des mers',
                    'Cherche des trésors',
                    'A un perroquet sur l\'épaule'
                ],
                'PIVERT': [
                    'Oiseau tapeur',
                    'Fait des trous dans les arbres',
                    'Son bec est comme un marteau'
                ],
                'PLASTRON': [
                    'Protection du torse',
                    'Partie d\'une armure',
                    'Protège la poitrine'
                ],
                'PLOMBIER': [
                    'Répare les fuites',
                    'Travaille avec les tuyaux',
                    'S\'occupe de la plomberie'
                ],
                'PLONGEE': [
                    'Sport aquatique',
                    'Sous l\'eau',
                    'Avec des bouteilles d\'oxygène'
                ],
                'PLUME': [
                    'Vient des oiseaux',
                    'Légère comme l\'air',
                    'Pour écrire autrefois'
                ],
                'POESIE': [
                    'Art des mots',
                    'Forme d\'écriture rythmée',
                    'Peut rimer'
                ],
                'POIGNARD': [
                    'Arme blanche',
                    'Petite dague',
                    'Lame courte et pointue'
                ],
                'PRISON': [
                    'Lieu d\'enfermement',
                    'Pour les criminels',
                    'Derrière les barreaux'
                ],
                'PROGRES': [
                    'Avance positive',
                    'Amélioration',
                    'Evolution favorable'
                ],
                'PROMENADE': [
                    'Marche de détente',
                    'Pour prendre l\'air',
                    'Activité de loisir'
                ],
                'PYRAMIDE': [
                    'Monument égyptien',
                    'Forme triangulaire',
                    'Tombe des pharaons'
                ],
                'REFUGE': [
                    'Abri protecteur',
                    'Lieu sûr',
                    'Pour se mettre à l\'abri'
                ],
                'REVOLUTION': [
                    'Grand changement',
                    'Bouleversement total',
                    'Transformation radicale'
                ],
                'RIVIERE': [
                    'Cours d\'eau naturel',
                    'Plus petit qu\'un fleuve',
                    'Coule vers une autre rivière'
                ],
                'RUCHE': [
                    'Maison des abeilles',
                    'Produit du miel',
                    'Abrite une colonie'
                ],
                'SECRETS': [
                    'À ne pas révéler',
                    'Information cachée',
                    'Doit rester confidentiel'
                ],
                'SERPENT': [
                    'Reptile sans pattes',
                    'Rampe sur le sol',
                    'Peut être venimeux'
                ],
                'SIRENE': [
                    'Créature mythologique',
                    'Moitié femme, moitié poisson',
                    'Chante pour les marins'
                ],
                'SOLITUDE': [
                    'État d\'isolement',
                    'Être seul',
                    'Loin des autres'
                ],
                'SOMNAMBULE': [
                    'Marche en dormant',
                    'Se déplace la nuit',
                    'Ne se souvient de rien'
                ],
                'SQUELETTE': [
                    'Structure osseuse',
                    'Ensemble des os',
                    'Soutient le corps'
                ],
                'SYMPHONIE': [
                    'Grande œuvre musicale',
                    'Pour orchestre complet',
                    'Composition en plusieurs mouvements'
                ],
                'SYNESTHESIE': [
                    'Mélange des sens',
                    'Perception croisée',
                    'Voir les sons ou goûter les couleurs'
                ],
                'TELESCOPE': [
                    'Instrument d\'observation',
                    'Pour voir les étoiles',
                    'Grossit les objets lointains'
                ],
                'TENEBRES': [
                    'Obscurité profonde',
                    'Absence totale de lumière',
                    'Noir complet'
                ],
                'TOURNESOL': [
                    'Fleur jaune',
                    'Suit le soleil',
                    'Donne des graines'
                ],
                'TRIOMPHE': [
                    'Grande victoire',
                    'Succès éclatant',
                    'Réussite totale'
                ],
                'VAMPIRE': [
                    'Créature nocturne',
                    'Boit du sang',
                    'Craint l\'ail et le soleil'
                ],
                'VELOURS': [
                    'Tissu doux',
                    'Surface moelleuse',
                    'Étoffe de luxe'
                ],
                'VERTIGE': [
                    'Sensation de tournis',
                    'Peur du vide',
                    'Perte d\'équilibre'
                ],
                'VESTIGE': [
                    'Reste du passé',
                    'Trace ancienne',
                    'Ruine historique'
                ],
                'VIRTUOSE': [
                    'Expert dans son art',
                    'Maître de sa technique',
                    'Talent exceptionnel'
                ],
                'VOLCAN': [
                    'Montagne qui crache du feu',
                    'Éruption de lave',
                    'Force de la nature'
                ],
                'ZEPHYR': [
                    'Vent doux',
                    'Brise légère',
                    'Souffle agréable'
                ]
            },
            impossible: {
                'ANTICONSTITUTIONNELLEMENT': [
                    'En opposition aux lois fondamentales',
                    'Plus long adverbe de la langue française',
                    'Contre les principes de la constitution'
                ],
                'HEXAKOSIOIHEXEKONTAHEXAPHOBIE': [
                    'Peur pathologique d\'un nombre',
                    'Crainte maladive du chiffre 666',
                    'Composé de racines grecques signifiant 600-60-6'
                ],
                'HIPPOPOTOMONSTROSESQUIPPEDALIOPHOBIE': [
                    'Peur irrationelle des longs mots',
                    'Paradoxalement, le mot qui décrit cette peur est très long',
                    'La plus longue phobie répertoriée'
                ],
                'OTORHINOLARYNGOLOGISTE': [
                    'Spécialiste ORL',
                    'Médecin des oreilles, du nez et de la gorge',
                    'Aussi appelé ORL'
                ],
                'PARALLELEPIPEDE': [
                    'Solide à six faces parallèles deux à deux',
                    'Comme un cube qui aurait été étiré',
                    'Figure géométrique en 3D à angles droits'
                ],
                'SPECTROPHOTOMETRIE': [
                    'Analyse de la lumière par longueur d\'onde',
                    'Mesure précise des couleurs et de leur intensité',
                    'Technique d\'analyse chimique par la lumière'
                ],
                'THYROIDECTOMIE': [
                    'Ablation chirurgicale d\'une glande du cou',
                    'Opération de la thyroïde',
                    'Retrait total ou partiel d\'une glande endocrine'
                ],
                'ULTRAMICROSCOPIQUE': [
                    'Plus petit que microscopique',
                    'Invisible même avec un microscope ordinaire',
                    'Nécessite des instruments très puissants pour être observé'
                ],
                'XERODERME': [
                    'Maladie génétique de la peau',
                    'Hypersensibilité aux rayons UV',
                    'Provoque une sécheresse cutanée extrême'
                ],
                'ZEPPELIN': [
                    'Dirigeable rigide allemand',
                    'Célèbre ballon dirigeable du début du 20e siècle',
                    'Inventé par le comte Ferdinand von Zeppelin'
                ],
                'ZOOLOGIE': [
                    'Étude scientifique des animaux',
                    'Étude du règne animal',
                    'Branche de la biologie dédiée à la faune'
                ],
                'ZUGZWANG': [
                    'Terme d\'échecs',
                    'Situation où chaque coup possible est désavantageux',
                    'Le joueur est forcé de détériorer sa position'
                ],
                'ZYKLON': [
                    'Pesticide tristement c��lèbre',
                    'Composé chimique hautement toxique',
                    'Utilisé de manière tragique pendant la Seconde Guerre mondiale'
                ]
            }
        };

        this.hintsRemaining = 3;
        this.initHintButton();
        this.isModalOpen = false;
        this.initModal();

        // Initialisation des mots par défaut si le localStorage est vide
        this.initDefaultWords();
    }

    initDefaultWords() {
        if (!localStorage.getItem('hangmanWords')) {
            const defaultWords = [
                {
                    word: "javascript",
                    hint1: "Langage de programmation",
                    hint2: "Utilisé pour le web",
                    hint3: "Fonctionne dans le navigateur",
                    difficulty: "facile"
                },
                // Ajoutez d'autres mots par défaut si vous voulez
            ];
            localStorage.setItem('hangmanWords', JSON.stringify(defaultWords));
        }
    }

    initModal() {
        const addButton = document.querySelector('.add-btn');
        const modal = document.getElementById('addWordModal');
        const closeBtn = document.querySelector('.modal .close');
        const form = document.getElementById('addWordForm');

        addButton.addEventListener('click', () => {
            modal.style.display = 'block';
            this.isModalOpen = true;
        });

        form.onsubmit = (e) => {
            e.preventDefault();
            
            // Création du nouvel objet mot
            const newWord = {
                word: document.getElementById('newWord').value.toLowerCase(),
                hint1: document.getElementById('hint1').value,
                hint2: document.getElementById('hint2').value,
                hint3: document.getElementById('hint3').value,
                difficulty: document.getElementById('difficulty').value.toLowerCase()
            };

            // Récupération des mots existants
            let words = [];
            try {
                words = JSON.parse(localStorage.getItem('hangmanWords')) || [];
            } catch (e) {
                words = [];
            }

            // Ajout du nouveau mot
            words.push(newWord);

            // Sauvegarde dans le localStorage
            try {
                localStorage.setItem('hangmanWords', JSON.stringify(words));
                alert('Mot ajouté avec succès!');
                form.reset();
                modal.style.display = 'none';
                this.isModalOpen = false;
            } catch (e) {
                alert('Erreur lors de la sauvegarde du mot');
                console.error(e);
            }
        };

        // Fermeture de la modal
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            this.isModalOpen = false;
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                this.isModalOpen = false;
            }
        };
    }

    async getRandomWord() {
        try {
            const words = JSON.parse(localStorage.getItem('hangmanWords')) || [];
            const filteredWords = words.filter(word => 
                word.difficulty === this.currentDifficulty.toLowerCase()
            );

            if (filteredWords.length === 0) {
                throw new Error(`Aucun mot disponible pour la difficulté ${this.currentDifficulty}`);
            }

            const randomIndex = Math.floor(Math.random() * filteredWords.length);
            return filteredWords[randomIndex];
        } catch (error) {
            console.error('Erreur lors de la récupération du mot:', error);
            return null;
        }
    }
}

// Initialisation du jeu
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});
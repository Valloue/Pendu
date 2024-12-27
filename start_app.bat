@echo off
chcp 65001 > nul
echo ====================================
echo    Démarrage de l'application AppManu
echo ====================================
echo.

:: Vérifier si Node.js est installé
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Node.js n'est pas installé. Veuillez installer Node.js pour continuer.
    echo Téléchargez Node.js sur : https://nodejs.org/
    pause
    exit
)

:: Vérifier si les dépendances sont installées
if not exist node_modules\ (
    echo [INFO] Installation des dépendances...
    npm install
)

:: Définir les variables pour le serveur
set PORT=3000
set URL=http://localhost:%PORT%

:server_loop
cls
echo [INFO] Démarrage du serveur...
echo [INFO] L'application sera accessible sur %URL%
echo.
echo Options disponibles :
echo  Q - Quitter le serveur
echo  R - Redemarrer le serveur
echo  N - Ouvrir dans le navigateur
echo  H - Afficher l'aide
echo  L - Voir les logs
echo  C - Nettoyer le cache
echo  D - Mode developpement (avec logs en direct)
echo  I - Informations systeme
echo ====================================
echo.

start /B node server.js > server.log 2>&1

:input_loop
choice /C QRNHLCDI /N /M "Entrez votre choix (Q/R/N/H/L/C/D/I) : "
if errorlevel 8 (
    cls
    echo ====================================
    echo       INFORMATIONS SYSTÈME
    echo ====================================
    echo Version Node.js :
    node --version
    echo.
    echo Version NPM :
    npm --version
    echo.
    echo Espace disque disponible :
    wmic logicaldisk get size,freespace,caption
    echo.
    echo Mémoire système :
    wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Value
    echo.
    echo Appuyez sur une touche pour revenir au menu...
    pause > nul
    goto server_loop
) else if errorlevel 7 (
    cls
    echo [INFO] Démarrage en mode développement...
    taskkill /F /IM node.exe > nul 2>&1
    start /B node server.js
    goto input_loop
) else if errorlevel 6 (
    cls
    echo [INFO] Nettoyage du cache...
    if exist node_modules\ (
        rmdir /S /Q node_modules
        echo [INFO] Réinstallation des dépendances...
        npm install
    )
    if exist .cache\ rmdir /S /Q .cache
    if exist server.log del /F /Q server.log
    echo [INFO] Cache nettoyé
    echo.
    echo Appuyez sur une touche pour redémarrer le serveur...
    pause > nul
    goto server_loop
) else if errorlevel 5 (
    cls
    type server.log
    echo.
    echo Appuyez sur une touche pour revenir au menu...
    pause > nul
    goto server_loop
) else if errorlevel 4 (
    cls
    echo ====================================
    echo              AIDE
    echo ====================================
    echo  Q - Quitter le serveur et fermer l'application
    echo  R - Redémarrer le serveur
    echo  N - Ouvrir l'application dans le navigateur par défaut
    echo  H - Afficher cette aide
    echo  L - Afficher les logs du serveur
    echo  C - Nettoyer le cache et les dépendances
    echo  D - Mode développement avec logs en direct
    echo  I - Afficher les informations système
    echo.
    echo Appuyez sur une touche pour revenir au menu...
    pause > nul
    goto server_loop
) else if errorlevel 3 (
    start %URL%
    goto input_loop
) else if errorlevel 2 (
    taskkill /F /IM node.exe > nul 2>&1
    goto server_loop
) else if errorlevel 1 (
    taskkill /F /IM node.exe > nul 2>&1
    echo.
    echo [INFO] Serveur arrêté
    echo.
    exit
)

goto input_loop

pause
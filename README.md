# WebComponent

## Aperçu du Projet
Le projet combine un générateur de logo interactif avec un lecteur audio doté d'un visualiseur. Les utilisateurs peuvent personnaliser le logo en modifiant le texte, les couleurs, les polices, les formes, et plus encore. Le lecteur audio permet de charger un fichier audio, de contrôler la lecture, le volume, la vitesse, et affiche un visualiseur qui interagit avec le logo.

## Fonctionnalités
### Générateur de Logo
* Texte Personnalisable : Modifiez le texte du logo.
* Couleur du Texte : Choisissez la couleur du texte.
* Taille du Texte : Ajustez la taille du texte.
* Police du Texte : Sélectionnez parmi plusieurs polices.
* Formes de Fond :
  * Rectangle (par défaut)
  * Cercle
  * Hexagone
* Couleur de la Forme : Choisissez la couleur de la forme de fond.
* Options d'Ombrage du Texte :
  * Couleur de l'ombre
  * Décalage X et Y
  * Rayon de flou
* Importer une Image de Fond : Utilisez une image comme fond pour le logo.
* Effets d'Animation :
  * Aucun
  * Zoom progressif
  * Rotation
  * Effet de rebond
  * Apparition par fade
  * Effet de frappe
  * Défilement de texte
* Bordure du Texte :
  * Couleur de la bordure
  * Épaisseur de la bordure
* Position du Logo :
  * Centre
  * Haut
  * Bas
  * Gauche
  * Droite
  
### Lecteur Audio Augmenté
* Chargement de Fichier Audio : Chargez un fichier audio depuis votre ordinateur.
* Contrôles de Lecture :
  * Lecture
  * Pause
  * Arrêt (remet au début)
* Contrôle du Volume : Ajustez le volume de l'audio.
* Réglage de la Vitesse : Ajustez la vitesse de lecture de 0.5x à 2.0x.
* Visualiseur Audio :
  * Visualiseur circulaire réactif au rythme de la musique.
  * Intégré avec le logo généré.
* Position du Visualiseur :
  * Autour (le visualiseur entoure le logo)
  * À l'intérieur (le visualiseur est à l'intérieur de la forme)
* Synchronisation avec le Logo : Le visualiseur s'adapte en fonction de la forme et de la position du logo.

## Installation
1. Cloner le Répertoire : Téléchargez ou clonez le répertoire du projet sur votre machine locale.
2. Structure des Fichiers :
  * index.html : La page principale qui intègre les composants.
  * logo-generator.js : Le composant web personnalisé pour le générateur de logo.
  * audio-player.js : Le composant web personnalisé pour le lecteur audio augmenté.
  * style.css : Les styles CSS pour la mise en page et les composants.
  * Polices et Ressources : Les polices sont importées via des liens dans index.html.
3. Ouvrir le Fichier HTML : Ouvrez index.html dans un navigateur web

class LogoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Création des éléments
    const logoContainer = document.createElement('div');
    const shapeContainer = document.createElement('div');
    const backgroundShape = document.createElement('div');
    const textElement = document.createElement('h1');

    // Récupération des attributs initiaux
    const text = this.getAttribute('text') || 'Logo';
    const color = this.getAttribute('color') || '#000';
    const size = this.getAttribute('size') || '50';
    const font = this.getAttribute('font') || 'Roboto';
    const shape = this.getAttribute('shape') || 'rectangle';
    const shapeColor = this.getAttribute('shape-color') || '#ccc';

    // Attributs pour l'ombrage du texte
    const shadowColor = this.getAttribute('shadow-color') || '#000000';
    const shadowOffsetX = this.getAttribute('shadow-offset-x') || '0';
    const shadowOffsetY = this.getAttribute('shadow-offset-y') || '0';
    const shadowBlur = this.getAttribute('shadow-blur') || '0';

    // Attribut pour l'image de fond
    const backgroundImageSrc = this.getAttribute('background-image-src') || '';

    // Attribut pour l'effet d'animation
    const animationType = this.getAttribute('animation-type') || 'none';

    // Attributs pour la bordure du texte
    const borderColor = this.getAttribute('border-color') || '#000000';
    const borderWidth = this.getAttribute('border-width') || '0';

    // Attribut pour la position du logo
    const logoPosition = this.getAttribute('logo-position') || 'center';

    // Application des styles initiaux
    logoContainer.style.position = 'relative';
    logoContainer.style.display = 'flex';
    logoContainer.style.justifyContent = 'center';
    logoContainer.style.alignItems = 'center';
    logoContainer.style.width = '500px';
    logoContainer.style.height = '500px';
    logoContainer.style.margin = '0 auto';

    shapeContainer.style.position = 'relative';
    shapeContainer.style.width = '100%';
    shapeContainer.style.height = '100%';
    shapeContainer.style.display = 'flex';
    shapeContainer.style.justifyContent = 'center';
    shapeContainer.style.alignItems = 'center';
    shapeContainer.style.overflow = 'hidden';

    backgroundShape.id = 'background-shape';
    backgroundShape.style.position = 'absolute';
    backgroundShape.style.top = '0';
    backgroundShape.style.left = '0';
    backgroundShape.style.width = '100%';
    backgroundShape.style.height = '100%';
    backgroundShape.style.backgroundColor = shapeColor;
    backgroundShape.style.backgroundImage = backgroundImageSrc ? `url(${backgroundImageSrc})` : '';
    backgroundShape.style.backgroundSize = 'cover';
    backgroundShape.style.backgroundPosition = 'center';
    backgroundShape.style.backgroundRepeat = 'no-repeat';

    textElement.textContent = text;
    textElement.style.color = color;
    textElement.style.fontSize = `${size}px`;
    textElement.style.fontFamily = font;
    textElement.style.textAlign = 'center';
    textElement.style.margin = '0';
    textElement.style.position = 'relative';
    textElement.style.zIndex = '1';
    textElement.style.textShadow = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`;
    textElement.style.webkitTextStrokeColor = borderColor;
    textElement.style.webkitTextStrokeWidth = `${borderWidth}px`;

    // Positionnement du logo
    textElement.style.alignSelf = getPositionAlignment(logoPosition);

    // Ajout de la classe d'animation si nécessaire
    if (animationType !== 'none') {
      textElement.classList.add(animationType);
      // Gestion spéciale pour l'effet de frappe (typing)
      if (animationType === 'typing') {
        void textElement.offsetWidth;
      }
    }

    // Ajout des éléments au DOM
    shapeContainer.appendChild(backgroundShape);
    shapeContainer.appendChild(textElement);
    logoContainer.appendChild(shapeContainer);
    shadow.appendChild(logoContainer);

    // Styles spécifiques aux formes
    const style = document.createElement('style');
    style.textContent = `
      /* Styles pour le shapeContainer */
      .rectangle {
        /* Pas de style supplémentaire pour le rectangle */
        overflow: hidden;
      }
      .circle {
        border-radius: 50%;
        overflow: hidden;
      }
      .hexagon {
        clip-path: polygon(
          25% 5%,
          75% 5%,
          100% 50%,
          75% 95%,
          25% 95%,
          0% 50%
        );
        overflow: hidden;
      }

      /* Animations */
      /* ... (animations précédentes inchangées) */
    `;
    shadow.appendChild(style);

    // Application initiale des classes de forme
    shapeContainer.classList.add(shape);

    // Couleur de fond initiale ou image de fond
    backgroundShape.style.display = 'block';
    if (backgroundImageSrc) {
      backgroundShape.style.backgroundImage = `url(${backgroundImageSrc})`;
      backgroundShape.style.backgroundColor = 'transparent';
    } else {
      backgroundShape.style.backgroundColor = shapeColor;
      backgroundShape.style.backgroundImage = '';
    }
  }

  static get observedAttributes() {
    return [
      'text',
      'color',
      'size',
      'font',
      'shape',
      'shape-color',
      'shadow-color',
      'shadow-offset-x',
      'shadow-offset-y',
      'shadow-blur',
      'background-image-src',
      'animation-type',
      'border-color',
      'border-width',
      'logo-position',
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const shadow = this.shadowRoot;
    const textElement = shadow.querySelector('h1');
    const backgroundShape = shadow.querySelector('#background-shape');
    const shapeContainer = backgroundShape.parentElement;

    if (name === 'text') {
      textElement.textContent = newValue;
    } else if (name === 'color') {
      textElement.style.color = newValue;
    } else if (name === 'size') {
      textElement.style.fontSize = `${newValue}px`;
    } else if (name === 'font') {
      textElement.style.fontFamily = newValue;
    } else if (name === 'shape') {
      // Retirer les classes de forme précédentes
      shapeContainer.classList.remove('rectangle', 'circle', 'hexagon');
      shapeContainer.classList.add(newValue);
    } else if (name === 'shape-color') {
      if (!this.getAttribute('background-image-src')) {
        backgroundShape.style.backgroundColor = newValue;
      }
    }

    // Mise à jour de l'ombrage du texte
    else if (
      name === 'shadow-color' ||
      name === 'shadow-offset-x' ||
      name === 'shadow-offset-y' ||
      name === 'shadow-blur'
    ) {
      const shadowColor = this.getAttribute('shadow-color') || '#000000';
      const shadowOffsetX = this.getAttribute('shadow-offset-x') || '0';
      const shadowOffsetY = this.getAttribute('shadow-offset-y') || '0';
      const shadowBlur = this.getAttribute('shadow-blur') || '0';

      textElement.style.textShadow = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`;
    }

    // Mise à jour de l'image de fond
    else if (name === 'background-image-src') {
      if (newValue) {
        backgroundShape.style.backgroundImage = `url(${newValue})`;
        backgroundShape.style.backgroundColor = 'transparent';
      } else {
        backgroundShape.style.backgroundImage = '';
        backgroundShape.style.backgroundColor = this.getAttribute('shape-color') || '#ccc';
      }
    }

    // Mise à jour de l'effet d'animation
    else if (name === 'animation-type') {
      // Retirer toutes les classes d'animation
      textElement.classList.remove('zoom', 'rotation', 'bounce', 'fade', 'typing', 'scroll');

      if (newValue !== 'none') {
        textElement.classList.add(newValue);

        // Gestion spéciale pour l'effet de frappe (typing)
        if (newValue === 'typing') {
          // Réinitialiser le texte pour relancer l'animation
          void textElement.offsetWidth;
        }
      }
    }

    // Mise à jour de la bordure du texte
    else if (name === 'border-color') {
      textElement.style.webkitTextStrokeColor = newValue;
    } else if (name === 'border-width') {
      textElement.style.webkitTextStrokeWidth = `${newValue}px`;
    }

    // Mise à jour de la position du logo
    else if (name === 'logo-position') {
      textElement.style.alignSelf = getPositionAlignment(newValue);
    }
  }
}

function getPositionAlignment(position) {
  switch (position) {
    case 'top':
      return 'flex-start';
    case 'bottom':
      return 'flex-end';
    case 'left':
    case 'right':
    case 'center':
    default:
      return 'center';
  }
}

customElements.define('logo-generator', LogoGenerator);

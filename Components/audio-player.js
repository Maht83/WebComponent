class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Création des éléments
    this.audio = document.createElement('audio');
    this.visualizerContainer = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.canvasContext = this.canvas.getContext('2d');

    // Styles pour le visualiseur
    this.visualizerContainer.style.position = 'relative';
    this.visualizerContainer.style.width = '500px';
    this.visualizerContainer.style.height = '500px';
    this.visualizerContainer.style.margin = '0 auto';

    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';

    // Ajout des éléments au Shadow DOM
    this.visualizerContainer.appendChild(this.canvas);
    this.shadowRoot.appendChild(this.audio);
    this.shadowRoot.appendChild(this.visualizerContainer);

    // Configuration de l'API Web Audio pour la visualisation
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.source = null;
    this.dataArray = null;
    this.animationId = null;

    // Attributs
    this.shape = this.getAttribute('shape') || 'rectangle';
    this.logoPosition = this.getAttribute('logo-position') || 'center';
    this.visualizerPosition = this.getAttribute('visualizer-position') || 'around';

    // Liaison des méthodes
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.setPlaybackRate = this.setPlaybackRate.bind(this);
    this.animate = this.animate.bind(this);
  }

  static get observedAttributes() {
    return ['src', 'shape', 'logo-position', 'visualizer-position'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src') {
      this.loadAudio(newValue);
    } else if (name === 'shape') {
      this.shape = newValue;
    } else if (name === 'logo-position') {
      this.logoPosition = newValue;
    } else if (name === 'visualizer-position') {
      this.visualizerPosition = newValue;
    }
  }

  connectedCallback() {
    this.loadLogo();
  }

  loadAudio(src) {
    this.audio.src = src;
    this.audio.crossOrigin = "anonymous";
    this.audio.load();

    if (this.source) {
      this.source.disconnect();
    }

    // Création du MediaElementSource
    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 256;
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
  }

  loadLogo() {
    // Charger le logo généré
    const logoElement = document.getElementById('logo');
    const logoClone = logoElement.cloneNode(true);

    // Copier le contenu du Shadow DOM
    const logoContent = logoElement.shadowRoot.cloneNode(true);

    // Supprimer le logo précédent s'il existe
    const existingLogo = this.shadowRoot.querySelector('logo-generator');
    if (existingLogo) {
      existingLogo.remove();
    }

    // Insérer le logo dans le visualiseur
    const logoContainer = document.createElement('div');
    logoContainer.style.position = 'absolute';
    logoContainer.style.top = '0';
    logoContainer.style.left = '0';
    logoContainer.style.width = '100%';
    logoContainer.style.height = '100%';
    logoContainer.style.display = 'flex';
    logoContainer.style.justifyContent = 'center';
    logoContainer.style.alignItems = 'center';
    logoContainer.style.zIndex = '1';

    // Appliquer la position du logo
    logoContainer.style.alignItems = getPositionAlignment(this.logoPosition);

    logoContainer.attachShadow({ mode: 'open' }).appendChild(logoContent);

    this.visualizerContainer.appendChild(logoContainer);
  }

  playAudio() {
    this.audio.play();
    this.audioContext.resume();
    this.animate();
  }

  pauseAudio() {
    this.audio.pause();
    cancelAnimationFrame(this.animationId);
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
    cancelAnimationFrame(this.animationId);
    this.clearCanvas();
  }

  setVolume(value) {
    this.audio.volume = value;
  }

  setPlaybackRate(value) {
    this.audio.playbackRate = value;
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate);

    this.analyser.getByteFrequencyData(this.dataArray);

    const ctx = this.canvasContext;
    const width = this.canvas.width;
    const height = this.canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (this.shape === 'circle' && this.visualizerPosition === 'around') {
      // Visualiseur autour du cercle (comme Trap Nation)
      this.drawCircularVisualizer(ctx, width / 2, height / 2, 150);
    } else {
      // Visualiseur circulaire à l'intérieur du rectangle (comme NCS)
      this.drawCircularVisualizer(ctx, width / 2, height / 2, 150);
    }
  }

  drawCircularVisualizer(ctx, centerX, centerY, radius) {
    const barCount = this.dataArray.length;
    const step = (Math.PI * 2) / barCount;

    for (let i = 0; i < barCount; i++) {
      const amplitude = this.dataArray[i] / 255;
      const barHeight = amplitude * 50;

      const angle = step * i;
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      ctx.strokeStyle = `rgb(${this.dataArray[i]}, 50, 255)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  clearCanvas() {
    const ctx = this.canvasContext;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

customElements.define('audio-player', AudioPlayer);

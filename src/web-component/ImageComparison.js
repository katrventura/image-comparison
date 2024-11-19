class ImageComparison extends HTMLElement {
  constructor() {
    super();
    
    // Define observed attributes
    this.beforeImgSrc = '';
    this.afterImgSrc = '';
    this.beforeImgLabel = '';
    this.afterImgLabel = '';
  }

  static get observedAttributes() {
    return ['before-img', 'after-img', 'before-label', 'after-label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'before-img':
        this.beforeImgSrc = newValue;
        break;
      case 'after-img':
        this.afterImgSrc = newValue;
        break;
      case 'before-label':
        this.beforeImgLabel = newValue;
        break;
      case 'after-label':
        this.afterImgLabel = newValue;
        break;
    }
    
    // If component is connected to DOM, update the template
    if (this.isConnected) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  render() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    shadow.innerHTML = `
      <style>
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .image-before, .image-after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .image-before {
          clip-path: inset(0 50% 0 0);
          transition: clip-path 0.1s ease-out;
        }

        .image-before img, .image-after img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .label {
          position: absolute;
          top: 1rem;
          padding: 0.5rem 1rem;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 4px;
        }

        .label-before {
          left: 1rem;
        }

        .label-after {
          right: 1rem;
        }

        .slider {
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 100%;
          background: white;
          transform: translateX(-50%);
          cursor: ew-resize;
        }

        .slider-button {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      </style>

      <div class="image-container">
        <div class="image-before">
          <img src="${this.beforeImgSrc}" alt="Before">
          <div class="label label-before">${this.beforeImgLabel}</div>
        </div>
        <div class="image-after">
          <img src="${this.afterImgSrc}" alt="After">
          <div class="label label-after">${this.afterImgLabel}</div>
        </div>
        <div class="slider">
          <div class="slider-button">⇄</div>
        </div>
      </div>
    `;
  }

  setupEvents() {
    const root = this.shadowRoot;
    const container = root.querySelector('.image-container');
    const before = root.querySelector('.image-before');
    const slider = root.querySelector('.slider');
    let isDragging = false;

    const calculatePos = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
      
      before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      slider.style.left = `${pos}%`;
    };

    slider.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) calculatePos(e);
    });
    window.addEventListener('mouseup', () => isDragging = false);

    // Touch events
    slider.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchmove', (e) => {
      if (isDragging) calculatePos(e.touches[0]);
    });
    window.addEventListener('touchend', () => isDragging = false);
  }
}

// Register the web component
customElements.define('image-comparison', ImageComparison);
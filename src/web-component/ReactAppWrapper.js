import { initApp } from '../react-app';
class ReactAppWrapper extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    initApp(shadow);
  }
}

customElements.define('react-app-wrapper', ReactAppWrapper);
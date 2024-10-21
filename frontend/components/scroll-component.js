import { setupScrollEvents } from "../js/scroll-events.js";

class ScrollComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a href="#" id="scrollToTop" class="scroll-to-top">
        <i class="fa-solid fa-circle-up"></i>
      </a>
    `;

    setupScrollEvents(this);
  }
}
customElements.define("scroll-component", ScrollComponent);

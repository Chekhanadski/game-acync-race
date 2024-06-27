import './style.css';

export default class Button {
  private buttonElement: HTMLButtonElement;

  private text: string;

  private onClick: (event: MouseEvent) => void;

  constructor(
    text: string,
    onClick: (event: MouseEvent) => void,
    width?: string,
  ) {
    this.text = text;
    this.onClick = onClick;
    this.buttonElement = document.createElement('button');
    this.buttonElement.className = 'button';
    if (width) {
      this.buttonElement.style.width = width;
    }
  }

  render(): HTMLButtonElement {
    this.buttonElement.innerText = this.text;
    this.buttonElement.onclick = (event: MouseEvent) => {
      event.preventDefault();
      this.onClick(event);
    };
    return this.buttonElement;
  }

  disable() {
    this.buttonElement.disabled = true;
  }

  enable() {
    this.buttonElement.disabled = false;
  }
}

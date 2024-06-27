// App.ts
import Garage from '../components/Garage/Garage';
import Winners from '../components/Winners/Winners';
import './style.css';

export default class App {
  private garage: Garage;

  private winners: Winners;

  private appElement: HTMLElement;

  private button: HTMLButtonElement;

  public currentPageGarage: number;

  public currentPageWinner: number;

  public inputCreateNameCarValue: string;

  public inputUpdateNameCarValue: string;

  public inputCreateColorCarValue: string;

  public inputUpdateColorCarValue: string;

  constructor() {
    this.currentPageGarage = 1;
    this.currentPageWinner = 1;
    this.inputCreateNameCarValue = '';
    this.inputUpdateNameCarValue = '';
    this.inputCreateColorCarValue = '';
    this.inputUpdateColorCarValue = '';

    this.garage = new Garage(this);
    this.winners = new Winners(this);

    this.appElement = document.createElement('div');
    this.appElement.id = 'app';

    this.button = document.createElement('button');
    this.button.className = 'button-page';
    this.button.textContent = 'to Winners';
    this.button.addEventListener('click', () => {
      if (this.button.textContent === 'to Garage') {
        this.navigate('garage');
        this.button.textContent = 'to Winners';
      } else {
        this.navigate('winners');
        this.button.textContent = 'to Garage';
      }
    });
    document.body.append(this.button);
    document.body.append(this.appElement);
  }

  navigate(view: string): void {
    let element: HTMLElement;
    switch (view) {
      case 'garage': {
        this.appElement.innerHTML = '';
        element = this.garage.render();
        break;
      }
      case 'winners': {
        this.appElement.innerHTML = '';
        element = this.winners.render();
        break;
      }
      default: {
        throw new Error('Unknown view');
      }
    }
    this.appElement.append(element);
  }
}

import './style.css';
import Button from '../Button/Button';
import {
  deleteCar,
  deleteWinner,
  driveCar,
  startStopCar,
} from '../../server/server';

export default class Car {
  private carWrapper: HTMLElement;

  private carControl!: HTMLElement;

  private nameCar!: HTMLElement;

  private carContainer!: HTMLElement;

  public carTrack!: HTMLElement;

  public flag!: HTMLElement;

  private name: string;

  private color: string;

  private id: number;

  private renderCars: () => void;

  private selectCarId: (prop: number) => void;

  private animation!: Animation;

  constructor(
    name: string,
    color: string,
    id: number,
    renderCars: () => void,
    selectCarId: (prop: number) => void,
  ) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.renderCars = renderCars;
    this.selectCarId = selectCarId;
    this.carWrapper = document.createElement('div');
    this.carWrapper.className = 'car-wrapper';
  }

  render() {
    this.carWrapper.innerHTML = '';

    this.carControl = document.createElement('div');
    this.carControl.className = 'car-control';
    this.carWrapper.append(this.carControl);

    const buttonSelect = new Button('Select', () => {
      this.selectCarId(this.id);
    });
    const buttonRemove = new Button('Remove', async () => {
      deleteCar(this.id).then((result) => {
        if (result) {
          this.renderCars();
        }
      });
      deleteWinner(this.id);
    });

    this.carControl.append(buttonSelect.render(), buttonRemove.render());
    this.nameCar = document.createElement('div');
    this.nameCar.className = 'name-car';
    this.nameCar.textContent = this.name;
    this.carControl.append(this.nameCar);

    this.carContainer = document.createElement('div');
    this.carContainer.className = 'car-container';
    this.carWrapper.append(this.carContainer);

    const buttonStart = new Button(
      'A',
      () => {
        buttonStart.disable();

        startStopCar(this.id, 'started').then((data) => {
          const screenWidth = window.innerWidth - 170;
          const duration = screenWidth / data.velocity;

          const arrayCars = document.querySelectorAll('.car-track');
          const currentCar = Array.from(arrayCars).find(
            (elem) => Number(elem.getAttribute('data-id')) === this.id,
          );

          if (currentCar) {
            const carImg = currentCar.querySelector('svg');
            if (carImg) {
              this.animation = carImg.animate(
                [
                  { transform: 'translateX(0px)' },
                  { transform: `translateX(${screenWidth}px)` },
                ],
                {
                  duration: duration * 1000,
                  iterations: 1,
                  easing: 'linear',
                  fill: 'forwards',
                },
              );

              this.animation.onfinish = () => {
                buttonStart.enable();
              };
            }
          }
        });

        driveCar(this.id, 'drive');
      },
      '30px',
    );

    const buttonStop = new Button(
      'B',
      () => {
        startStopCar(this.id, 'stopped');
        if (this.animation) {
          this.animation.cancel();
        }
        buttonStart.enable();
      },
      '30px',
    );

    this.carContainer.append(buttonStart.render(), buttonStop.render());

    const svg = `<svg width="50" height="25" viewBox="0 0 800 379" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M640 120.42H541.305C533.508 108.964 501.134 70.0875 492.798 56.7531C492.728 56.6422 492.656 56.5297 492.584 56.4203C474.572 29.0687 439.986 0 411.369 0H240.42C212.031 0 177.766 28.6094 159.637 55.7688L132.148 90.3328C131.756 90.8266 131.391 91.3437 131.058 91.8766C125.797 100.278 103.252 120.42 78.6703 120.42H75.7906C33.9984 120.42 0 154.42 0 196.211V305.684C0 314.986 7.54063 322.527 16.8422 322.527H95.2812C108.133 355.506 140.212 378.947 177.684 378.947C215.156 378.947 247.236 355.506 260.087 322.528H548.334C561.184 355.506 593.264 378.947 630.736 378.947C668.208 378.947 700.287 355.506 713.139 322.528H783.156C792.458 322.528 799.998 314.988 799.998 305.686V280.423C800 192.197 728.223 120.42 640 120.42ZM411.369 33.6844C422.164 33.6844 447.513 49.3187 464.348 74.7906C473.864 89.9812 496.958 117.687 499.189 120.42H262.333C260.459 120.42 259.473 119.342 258.975 118.439C258.481 117.544 258.1 116.145 259.094 114.572C270.602 96.3422 313.586 39.5688 317.967 33.6813V33.6828L411.369 33.6844ZM177.684 345.262C147.503 345.262 122.947 320.706 122.947 290.525C122.947 260.344 147.503 235.787 177.684 235.787C207.866 235.787 232.422 260.344 232.422 290.525C232.42 320.708 207.866 345.262 177.684 345.262ZM630.737 345.262C600.556 345.262 576 320.706 576 290.525C576 260.344 600.556 235.787 630.737 235.787C660.919 235.787 685.475 260.344 685.475 290.525C685.473 320.708 660.917 345.262 630.737 345.262ZM766.316 288.842H719.116C718.211 240.864 678.928 202.105 630.736 202.105C582.544 202.105 543.261 240.864 542.356 288.844H266.062C265.887 279.533 264.269 270.575 261.416 262.177H422.316C431.617 262.177 439.158 254.636 439.158 245.334C439.158 236.033 431.617 228.492 422.316 228.492H241.684C241.341 228.492 241.005 228.522 240.666 228.544C224.617 212.238 202.316 202.105 177.684 202.105C129.492 202.105 90.2094 240.864 89.3047 288.844H33.6844V217.263H48C57.3016 217.263 64.8422 209.722 64.8422 200.42C64.8422 191.119 57.3016 183.578 48 183.578H35.6234C41.0031 166.514 56.9719 154.105 75.7906 154.105H78.6703C118.023 154.105 149.256 125.425 159.025 110.653L186.453 76.1656C186.767 75.7734 187.061 75.3641 187.338 74.9453C204.175 49.3812 229.603 33.6828 240.422 33.6828H275.794C260.131 54.3719 242.606 77.5875 230.611 96.5875C223.317 108.134 222.883 122.738 229.473 134.698C236.07 146.669 248.661 154.103 262.333 154.103H640C709.65 154.103 766.316 210.769 766.316 280.419V288.842Z" fill="currentColor"/>
    </svg>
    `;

    const svgFlag = `<svg width="30" height="46" viewBox="0 0 462 656" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 18.875V637.125" stroke="black" stroke-width="37.5" stroke-linecap="round"/>
    <path d="M19.5 61.5H435.25C436.421 61.4764 437.576 61.7824 438.581 62.3833C439.587 62.9841 440.404 63.8556 440.938 64.8981C441.472 65.9407 441.703 67.1125 441.603 68.2798C441.504 69.4471 441.078 70.5629 440.375 71.5L349.875 192.625C349.207 193.67 348.852 194.885 348.852 196.125C348.852 197.365 349.207 198.58 349.875 199.625L441.625 315.5C442.203 316.45 442.518 317.538 442.536 318.65C442.554 319.763 442.274 320.86 441.726 321.828C441.178 322.796 440.382 323.601 439.419 324.158C438.457 324.716 437.362 325.006 436.25 325H19.5" stroke="black" stroke-width="37.5"/>
    </svg>`;

    this.carTrack = document.createElement('div');
    this.carTrack.className = 'car-track';
    this.carTrack.setAttribute('data-id', this.id.toString());
    this.carTrack.innerHTML = svg;
    this.carContainer.append(this.carTrack);

    this.flag = document.createElement('div');
    this.flag.className = 'flag';
    this.flag.innerHTML = svgFlag;
    this.carContainer.append(this.flag);

    const carImg = this.carTrack.querySelector('svg');
    if (carImg) {
      carImg.style.color = this.color;
    }

    return this.carWrapper;
  }
}

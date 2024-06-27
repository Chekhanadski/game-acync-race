import App from '../../App/App';
import './style.css';
import Button from '../Button/Button';
import Car from '../Car/Car';
import {
  createCar,
  createWinner,
  driveCar,
  getCar,
  getCars,
  getWinner,
  startStopCar,
  updateCar,
  updateWinner,
} from '../../server/server';

interface CarProps {
  name: string;
  color: string;
  id: number;
}

export default class Garage {
  private garageWrapper: HTMLElement;

  private garageControlPanel!: HTMLElement;

  private formCreate!: HTMLElement;

  private inputCreateNameCar!: HTMLInputElement;

  private inputCreateColorCar!: HTMLInputElement;

  private buttonCreate!: HTMLElement;

  private formUpdate!: HTMLElement;

  private inputUpdateNameCar!: HTMLInputElement;

  private inputUpdateColorCar!: HTMLInputElement;

  private buttonUpdate!: HTMLElement;

  private buttonRace!: HTMLElement;

  private buttonReset!: HTMLElement;

  private buttonGenerateCars!: HTMLElement;

  private buttonPanel!: HTMLElement;

  private garageCars!: HTMLElement;

  private garageName!: HTMLElement;

  private garagePage!: HTMLElement;

  private selectCarId?: number;

  private cars: CarProps[];

  private pagingButtons!: HTMLElement;

  private app: App;

  private animationsArray: Animation[];

  constructor(app: App) {
    this.app = app;
    this.garageWrapper = document.createElement('div');
    this.garageWrapper.className = 'garage-wrapper';
    this.selectCarId;
    this.cars = [];
    this.animationsArray = [];
  }

  render() {
    this.garageWrapper.innerHTML = '';

    const renderCars = (currentPage?: number) => {
      this.garageCars.innerHTML = '';

      getCars(undefined, null).then((data) => {
        this.garageName.textContent = `Garage (${data.length})`;
      });

      getCars(currentPage || this.app.currentPageGarage).then((data) => {
        this.cars = data;
        this.cars.forEach((car) => {
          const newCar = new Car(
            car.name,
            car.color,
            car.id,
            renderCars,
            (id) => {
              this.selectCarId = id;
            },
          );
          this.garageCars.append(newCar.render());
        });
      });
    };

    this.garageControlPanel = document.createElement('div');
    this.garageControlPanel.className = 'garage-control-panel';
    this.garageWrapper.append(this.garageControlPanel);

    this.formCreate = document.createElement('form');
    this.formCreate.className = 'form-create';
    this.garageControlPanel.append(this.formCreate);

    this.inputCreateNameCar = document.createElement('input');
    this.inputCreateNameCar.className = 'input-create-name-car';
    this.inputCreateNameCar.setAttribute('type', 'text');
    this.inputCreateNameCar.value = this.app.inputCreateNameCarValue;
    this.inputCreateNameCar.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      this.app.inputCreateNameCarValue = target.value;
    };
    this.formCreate.append(this.inputCreateNameCar);

    this.inputCreateColorCar = document.createElement('input');
    this.inputCreateColorCar.className = 'input-create-color-car';
    this.inputCreateColorCar.setAttribute('type', 'color');
    this.inputCreateColorCar.value = this.app.inputCreateColorCarValue;
    this.inputCreateColorCar.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      this.app.inputCreateColorCarValue = target.value;
    };
    this.formCreate.append(this.inputCreateColorCar);

    const buttonCreate = new Button('Create', () => {
      createCar(this.inputCreateNameCar.value, this.inputCreateColorCar.value);
      this.inputCreateNameCar.value = '';
      this.inputCreateColorCar.value = '#000000';
      this.app.inputCreateNameCarValue = '';
      this.app.inputCreateColorCarValue = '#000000';
      renderCars();
    });

    this.formCreate.append(buttonCreate.render());

    this.formUpdate = document.createElement('form');
    this.formUpdate.className = 'form-update';
    this.garageControlPanel.append(this.formUpdate);

    this.inputUpdateNameCar = document.createElement('input');
    this.inputUpdateNameCar.className = 'input-update-name-car';
    this.inputUpdateNameCar.setAttribute('type', 'text');
    this.inputUpdateNameCar.value = this.app.inputUpdateNameCarValue;
    this.inputUpdateNameCar.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      this.app.inputUpdateNameCarValue = target.value;
    };
    this.formUpdate.append(this.inputUpdateNameCar);

    this.inputUpdateColorCar = document.createElement('input');
    this.inputUpdateColorCar.className = 'input-update-color-car';
    this.inputUpdateColorCar.setAttribute('type', 'color');
    this.inputUpdateColorCar.value = this.app.inputUpdateColorCarValue;
    this.inputUpdateColorCar.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      this.app.inputUpdateColorCarValue = target.value;
    };
    this.formUpdate.append(this.inputUpdateColorCar);

    const buttonUpdate = new Button('Update', () => {
      if (this.selectCarId) {
        updateCar(
          this.selectCarId,
          this.inputUpdateNameCar.value,
          this.inputUpdateColorCar.value,
        ).then((result) => {
          if (result.id) {
            this.inputUpdateNameCar.value = '';
            this.inputUpdateColorCar.value = '#000000';
            this.app.inputUpdateNameCarValue = '';
            this.app.inputUpdateColorCarValue = '#000000';
            renderCars();
          }
        });
      }
    });
    this.formUpdate.append(buttonUpdate.render());

    this.buttonPanel = document.createElement('div');
    this.buttonPanel.className = 'button-panel';
    this.garageControlPanel.append(this.buttonPanel);

    const buttonRace = new Button('Race', () => {
      buttonRace.disable();

      getCars(this.app.currentPageGarage).then((dataRace) => {
        const animations = dataRace.map((item: CarProps) =>
          startStopCar(item.id, 'started').then((data) => {
            const screenWidth = window.innerWidth - 170;
            const duration = screenWidth / data.velocity;

            const arrayCars = document.querySelectorAll('.car-track');
            const currentCar = Array.from(arrayCars).find(
              (elem) => Number(elem.getAttribute('data-id')) === item.id,
            );

            if (currentCar) {
              const carImg = currentCar.querySelector('svg');
              if (carImg) {
                const animation = carImg.animate(
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

                this.animationsArray.push(animation);

                return new Promise((resolve) => {
                  animation.onfinish = () =>
                    resolve({ id: item.id, velocity: data.velocity });
                  animation.oncancel = () =>
                    resolve({ id: item.id, velocity: data.velocity });
                });
              }
            }
            return null;
          }),
        );

        Promise.all(animations).then(() => {
          buttonRace.enable();
        });

        Promise.race(animations).then(({ id, velocity }) => {
          const screenWidth = window.innerWidth - 170;
          const duration = Number((screenWidth / velocity).toFixed(2));

          const message = document.createElement('h2');
          message.className = 'finish-message';
          document.body.append(message);

          getWinner(id).then((car) => {
            car.id
              ? updateWinner(
                  id,
                  car.wins + 1,
                  car.time > duration ? duration : car.time,
                )
              : createWinner(id, 1, duration);
            getCar(id).then(
              (data) =>
                (message.textContent = `${data.name} WON! Time: ${duration}sec`),
            );
          });

          setTimeout(() => {
            document.body.removeChild(message);
          }, 4000);
        });

        dataRace.forEach((item: CarProps, index: number) => {
          driveCar(item.id, 'drive').then((data) => {
            if (data === 500) {
              this.animationsArray[index].pause();
            }
          });
        });
      });
    });

    this.buttonPanel.append(buttonRace.render());

    const buttonReset = new Button('Reset', () => {
      this.animationsArray.forEach((item) => item.cancel());
      this.animationsArray = [];
      getCars(this.app.currentPageGarage).then((dataRace) => {
        dataRace.forEach((item: CarProps) => startStopCar(item.id, 'stopped'));
      });
    });
    this.buttonPanel.append(buttonReset.render());

    const carBrands = [
      'Tesla',
      'Ford',
      'BMW',
      'Audi',
      'Mercedes',
      'Volkswagen',
      'Porsche',
      'Ferrari',
      'Lamborghini',
      'Maserati',
    ];
    const carModels = [
      'Model S',
      'Mustang',
      'X5',
      'A6',
      'C-Class',
      'Golf',
      '911',
      'F8',
      'Huracan',
      'Ghibli',
    ];

    const buttonGenerateCars = new Button('Generate Cars', () => {
      for (let i = 0; i < 10; i += 1) {
        const carBrand =
          carBrands[Math.floor(Math.random() * carBrands.length)];
        const carModel =
          carModels[Math.floor(Math.random() * carModels.length)];

        const carColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        createCar(`${carBrand} ${carModel}`, carColor);
      }

      renderCars();
    });

    this.buttonPanel.append(buttonGenerateCars.render());

    this.garageName = document.createElement('h1');
    this.garageName.className = 'garage-name';
    this.garageWrapper.append(this.garageName);

    this.garagePage = document.createElement('h2');
    this.garagePage.className = 'garage-page';
    this.garagePage.textContent = `Page #${this.app.currentPageGarage}`;

    this.garageWrapper.append(this.garagePage);

    this.garageCars = document.createElement('div');
    this.garageCars.className = 'garage-cars';
    this.garageWrapper.append(this.garageCars);

    renderCars();

    this.pagingButtons = document.createElement('div');
    this.pagingButtons.className = 'paging-buttons';
    this.garageWrapper.append(this.pagingButtons);

    const buttonPrev = new Button('Prev', () => {
      if (this.app.currentPageGarage !== 1) {
        this.app.currentPageGarage -= 1;
        renderCars(this.app.currentPageGarage);
        this.garagePage.textContent = `Page #${this.app.currentPageGarage}`;
      }
    });
    this.pagingButtons.append(buttonPrev.render());

    const buttonNext = new Button('Next', () => {
      getCars(undefined, null).then((data) => {
        const pageCount = Math.ceil(data.length / 7);
        if (this.app.currentPageGarage < pageCount) {
          this.app.currentPageGarage += 1;
          renderCars(this.app.currentPageGarage);
          this.garagePage.textContent = `Page #${this.app.currentPageGarage}`;
        }
      });
    });
    this.pagingButtons.append(buttonNext.render());

    return this.garageWrapper;
  }
}

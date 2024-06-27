import App from '../../App/App';
import { getCar, getWinners } from '../../server/server';
import Button from '../Button/Button';
import './style.css';

interface Winner {
  id: number;
  wins: number;
  time: number;
}

export default class Winners {
  private winnersWrapper: HTMLElement;

  private winnersCount!: HTMLElement;

  private winnersPage!: HTMLElement;

  private app: App;

  private winners: Winner[];

  private pagingButtons!: HTMLElement;

  constructor(app: App) {
    this.winnersWrapper = document.createElement('div');
    this.app = app;
    this.winners = [];
  }

  render() {
    this.winnersWrapper.innerHTML = '';

    this.winnersCount = document.createElement('h2');
    this.winnersCount.className = 'winners-count';
    this.winnersWrapper.append(this.winnersCount);

    this.winnersPage = document.createElement('h3');
    this.winnersPage.className = 'winners-page';
    this.winnersPage.textContent = `Page #${this.app.currentPageWinner}`;
    this.winnersWrapper.append(this.winnersPage);

    const table = document.createElement('table');
    table.className = 'results-table';
    this.winnersWrapper.append(table);

    getWinners(undefined, null).then((data) => {
      this.winnersCount.textContent = `Winners (${data.length})`;
    });

    const renderWinners = (currentPage?: number) => {
      table.innerHTML = '';

      const headerRow = document.createElement('tr');
      table.append(headerRow);

      ['Number', 'Car', 'Names', 'Wins', 'Best time, sec'].forEach((text) => {
        const th = document.createElement('th');
        th.textContent = text;
        th.className = 'table-header';
        headerRow.append(th);
      });

      getWinners(currentPage || this.app.currentPageWinner).then((data) => {
        this.winners = data;

        this.winners.forEach((result, index) => {
          const row = document.createElement('tr');
          row.className = 'table-row';
          table.append(row);

          const numberCell = document.createElement('td');
          numberCell.textContent = (
            index +
            1 +
            (this.app.currentPageWinner - 1) * 10
          ).toString();
          numberCell.className = 'table-cell';
          row.append(numberCell);

          const carCell = document.createElement('td');
          carCell.className = 'table-cell';
          row.append(carCell);

          const namesCell = document.createElement('td');
          namesCell.className = 'table-cell';
          row.append(namesCell);

          getCar(result.id).then((car) => {
            carCell.innerHTML = `<svg width="50" height="25" viewBox="0 0 800 379" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M640 120.42H541.305C533.508 108.964 501.134 70.0875 492.798 56.7531C492.728 56.6422 492.656 56.5297 492.584 56.4203C474.572 29.0687 439.986 0 411.369 0H240.42C212.031 0 177.766 28.6094 159.637 55.7688L132.148 90.3328C131.756 90.8266 131.391 91.3437 131.058 91.8766C125.797 100.278 103.252 120.42 78.6703 120.42H75.7906C33.9984 120.42 0 154.42 0 196.211V305.684C0 314.986 7.54063 322.527 16.8422 322.527H95.2812C108.133 355.506 140.212 378.947 177.684 378.947C215.156 378.947 247.236 355.506 260.087 322.528H548.334C561.184 355.506 593.264 378.947 630.736 378.947C668.208 378.947 700.287 355.506 713.139 322.528H783.156C792.458 322.528 799.998 314.988 799.998 305.686V280.423C800 192.197 728.223 120.42 640 120.42ZM411.369 33.6844C422.164 33.6844 447.513 49.3187 464.348 74.7906C473.864 89.9812 496.958 117.687 499.189 120.42H262.333C260.459 120.42 259.473 119.342 258.975 118.439C258.481 117.544 258.1 116.145 259.094 114.572C270.602 96.3422 313.586 39.5688 317.967 33.6813V33.6828L411.369 33.6844ZM177.684 345.262C147.503 345.262 122.947 320.706 122.947 290.525C122.947 260.344 147.503 235.787 177.684 235.787C207.866 235.787 232.422 260.344 232.422 290.525C232.42 320.708 207.866 345.262 177.684 345.262ZM630.737 345.262C600.556 345.262 576 320.706 576 290.525C576 260.344 600.556 235.787 630.737 235.787C660.919 235.787 685.475 260.344 685.475 290.525C685.473 320.708 660.917 345.262 630.737 345.262ZM766.316 288.842H719.116C718.211 240.864 678.928 202.105 630.736 202.105C582.544 202.105 543.261 240.864 542.356 288.844H266.062C265.887 279.533 264.269 270.575 261.416 262.177H422.316C431.617 262.177 439.158 254.636 439.158 245.334C439.158 236.033 431.617 228.492 422.316 228.492H241.684C241.341 228.492 241.005 228.522 240.666 228.544C224.617 212.238 202.316 202.105 177.684 202.105C129.492 202.105 90.2094 240.864 89.3047 288.844H33.6844V217.263H48C57.3016 217.263 64.8422 209.722 64.8422 200.42C64.8422 191.119 57.3016 183.578 48 183.578H35.6234C41.0031 166.514 56.9719 154.105 75.7906 154.105H78.6703C118.023 154.105 149.256 125.425 159.025 110.653L186.453 76.1656C186.767 75.7734 187.061 75.3641 187.338 74.9453C204.175 49.3812 229.603 33.6828 240.422 33.6828H275.794C260.131 54.3719 242.606 77.5875 230.611 96.5875C223.317 108.134 222.883 122.738 229.473 134.698C236.07 146.669 248.661 154.103 262.333 154.103H640C709.65 154.103 766.316 210.769 766.316 280.419V288.842Z" fill="${car.color}"/>
            </svg>
            `;
            namesCell.textContent = car.name;
          });

          const winsCell = document.createElement('td');
          winsCell.textContent = result.wins.toString();
          winsCell.className = 'table-cell';
          row.append(winsCell);

          const bestTimeCell = document.createElement('td');
          bestTimeCell.textContent = result.time.toString();
          bestTimeCell.className = 'table-cell';
          row.append(bestTimeCell);
        });
      });
    };

    renderWinners();

    this.pagingButtons = document.createElement('div');
    this.pagingButtons.className = 'paging-buttons';
    this.winnersWrapper.append(this.pagingButtons);

    const buttonPrev = new Button('Prev', () => {
      if (this.app.currentPageWinner !== 1) {
        this.app.currentPageWinner -= 1;
        renderWinners(this.app.currentPageWinner);
        this.winnersPage.textContent = `Page ${this.app.currentPageWinner}`;
      }
    });
    this.pagingButtons.append(buttonPrev.render());

    const buttonNext = new Button('Next', () => {
      getWinners(undefined, null).then((data) => {
        const pageCount = Math.ceil(data.length / 7);
        if (this.app.currentPageWinner < pageCount) {
          this.app.currentPageWinner += 1;
          renderWinners(this.app.currentPageWinner);
          this.winnersPage.textContent = `Page ${this.app.currentPageWinner}`;
        }
      });
    });
    this.pagingButtons.append(buttonNext.render());

    return this.winnersWrapper;
  }
}

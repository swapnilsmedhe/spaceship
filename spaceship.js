(function () {
  class Spaceship {
    #id;
    #position;
    #displacement;
    #missiles;

    constructor(id, position, displacement, missiles) {
      this.#id = id;
      this.#position = position;
      this.#displacement = displacement;
      this.#missiles = missiles;
    }

    move(direction) {
      if (direction === 'right') {
        this.#position.x += this.#displacement;
      }
      if (direction === 'left') {
        this.#position.x -= this.#displacement;
      }
    }

    launchMissile() {
      const { x, y } = this.#position;
      this.#missiles.addMissile({ x, y });
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y } };
    }
  }

  class Missile {
    #id;
    #position;
    #displacement;

    constructor(id, position, displacement) {
      this.#id = id;
      this.#position = position;
      this.#displacement = displacement;
    }

    move() {
      this.#position.y -= this.#displacement;
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y } };
    }
  }

  class Missiles {
    #missiles;

    constructor() {
      this.#missiles = [];
    }

    #getMissileId() {
      const missileNumber = this.#missiles.length + 1;
      return 'missile' + missileNumber;
    }

    addMissile(position) {
      const missileId = this.#getMissileId();
      this.#missiles.push(new Missile(missileId, position, 5));
    }

    getLastMissile() {
      return this.#missiles[this.#missiles.length - 1];
    }

    getMissiles() {
      return this.#missiles;
    }
  }

  class UFO {
    #id;
    #position;
    #displacement;

    constructor(id, position, displacement) {
      this.#id = id;
      this.#position = position;
      this.#displacement = displacement;
    }

    move() {
      this.#position.y += this.#displacement;
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y } };
    }
  }

  const initSpaceship = (spaceship, spaceElement) => {
    const { id, position } = spaceship.getInfo();

    const spaceshipElement = document.createElement('div');

    spaceshipElement.id = id;
    spaceshipElement.className = 'spaceship';
    spaceshipElement.style.top = position.y;
    spaceshipElement.style.left = position.x;

    spaceElement.appendChild(spaceshipElement);
  };

  const positionSpaceship = (spaceship) => {
    const { id, position } = spaceship.getInfo();
    const spaceshipElement = document.getElementById(id);

    spaceshipElement.style.top = position.y;
    spaceshipElement.style.left = position.x;
  };

  const mapCodeToDirection = (code) => {
    const keyCodes = {
      'ArrowRight': 'right',
      'ArrowLeft': 'left'
    };
    return keyCodes[code];
  };

  const moveSpaceship = (spaceship, { code }) => {
    const direction = mapCodeToDirection(code);
    if (!direction) {
      return;
    }
    spaceship.move(direction);
  };

  const initMissile = (missile, spaceElement) => {
    const { id, position } = missile.getInfo();
    const missileElement = document.createElement('div');

    missileElement.id = id;
    missileElement.className = 'missile';
    missileElement.style.top = position.y;
    missileElement.style.left = position.x;

    spaceElement.appendChild(missileElement);
  };

  const positionMissile = (missile) => {
    const { id, position } = missile.getInfo();
    const missileElement = document.getElementById(id);

    missileElement.style.top = position.y;
    missileElement.style.left = position.x;
  };

  const initUFO = (ufo, spaceElement) => {
    const { id, position } = ufo.getInfo();
    const ufoElement = document.createElement('div');

    ufoElement.id = id;
    ufoElement.className = 'ufo';
    ufoElement.style.top = position.y;
    ufoElement.style.left = position.x;

    spaceElement.appendChild(ufoElement);
  };

  const gameController = (spaceship, missiles, spaceElement, event) => {
    if (event.code === 'Space') {
      spaceship.launchMissile();
      initMissile(missiles.getLastMissile(), spaceElement);
      return;
    }
    moveSpaceship(spaceship, event);
  };

  const begin = () => {
    const spaceElement = document.getElementById('space');
    const missiles = new Missiles();
    const position = { x: 500, y: 800 };
    const spaceship = new Spaceship('spaceship-1', position, 10, missiles);
    const ufo = new UFO('ufo-1', { x: 500, y: 10 }, 5);

    initUFO(ufo, spaceElement);
    initSpaceship(spaceship, spaceElement);

    window.addEventListener('keydown', (event) => {
      gameController(spaceship, missiles, spaceElement, event);
    });

    setInterval(() => {
      positionSpaceship(spaceship);

      const launchedMissiles = missiles.getMissiles();

      launchedMissiles.forEach((missile) => missile.move());
      launchedMissiles.forEach((missile) => positionMissile(missile));
    }, 30);
  };

  window.onload = begin;
})();

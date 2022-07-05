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

  const initSpaceObject = (spaceObject, className, spaceElement) => {
    const { id, position } = spaceObject.getInfo();

    const spaceObjectElement = document.createElement('div');

    spaceObjectElement.id = id;
    spaceObjectElement.className = className;
    spaceObjectElement.style.top = position.y;
    spaceObjectElement.style.left = position.x;

    spaceElement.appendChild(spaceObjectElement);
  };

  const positionSpaceObject = (spaceObject) => {
    const { id, position } = spaceObject.getInfo();
    const spaceObjectElement = document.getElementById(id);

    spaceObjectElement.style.top = position.y;
    spaceObjectElement.style.left = position.x;
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

  const gameController = (spaceship, missiles, spaceElement, event) => {
    if (event.code === 'Space') {
      spaceship.launchMissile();
      initSpaceObject(missiles.getLastMissile(), 'missile', spaceElement);
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

    initSpaceObject(ufo, 'ufo', spaceElement);
    initSpaceObject(spaceship, 'spaceship', spaceElement);

    window.addEventListener('keydown', (event) => {
      gameController(spaceship, missiles, spaceElement, event);
    });

    setInterval(() => {
      positionSpaceObject(spaceship);

      const launchedMissiles = missiles.getMissiles();

      launchedMissiles.forEach((missile) => missile.move());
      launchedMissiles.forEach((missile) => positionSpaceObject(missile));

      ufo.move();
      positionSpaceObject(ufo);
    }, 30);
  };

  window.onload = begin;
})();

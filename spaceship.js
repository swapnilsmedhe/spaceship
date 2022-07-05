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

    moveLeft() {
      this.#position.x -= this.#displacement;
    }

    moveRight() {
      this.#position.x += this.#displacement;
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

    moveAllMissiles() {
      this.#missiles.forEach((missile) => missile.move());
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


  class Game {
    #spaceshipDetails;
    #ufoDetails;
    #spaceship;
    #missiles;
    #ufo;

    constructor(spaceshipDetails, ufoDetails) {
      this.#spaceshipDetails = spaceshipDetails;
      this.#ufoDetails = ufoDetails;
      this.#spaceship = null;
      this.#missiles = null;
      this.#ufo = null;
    }

    #initMissiles() {
      this.#missiles = new Missiles();
    }

    #initSpaceship() {
      const { id, position, displacement } = this.#spaceshipDetails;
      this.#spaceship = new Spaceship(id, position, displacement, this.#missiles);
    }

    #initUFO() {
      const { id, position, displacement } = this.#ufoDetails;
      this.#ufo = new UFO(id, position, displacement);
    }

    init() {
      this.#initMissiles();
      this.#initSpaceship();
      this.#initUFO();
    }

    update() {
      this.#missiles.moveAllMissiles();
      this.#ufo.move();
    }

    moveSpaceship(direction) {
      if (direction === 'right') {
        this.#spaceship.moveRight();
      }
      if (direction === 'left') {
        this.#spaceship.moveLeft();
      }
    }

    launchMissile() {
      this.#spaceship.launchMissile();
    }

    getDetails() {
      return {
        spaceship: this.#spaceship,
        missiles: this.#missiles.getMissiles(),
        ufo: this.#ufo
      }
    }
  }

  class GameController {
    #game;
    #spaceElement;

    constructor(game, spaceElement) {
      this.#game = game;
      this.#spaceElement = spaceElement;
    }

    control(code) {
      if (code === 'ArrowRight') {
        this.#game.moveSpaceship('right');
      }
      if (code === 'ArrowLeft') {
        this.#game.moveSpaceship('left');
      }
      if (code === 'Space') {
        this.#game.launchMissile();
      }
    }

    draw() {
      const { spaceship, missiles, ufo } = this.#game.getDetails();
      clearView(spaceship, ...missiles, ufo);
      initSpaceObject(spaceship, 'spaceship', this.#spaceElement);
      missiles.forEach((missile) =>
        initSpaceObject(missile, 'missile', this.#spaceElement));

      initSpaceObject(ufo, 'ufo', this.#spaceElement);
    }
  }


  const clearView = (...objects) => {
    objects.forEach(object => {
      const { id } = object.getInfo();
      console.log(object);
      const objectElement = document.getElementById(id);
      if (objectElement) {
        objectElement.remove();
      }
    })
  };

  const initSpaceObject = (spaceObject, className, spaceElement) => {
    const { id, position } = spaceObject.getInfo();

    const spaceObjectElement = document.createElement('div');

    spaceObjectElement.id = id;
    spaceObjectElement.className = className;
    spaceObjectElement.style.top = position.y;
    spaceObjectElement.style.left = position.x;

    spaceElement.appendChild(spaceObjectElement);
  };

  const main = () => {
    const spaceElement = document.getElementById('space');

    const spaceshipDetails = {
      id: 'spaceship-1', position: { x: 500, y: 800 }, displacement: 10
    }

    const ufoDetails = {
      id: 'ufo-1', position: { x: 500, y: 10 }, displacement: 5
    }

    const game = new Game(spaceshipDetails, ufoDetails);
    game.init();

    const gameController = new GameController(game, spaceElement);

    window.addEventListener('keydown', (event) => {
      gameController.control(event.code);
      gameController.draw();
    });

    setInterval(() => {
      game.update();
      gameController.draw();
    }, 30);
  };

  window.onload = main;
})();

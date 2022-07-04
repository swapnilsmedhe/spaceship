(function () {
  class Spaceship {
    #id;
    #position;
    #displacement;
    #bullets;

    constructor(id, position, displacement, bullets) {
      this.#id = id;
      this.#position = position;
      this.#displacement = displacement;
      this.#bullets = bullets;
    }

    move(direction) {
      if (direction === 'right') {
        this.#position.x += this.#displacement;
      }
      if (direction === 'left') {
        this.#position.x -= this.#displacement;
      }
    }

    fireBullet() {
      const { x, y } = this.#position;
      this.#bullets.addBullet({ x, y });
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y } };
    }
  }

  class Bullet {
    #id;
    #position;
    #displacement;

    constructor(id, position, displacement) {
      this.#id = id;
      this.#position = position;
      this.#displacement = displacement;
    }

    move() {
      this.#position.x += this.#displacement.dx;
      this.#position.y -= this.#displacement.dy;
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y } };
    }
  }

  class Bullets {
    #bullets;

    constructor() {
      this.#bullets = [];
    }

    #getBulletId() {
      const bulletNumber = this.#bullets.length + 1;
      return 'bullet' + bulletNumber;
    }

    addBullet(position) {
      const bulletId = this.#getBulletId();
      this.#bullets.push(new Bullet(bulletId, position, { dx: 0, dy: 5 }));
    }

    getLastBullet() {
      return this.#bullets[this.#bullets.length - 1];
    }

    getBullets() {
      return this.#bullets;
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
    console.log(code);
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

  const initBullet = (bullet, spaceElement) => {
    const { id, position } = bullet.getInfo();
    const bulletElement = document.createElement('div');
    bulletElement.id = id;
    bulletElement.className = 'bullet';
    bulletElement.style.top = position.y;
    bulletElement.style.left = position.x;

    spaceElement.appendChild(bulletElement);
  };

  const positionBullet = (bullet) => {
    const { id, position } = bullet.getInfo();
    const bulletElement = document.getElementById(id);
    bulletElement.style.top = position.y;
    bulletElement.style.left = position.x;
  };

  const gameController = (spaceship, bullets, spaceElement, event) => {
    if (event.code === 'Space') {
      spaceship.fireBullet();
      initBullet(bullets.getLastBullet(), spaceElement);
      return;
    }
    moveSpaceship(spaceship, event);
  };

  const begin = () => {
    const spaceElement = document.getElementById('space');
    const bullets = new Bullets();
    const position = { x: 500, y: 800 };
    const spaceship = new Spaceship('spaceship-1', position, 10, bullets);
    initSpaceship(spaceship, spaceElement);

    window.addEventListener('keydown', (event) => {
      gameController(spaceship, bullets, spaceElement, event);
    });

    setInterval(() => {
      positionSpaceship(spaceship);

      const firedBullets = bullets.getBullets();
      firedBullets.forEach((bullet) => bullet.move());
      firedBullets.forEach((bullet) => positionBullet(bullet));
    }, 30);
  };

  window.onload = begin;
})();

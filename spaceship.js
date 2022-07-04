(function () {
  class Spaceship {
    #id;
    #position;
    #displacement;
    #bullet;

    constructor(id, position, displacement) {
      this.#id = id;
      this.#position = position;
      this.#displacement = displacement;
      this.#bullet = null;
    }

    move(direction) {
      const offset = direction === 'right' ? this.#displacement : -this.#displacement;
      this.#position.x = this.#position.x + offset;
    }

    fireBullet() {
      const { x, y } = this.#position;
      this.#bullet = new Bullet('bullet-1', { x, y }, { dx: 0, dy: 5 });
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y }, bullet: this.#bullet };
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

  const moveSpaceship = (spaceship, event) => {
    const direction = event.code === 'ArrowRight' ? 'right' : 'left';
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

  const animateBullet = (bullet) => {
    setInterval(() => {
      bullet.move();
      positionBullet(bullet);
    }, 30);
  };

  const begin = () => {
    const spaceElement = document.getElementById('space');
    const spaceship = new Spaceship('spaceship-1', { x: 500, y: 500 }, 10);
    initSpaceship(spaceship, spaceElement);

    window.addEventListener('keydown', (event) => {
      moveSpaceship(spaceship, event);
      positionSpaceship(spaceship);
    });

    spaceship.fireBullet();
    const { bullet } = spaceship.getInfo();
    initBullet(bullet, spaceElement);
    animateBullet(bullet);
  };

  window.onload = begin;
})();

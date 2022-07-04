(function () {
  class Spaceship {
    #id;
    #position;
    #displacement;

    constructor(id, position, displacement) {
      this.#id = id;
      this.#position = position;
      this.#displacement = displacement;
    }

    move(direction) {
      const offset = direction === 'right' ? this.#displacement : -this.#displacement;
      this.#position.x = this.#position.x + offset;
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y } };
    }
  }

  const displaySpaceship = (spaceship, spaceElement) => {
    const { id, position } = spaceship.getInfo();

    const spaceshipElement = document.createElement('div');
    spaceshipElement.id = id;
    spaceshipElement.className = 'spaceship';
    spaceshipElement.style.top = position.y;
    spaceshipElement.style.left = position.x;

    spaceElement.appendChild(spaceshipElement);
  };

  const updateSpaceship = (spaceship) => {
    const { id, position } = spaceship.getInfo();
    const spaceshipElement = document.getElementById(id);
    spaceshipElement.style.top = position.y;
    spaceshipElement.style.left = position.x;
  };

  const moveSpaceship = (spaceship, event) => {
    const direction = event.code === 'ArrowRight' ? 'right' : 'left';
    spaceship.move(direction);
  };

  const begin = () => {
    const spaceElement = document.getElementById('space');
    const spaceship = new Spaceship('spaceship-1', { x: 50, y: 100 }, 10);
    displaySpaceship(spaceship, spaceElement);

    window.addEventListener('keydown', (event) => {
      moveSpaceship(spaceship, event);
      updateSpaceship(spaceship);
    });
  };

  window.onload = begin;
})();

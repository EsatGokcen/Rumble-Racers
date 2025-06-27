export default class Vehicle {
  constructor(scene, x, y) {
    this.scene = scene;

    const wheelOffsetX = 40;
    const wheelOffsetY = 20;

    // Car body
    this.body = scene.matter.add.rectangle(x, y, 100, 40, {
      chamfer: { radius: 10 },
      label: 'car-body',
      friction: 0.6
    });

    // Wheels
    this.wheelFront = scene.matter.add.circle(x + wheelOffsetX, y + wheelOffsetY, 20, {
      label: 'front-wheel',
      friction: 0.9
    });

    this.wheelBack = scene.matter.add.circle(x - wheelOffsetX, y + wheelOffsetY, 20, {
      label: 'back-wheel',
      friction: 0.9
    });

    // Constraints (like axles)
    this.constraintFront = scene.matter.add.constraint(this.body, this.wheelFront, 0, 0.9, {
      pointA: { x: wheelOffsetX, y: wheelOffsetY },
      pointB: { x: 0, y: 0 }
    });

    this.constraintBack = scene.matter.add.constraint(this.body, this.wheelBack, 0, 0.9, {
      pointA: { x: -wheelOffsetX, y: wheelOffsetY },
      pointB: { x: 0, y: 0 }
    });

    // Add controls
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const force = 0.005;

    if (this.cursors.left.isDown) {
      this.scene.matter.body.applyForce(this.wheelBack, { x: -force, y: 0 });
      this.scene.matter.body.applyForce(this.wheelFront, { x: -force, y: 0 });
    }

    if (this.cursors.right.isDown) {
      this.scene.matter.body.applyForce(this.wheelBack, { x: force, y: 0 });
      this.scene.matter.body.applyForce(this.wheelFront, { x: force, y: 0 });
    }
  }
}
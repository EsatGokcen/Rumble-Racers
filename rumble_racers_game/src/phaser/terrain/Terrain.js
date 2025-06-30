export default class Terrain {
  constructor(scene) {
    this.scene = scene;
  }

  generateHills(options = {}) {
    const {
      startX = 0,
      startY = 550,
      segmentWidth = 80,
      segmentCount = 30,
      amplitude = 80
    } = options;

    const points = [];

    for (let i = 0; i <= segmentCount; i++) {
      const x = startX + i * segmentWidth;
      const y =
        startY -
        Math.sin(i * 0.25) * amplitude * 0.6 -
        Math.cos(i * 0.5) * amplitude * 0.4;
      points.push({ x, y });
    }

    // Close the shape to form a polygon
    points.push({ x: points[points.length - 1].x, y: 600 });
    points.push({ x: points[0].x, y: 600 });

    // Create proper Matter.js vertices
    const { Vertices } = Phaser.Physics.Matter.Matter;
    const verts = Vertices.create(points, this.scene.matter.world);

    // Create the physics body
    const terrain = this.scene.matter.add.fromVertices(
      0,
      0,
      verts,
      { isStatic: true },
      true
    );

    if (!terrain) {
      console.warn('⚠️ Terrain body creation failed.');
    }

    // Draw the terrain after physics
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0x00ff00, 1);
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.closePath();
    graphics.fillPath();
  }
}
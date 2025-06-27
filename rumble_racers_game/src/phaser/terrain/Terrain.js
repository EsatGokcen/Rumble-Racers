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
      const y = startY - Math.sin(i * 0.5) * amplitude;
      points.push({ x, y });
    }

    // Close the shape
    points.push({ x: points[points.length - 1].x, y: 600 });
    points.push({ x: points[0].x, y: 600 });

    // Create Matter.js static body
    this.scene.matter.add.fromVertices(0, 0, points, { isStatic: true }, true);

    // Draw it
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
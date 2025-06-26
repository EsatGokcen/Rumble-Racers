import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#222');

    this.add.text(100, 100, 'Hill Climb Game Started!', {
      font: '24px Arial',
      fill: '#ffffff'
    });

    this.createHillyTerrain();
  }

  createHillyTerrain() {
    const startX = 0;
    const startY = 550;
    const segmentWidth = 80;
    const segmentCount = 30;
    const amplitude = 80;

    const points = [];

    for (let i = 0; i <= segmentCount; i++) {
      const x = startX + i * segmentWidth;
      const y = startY - Math.sin(i * 0.5) * amplitude;
      points.push({ x, y });
    }

    // Close the terrain shape to the bottom of the screen
    points.push({ x: points[points.length - 1].x, y: 600 });
    points.push({ x: points[0].x, y: 600 });

    // Create physics body
    const terrain = this.matter.add.fromVertices(0, 0, points, { isStatic: true }, true);

    // Draw terrain shape
    const graphics = this.add.graphics();
    graphics.fillStyle(0x00ff00, 1); // bright green
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.closePath();
    graphics.fillPath();

    if (!terrain) {
      console.warn('Failed to create terrain!');
    }
  }
}
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    // Load assets here if needed
  }

  create() {
    this.add.text(100, 100, 'Hill Climb Game Started!', {
      font: '24px Arial',
      fill: '#fff'
    });
    this.cameras.main.setBounds(0, 0, 3000, 600);
    this.cameras.main.startFollow({ x: 400, y: 300 }); // Follow dummy point for now
    this.cameras.main.setBackgroundColor('#1e1e1e');

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

    // Add the bottom corners so the polygon closes
    points.push({ x: points[points.length - 1].x, y: 600 });
    points.push({ x: points[0].x, y: 600 });

    // Create terrain body from the points
    const terrain = this.matter.add.fromVertices(0, 0, Phaser.Physics.Matter.Matter.Vertices.create(points),{
      isStatic: true,
      render: { fillStyle: '#888' }
    }, true);

    if (!terrain) {
      console.warn('Failed to create terrain!');
    }
  }

  update() {
    // game loop logic
  }
}

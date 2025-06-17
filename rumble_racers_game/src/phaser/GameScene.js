import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    // load assets here later
  }

  create() {
    this.add.text(100, 100, 'Hill Climb Game Started!', {
      font: '24px Arial',
      fill: '#fff'
    });

    // Example ground
    this.matter.add.rectangle(400, 580, 800, 40, { isStatic: true });

    // Add car, terrain, etc. later
  }

  update() {
    // game loop logic
  }
}
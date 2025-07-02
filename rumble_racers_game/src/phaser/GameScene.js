import Phaser from 'phaser';
import Vehicle from './vehicle/Vehicle';
import Terrain from './terrain/Terrain';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#222');

    this.add.text(100, 100, 'Rumble Racers Game Started!', {
      font: '24px Arial',
      fill: '#ffffff'
    });

    const terrain = new Terrain(this);
    terrain.generateHills({amplitude: 120});

    // Add vehicle
    this.vehicle = new Vehicle(this, 200, 400);
  }

  update() {
    this.vehicle?.update();
  }
}
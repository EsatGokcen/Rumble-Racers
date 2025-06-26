import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    console.log('GameScene is running');
    this.cameras.main.setBackgroundColor('#222'); // dark background

    this.add.text(100, 100, 'Hello from Phaser!', {
      font: '32px Arial',
      fill: '#ffffff'
    });

    this.add.rectangle(400, 300, 150, 100, 0x00ff00); // bright green box

    // Add a static physics ground so we know physics is working
    const ground = this.matter.add.rectangle(400, 580, 800, 40, {
      isStatic: true
    });
  }
}

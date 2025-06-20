import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import GameScene from '../phaser/GameScene';

const GameCanvas = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#000000',
      physics: {
        default: 'matter',
        matter: {
          gravity: { y: 1 },
          debug: true
        }
      },
      scene: [GameScene],
      parent: 'game-container'
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current.destroy(true);
    };
  }, []);

  return (
  <div
    id="game-container"
    style={{
      width: '100%',
      height: '100vh',   // full screen height
      overflow: 'hidden'
    }}
  />
);
};


export default GameCanvas;
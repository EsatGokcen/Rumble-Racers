import { useLayoutEffect, useRef } from 'react';
import Phaser from 'phaser';
import GameScene from '../phaser/GameScene';

const GameCanvas = () => {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current,
      backgroundColor: '#000000',
      physics: {
        default: 'matter',
        matter: {
          gravity: { y: 1 },
          debug: true
        }
      },
      scene: [GameScene]
    };

    console.log('Creating Phaser game...');
    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#111'
      }}
    />
  );
};

export default GameCanvas;
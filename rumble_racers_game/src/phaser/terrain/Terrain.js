const MatterLib = Phaser.Physics.Matter.Matter;

export default class Terrain {
  constructor(scene) {
    this.scene = scene;
  }

  generateHills({
    startX = 0,
    startY = 550,
    segmentWidth = 80,
    segmentCount = 40,
    amplitude = 100
  } = {}) {
    const { matter, add, scale } = this.scene;

    const points = [];

    for (let i = 0; i <= segmentCount; i++) {
      const x = startX + i * segmentWidth;
      const y = startY - Math.sin(i * 0.5) * amplitude * 0.6 - Math.cos(i * 0.2) * amplitude * 0.4;
      points.push({ x, y });
    }

    const bottomY = scale.height;
    points.push({ x: points[points.length - 1].x, y: bottomY });
    points.push({ x: points[0].x, y: bottomY });

    // Create physics body with correct origin alignment
    const verts = points.map(p => ({ x: p.x, y: p.y }));
    const center = MatterLib.Vertices.centre(verts);
    MatterLib.Vertices.translate(verts, { x: -center.x, y: -center.y });

    const body = MatterLib.Bodies.fromVertices(center.x, center.y, verts, {
      isStatic: true,
      friction: 0.8
    }, true);

    matter.world.add(body); // Add to Matter world

    // Green terrain drawing
    const gfx = add.graphics();
    gfx.fillStyle(0x00ff00, 1);
    gfx.beginPath();
    gfx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      gfx.lineTo(points[i].x, points[i].y);
    }
    gfx.closePath();
    gfx.fillPath();
  }
}
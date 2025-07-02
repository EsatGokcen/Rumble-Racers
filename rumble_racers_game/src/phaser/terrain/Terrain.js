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
    const points = [];

    // 1. Generate points
    for (let i = 0; i <= segmentCount; i++) {
      const x = startX + i * segmentWidth;
      const y = startY - Math.sin(i * 0.5) * amplitude * 0.6 - Math.cos(i * 0.2) * amplitude * 0.4;
      points.push({ x, y });
    }

    // 2. Add points to close the polygon (bottom right, bottom left)
    const bottomY = this.scene.scale.height;
    points.push({ x: points[points.length - 1].x, y: bottomY });
    points.push({ x: points[0].x, y: bottomY });

    // 3. Create static body directly
    const matterVerts = points.map(p => ({ x: p.x, y: p.y }));
    this.scene.matter.add.fromVertices(0, 0, matterVerts, { isStatic: true });

    // 4. Draw filled terrain (visual)
    const gfx = this.scene.add.graphics();
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
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
      const y =
        startY -
        Math.sin(i * 0.25) * amplitude * 0.6 -
        Math.cos(i * 0.5) * amplitude * 0.4;
      points.push({ x, y });
    }

    // Close the polygon
    points.push({ x: points[points.length - 1].x, y: 600 });
    points.push({ x: points[0].x, y: 600 });

    const MatterLib = Phaser.Physics.Matter.Matter;

    // Convert to Matter-compatible vertices
    const verts = MatterLib.Vertices.create(points, this.scene.matter.world);

    // Shift vertices so top-left becomes (0, 0)
    const bounds = MatterLib.Vertices.bounds(verts);
    MatterLib.Vertices.translate(verts, { x: -bounds.min.x, y: -bounds.min.y });

    // Add the physics body at the actual position
    const terrain = this.scene.matter.add.fromVertices(
      bounds.min.x,
      bounds.min.y,
      verts,
      { isStatic: true },
      true
    );

    if (!terrain) {
      console.warn('⚠️ Terrain body creation failed.');
    }

    // Draw the terrain using original points (absolute)
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
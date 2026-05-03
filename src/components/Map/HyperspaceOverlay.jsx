import React, { useEffect, useRef } from 'react';

export default function HyperspaceOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 500 }).map(() => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      pz: Math.random() * width
    }));

    let animationFrameId;
    let speed = 2; 
    let acceleration = 1.02; 
    const maxSpeed = 400;
    
    const startTime = Date.now();
    const duration = 4000; // time until full flash

    const loop = () => {
      // Use destination-out to fade existing stars to transparent, creating motion trails
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, width, height);
      // Reset to default for drawing new stars
      ctx.globalCompositeOperation = 'source-over';

      const elapsed = Date.now() - startTime;

      // Exponentially accelerate into the jump
      if (speed < maxSpeed) {
        speed *= acceleration;
        acceleration += 0.005;
      }

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Draw and update stars
      stars.forEach(star => {
        star.pz = star.z;
        star.z -= speed;

        // Reset star if it passes the camera
        if (star.z < 1) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
          star.pz = width;
        }

        const sx = star.x / star.z * width;
        const sy = star.y / star.z * height;
        const px = star.x / star.pz * width;
        const py = star.y / star.pz * height;

        // Shift color to bright blue as speed approaches hyperspace
        let color = '#ffffff';
        if (speed > 50) color = '#cceeff';
        if (speed > 100) color = '#88ccff';

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        // Lines get thicker as they approach the camera
        ctx.lineWidth = Math.max(1, (1 - star.z / width) * 4);
        ctx.strokeStyle = color;
        ctx.stroke();
      });

      ctx.restore();

      // Final blinding white flash when transition is ending
      if (elapsed > duration - 500) {
        const flashOpacity = (elapsed - (duration - 500)) / 500;
        ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}

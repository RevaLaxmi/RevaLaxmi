
// particles.js

window.onload = function() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    let mouseX = 0;
    let mouseY = 0;
  
    // Adjust canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Listen for mouse movements
    canvas.addEventListener('mousemove', (event) => {
      mouseX = event.x;
      mouseY = event.y;
    });
  
    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color ='rgba(227, 114, 255, 0.47)';
      }
  
      update() {
        // Move toward the mouse cursor
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = 5 / distance;  // Reduced force to slow down the particles
  
        this.speedX += (dx / distance) * force;
        this.speedY += (dy / distance) * force;

        // Apply damping to reduce overall speed
        this.speedX *= 0.95;
        this.speedY *= 0.95;

        this.x += this.speedX;
        this.y += this.speedY;
        // Particle boundaries and fading
        if (this.size > 0.5) this.size -= 0.02;  // Slow down shrinking of particles
      }
  
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
  
      connect(otherParticle) {
        const distance = Math.sqrt(
          (this.x - otherParticle.x) * (this.x - otherParticle.x) +
          (this.y - otherParticle.y) * (this.y - otherParticle.y)
        );
  
        // Extend the distance for connecting particles and make the lines longer
        if (distance < 120) {  // Increased connection distance
          ctx.strokeStyle = 'rgba(240, 178, 255, 0.53)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    }
  
    // Animation function
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Create new particles
      if (particles.length < 80) {  // Increased particle count for smoother visuals
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
  
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
  
        // Connect particles
        for (let i = index + 1; i < particles.length; i++) {
          particle.connect(particles[i]);
        }
  
        // Remove dead particles
        if (particle.size <= 0.5) {  // Changed size threshold for removal
          particles.splice(index, 1);
        }
      });
  
      requestAnimationFrame(animateParticles);
    }
  
    animateParticles();
  
    // Adjust canvas size on window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

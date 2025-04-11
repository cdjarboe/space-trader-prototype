import { gravitational_constant } from "./constant_defs"; // Import the gravitational constant from constant_defs.js

export class CelestialBody {
    constructor(name, color="rgba(255, 255, 255, 1.0)", mass=0, radius=0, orbitRadius=0, orbitalPeriod=0.0, type="sun", satellites=[], parent=null, startAngle=0) {
        this.name = name;
        this.color = color; // Color of the celestial body
        this.mass = mass; // in kg
        this.radius = radius;
        this.orbitRadius = orbitRadius;
        this.orbitalPeriod = orbitalPeriod;
        this.type = type; // "sun", "planet", or "moon"
        this.satellites = []; // satellites; // Array of CelestialBody objects
        this.velocity = Math.sqrt((gravitational_constant * this.parent.getMass()) / this.orbitRadius); // Orbital velocity in m/s
        this.angle = startAngle; // Angle in radians
        this.parent = parent; // Parent celestial body (if any)
        if (!this.parent) {
            this.x = 0; // X position in the solar system
            this.y = 0; // Y position in the solar system
        } else {
            this.x = this.parent.x + this.orbitRadius * Math.cos(startAngle); // X position in the solar system
            this.y = this.parent.y + this.orbitRadius * Math.sin(startAngle); // Y position in the solar system
        }

        for (let satellite of satellites) {
            this.satellites.push(new CelestialBody(
                satellite['name'],
                satellite['color'],
                satellite['mass'],
                satellite['radius'],
                satellite['orbitRadius'],
                satellite['orbitalPeriod'],
                satellite['type'],
                satellite['satellites'],
                this,
                0
            ));
        }

    }

    getName() {
        return this.name;
    }
    getColor() {
        return this.color;
    }
    getMass() {
        return this.mass;
    }
    getRadius() {
        return this.radius;
    }
    getOrbitRadius() {
        return this.orbitRadius;
    }
    getOrbitalPeriod() {
        return this.orbitalPeriod;
    }
    getType() {
        return this.type;
    }
    getSatellites() {
        return this.satellites;
    }
    getParent() {
        return this.parent;
    }

    update(deltaTime) {
        // Update the celestial body (e.g., position, rotation, etc.)
        // This method can be overridden by subclasses if needed
        if (this.parent) {
            // Update position based on orbital mechanics
            this.angle += (2 * Math.PI) / (this.orbitalPeriod * 60 * 60 * 24) * deltaTime; // Convert days to seconds
            this.x = this.parent.x + this.orbitRadius * Math.cos(this.angle);
            this.y = this.parent.y + this.orbitRadius * Math.sin(this.angle);
        }
        // Update satellites
        for (let satellite of this.satellites) {
            satellite.update(deltaTime);
        }
    }

    draw(ctx, focus) {
        // Draw the orbital path
        if (this.parent && focus !== this) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.beginPath();
            ctx.arc(this.parent.x, this.parent.y, this.orbitRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        // Draw the celestial body on the canvas
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw satellites if any
        for (let satellite of this.satellites) {
            satellite.draw(ctx);
        }
    }
}
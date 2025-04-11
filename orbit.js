import { gravitational_constant } from "./constant_defs";

export class Orbit {
    constructor(focalBody, sma, eccentricity, periapsisLongitude=0) {
        this.focalBody = focalBody; // The body around which the orbit is centered
        this.sma = sma; // Semi-major axis (in meters)
        this.eccentricity = eccentricity; // Eccentricity of the orbit (0 for circular, 1 for parabolic)
        this.semiMinorAxis = this.sma * Math.sqrt(1 - this.eccentricity * this.eccentricity); // Semi-minor axis (in meters)
        this.gravitationalComponent = this.focalBody.getMass() * gravitational_constant; // Gravitational component of the orbit
        this.periapsisLongitude = periapsisLongitude; // Longitude of periapsis (in radians)
        this.orbitalPeriod = Math.sqrt((4 * Math.PI * Math.PI * Math.pow(this.sma, 3)) / this.gravitationalComponent); // Orbital period (in seconds)
    }

    getSemiMajorAxis() {
        return this.sma;
    }
    getSemiMinorAxis() {
        return this.semiMinorAxis;
    }
    getEccentricity() {
        return this.eccentricity;
    }
    getFocalBody() {
        return this.focalBody;
    }
    getGravitationalComponent() {
        return this.gravitationalComponent;
    }
    getCurrentRadius(trueAnomaly) {
        if (this.eccentricity == 0) {
            return this.sma; // Circular orbit
        }
        else if (this.eccentricity < 1) {
            return this.sma * (1 - this.eccentricity * Math.cos(trueAnomaly)); // Elliptical orbit
        }
        else if (this.eccentricity == 1) {
            return this.sma * (1 - this.eccentricity); // Parabolic orbit [TODO: check this]
        }
        else {
            return this.sma * (1 - this.eccentricity); // Hyperbolic orbit [TODO: check this]
        }
    }
    getCurrentOrbitalVelocity() {
        let radius = this.getCurrentRadius();
        return Math.sqrt((this.gravitationalComponent * (2 / radius - 1 / this.sma)));
    }
    getCurrentCartesianCoordinates(trueAnomaly) {
        let radius = this.getCurrentRadius(trueAnomaly);
        let x = radius * Math.cos(trueAnomaly + this.periapsisLongitude);
        let y = radius * Math.sin(trueAnomaly + this.periapsisLongitude);
        return { x: x, y: y };
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.focalBody.x, this.focalBody.y, this.sma, this.semiMinorAxis, this.periapsisLongitude, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}
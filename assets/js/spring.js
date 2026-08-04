/* ==========================================================================
   Spring Physics Solver — Shared Utility
   ========================================================================== */

/**
 * Spring simulation step using Hooke's law with velocity damping.
 * f = -k * (x - target) - c * v
 *
 * @param {number} current - Current position value
 * @param {number} target - Target position value
 * @param {number} velocity - Current velocity
 * @param {number} stiffness - Spring stiffness (k), higher = snappier
 * @param {number} damping - Damping coefficient (c), higher = less bounce
 * @param {number} mass - Mass (default 1)
 * @returns {{ position: number, velocity: number }}
 */
function springStep(current, target, velocity, stiffness, damping, mass = 1) {
  const force = -stiffness * (current - target) - damping * velocity;
  const acceleration = force / mass;
  const newVelocity = velocity + acceleration;
  const newPosition = current + newVelocity;
  return { position: newPosition, velocity: newVelocity };
}

/**
 * Spring-based animation for 2D transforms.
 * Tracks separate springs for x and y axes.
 */
class Spring2D {
  constructor(stiffness, damping, mass = 1) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.targetX = 0;
    this.targetY = 0;
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  step() {
    const resultX = springStep(this.x, this.targetX, this.vx, this.stiffness, this.damping, this.mass);
    const resultY = springStep(this.y, this.targetY, this.vy, this.stiffness, this.damping, this.mass);
    this.x = resultX.position;
    this.y = resultY.position;
    this.vx = resultX.velocity;
    this.vy = resultY.velocity;
    return { x: this.x, y: this.y };
  }

  /**
   * Check if spring has essentially settled.
   */
  isSettled(tolerance = 0.01) {
    return Math.abs(this.x - this.targetX) < tolerance
        && Math.abs(this.y - this.targetY) < tolerance
        && Math.abs(this.vx) < tolerance
        && Math.abs(this.vy) < tolerance;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.targetX = 0;
    this.targetY = 0;
  }
}

/**
 * 1D spring for scalar values (font-size, opacity, etc.)
 */
class Spring1D {
  constructor(stiffness, damping, mass = 1) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.value = 0;
    this.velocity = 0;
    this.target = 0;
  }

  setTarget(v) {
    this.target = v;
  }

  step() {
    const result = springStep(this.value, this.target, this.velocity, this.stiffness, this.damping, this.mass);
    this.value = result.position;
    this.velocity = result.velocity;
    return this.value;
  }

  isSettled(tolerance = 0.01) {
    return Math.abs(this.value - this.target) < tolerance
        && Math.abs(this.velocity) < tolerance;
  }

  snap() {
    this.value = this.target;
    this.velocity = 0;
  }

  reset() {
    this.value = 0;
    this.velocity = 0;
    this.target = 0;
  }
}

export { springStep, Spring2D, Spring1D };

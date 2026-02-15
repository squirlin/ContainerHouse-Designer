// walls.js

class Wall {
    constructor(length, height, material) {
        this.length = length;
        this.height = height;
        this.material = material;
    }

    draw(context) {
        context.fillStyle = this.material.color;
        context.fillRect(0, 0, this.length, this.height);
    }

    snapDetection(point) {
        // Implement snap detection logic based on point coordinates
        // This is a placeholder for demo purposes.
        return point.x < this.length && point.y < this.height;
    }

    applyMaterial(newMaterial) {
        this.material = newMaterial;
    }

    calculateCost() {
        return this.length * this.height * this.material.costPerSquareMeter;
    }
}

module.exports = Wall;
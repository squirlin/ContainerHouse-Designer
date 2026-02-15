// Container Management Module

class Container {
    constructor(id, size, weight) {
        this.id = id;
        this.size = size;  // Size in cubic meters
        this.weight = weight; // Weight in kilograms
    }
}

class ContainerManagement {
    constructor() {
        this.containers = [];
    }

    add(container) {
        this.containers.push(container);
    }

    move(containerId, newPosition) {
        // Implement move logic here, e.g., updating the position of the container
        console.log(`Moving container ${containerId} to ${newPosition}`);
    }

    rotate(containerId, angle) {
        // Implement rotate logic here, e.g., changing orientation of the container
        console.log(`Rotating container ${containerId} by ${angle} degrees`);
    }

    calculateCost() {
        // Cost calculation based on size and weight
        let totalCost = 0;
        for (const container of this.containers) {
            totalCost += (container.size * 100) + (container.weight * 0.5); // Example cost formula
        }
        return totalCost;
    }
}

// Example usage:
const containerManagement = new ContainerManagement();
containerManagement.add(new Container('C1', 20, 5000));
containerManagement.move('C1', 'Position A');
containerManagement.rotate('C1', 90);
console.log(`Total cost: $${containerManagement.calculateCost()}`);

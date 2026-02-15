// windows.js

// Module for managing windows in the Container House Designer

const windows = {
    createWindow: function(x, y, width, height) {
        return { x, y, width, height, cost: this.calculateCost(width, height) };
    },

    moveWindow: function(window, newX, newY) {
        window.x = newX;
        window.y = newY;
    },

    resizeWindow: function(window, newWidth, newHeight) {
        window.width = newWidth;
        window.height = newHeight;
        window.cost = this.calculateCost(newWidth, newHeight);
    },

    snapToWall: function(window, wallX, wallY) {
        const snapDistance = 10;  // Distance within which to snap to wall
        if (Math.abs(window.x - wallX) < snapDistance) {
            window.x = wallX;
        }
        if (Math.abs(window.y - wallY) < snapDistance) {
            window.y = wallY;
        }
    },

    calculateCost: function(width, height) {
        const costPerSquareFoot = 50;  // Example cost per square foot
        return width * height * costPerSquareFoot;
    }
};

// Export the windows module
export default windows;
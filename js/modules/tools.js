// tool selection logic and shared state management

// Define a shared state object
const sharedState = {};

// Function to select a tool based on input
function selectTool(toolName) {
    switch (toolName) {
        case 'tool1':
            return new Tool1();
        case 'tool2':
            return new Tool2();
        // Add more tools as needed
        default:
            throw new Error('Tool not found');
    }
}

// Example function to manage state
function setState(key, value) {
    sharedState[key] = value;
}

function getState(key) {
    return sharedState[key];
}

// Export functions for use in other modules
export { selectTool, setState, getState };
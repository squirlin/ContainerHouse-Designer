/**
 * canvas.js
 * Canvas initialization, rendering loop, and drawing management
 * Handles all canvas setup and core rendering operations
 */

const CanvasModule = (() => {
    // Canvas element and context
    let canvas = null;
    let ctx = null;
    let animationFrameId = null;
    
    // Rendering state
    const renderingState = {
        isRunning: false,
        backgroundColor: '#ffffff',
        gridEnabled: true,
        gridSize: 20,
        zoomLevel: 1,
        panX: 0,
        panY: 0
    };

    /**
     * Initialize the canvas
     */
    function init() {
        canvas = document.getElementById('design-canvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return false;
        }

        ctx = canvas.getContext('2d');
        
        // Set canvas size to match container
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        });

        return true;
    }

    /**
     * Start the main rendering loop
     */
    function startRendering() {
        if (renderingState.isRunning) return;
        renderingState.isRunning = true;
        render();
    }

    /**
     * Stop the rendering loop
     */
    function stopRendering() {
        renderingState.isRunning = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }

    /**
     * Main render loop - called every frame
     */
    function render() {
        clearCanvas();
        drawGrid();
        
        // Draw all objects in order
        if (window.ContainerModule) {
            window.ContainerModule.drawAll(ctx);
        }
        if (window.WallsModule) {
            window.WallsModule.drawAll(ctx);
        }
        if (window.WindowsModule) {
            window.WindowsModule.drawAll(ctx);
        }
        if (window.DoorsModule) {
            window.DoorsModule.drawAll(ctx);
        }
        if (window.FoundationModule) {
            window.FoundationModule.drawAll(ctx);
        }
        if (window.RoofingModule) {
            window.RoofingModule.drawAll(ctx);
        }

        if (renderingState.isRunning) {
            animationFrameId = requestAnimationFrame(render);
        }
    }

    /**
     * Clear the entire canvas
     */
    function clearCanvas() {
        ctx.fillStyle = renderingState.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Draw the background grid
     */
    function drawGrid() {
        if (!renderingState.gridEnabled) return;

        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;

        const gridSize = renderingState.gridSize * renderingState.zoomLevel;
        const offsetX = renderingState.panX % gridSize;
        const offsetY = renderingState.panY % gridSize;

        // Vertical lines
        for (let x = offsetX; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = offsetY; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    /**
     * Get canvas context
     */
    function getContext() {
        return ctx;
    }

    /**
     * Get canvas dimensions
     */
    function getDimensions() {
        return {
            width: canvas.width,
            height: canvas.height
        };
    }

    /**
     * Get rendering state
     */
    function getState() {
        return { ...renderingState };
    }

    /**
     * Set zoom level
     */
    function setZoom(level) {
        renderingState.zoomLevel = Math.max(0.1, Math.min(5, level));
    }

    /**
     * Set pan position
     */
    function setPan(x, y) {
        renderingState.panX = x;
        renderingState.panY = y;
    }

    /**
     * Toggle grid visibility
     */
    function toggleGrid() {
        renderingState.gridEnabled = !renderingState.gridEnabled;
    }

    /**
     * Set background color
     */
    function setBackgroundColor(color) {
        renderingState.backgroundColor = color;
    }

    /**
     * Draw a rectangle (utility function for modules)
     */
    function drawRect(x, y, width, height, fillColor = null, strokeColor = '#000', strokeWidth = 1) {
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(x, y, width, height);
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeRect(x, y, width, height);
    }

    /**
     * Draw a circle (utility function for modules)
     */
    function drawCircle(x, y, radius, fillColor = null, strokeColor = '#000', strokeWidth = 1) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }

    /**
     * Draw a line (utility function for modules)
     */
    function drawLine(fromX, fromY, toX, toY, strokeColor = '#000', strokeWidth = 1) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }

    /**
     * Draw text (utility function for modules)
     */
    function drawText(text, x, y, fillColor = '#000', fontSize = 12, fontFamily = 'Arial') {
        ctx.fillStyle = fillColor;
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillText(text, x, y);
    }

    /**
     * Convert screen coordinates to world coordinates
     */
    function screenToWorld(screenX, screenY) {
        return {
            x: (screenX - renderingState.panX) / renderingState.zoomLevel,
            y: (screenY - renderingState.panY) / renderingState.zoomLevel
        };
    }

    /**
     * Convert world coordinates to screen coordinates
     */
    function worldToScreen(worldX, worldY) {
        return {
            x: worldX * renderingState.zoomLevel + renderingState.panX,
            y: worldY * renderingState.zoomLevel + renderingState.panY
        };
    }

    // Public API
    return {
        init,
        startRendering,
        stopRendering,
        render,
        clearCanvas,
        drawGrid,
        getContext,
        getDimensions,
        getState,
        setZoom,
        setPan,
        toggleGrid,
        setBackgroundColor,
        drawRect,
        drawCircle,
        drawLine,
        drawText,
        screenToWorld,
        worldToScreen
    };
})();

// Export to global namespace
window.CanvasModule = CanvasModule;
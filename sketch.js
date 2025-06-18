let countrysideMode = 0; // 0: default, 1: more green, 2: blooming
let cityMode = 0;        // 0: default, 1: more traffic, 2: bustling

let particles = [];
const NUM_PARTICLES = 100;

function setup() {
    let canvas = createCanvas(800, 400);
    canvas.parent('p5-canvas-container'); // Attach canvas to the div
    
    // Initialize particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(255); // White background

    // --- Draw Countryside (left half) ---
    push();
    if (countrysideMode === 0) {
        fill(150, 200, 100); // Default green
    } else if (countrysideMode === 1) {
        fill(100, 180, 50); // Darker, lush green
    } else if (countrysideMode === 2) {
        fill(200, 230, 150); // Lighter, blooming green
    }
    noStroke();
    rect(0, 0, width / 2, height);

    // Add countryside elements based on mode
    if (countrysideMode === 0) {
        drawBasicTrees(50, 30);
    } else if (countrysideMode === 1) {
        drawDenseTrees(20, 10);
        drawHills(color(120, 190, 70));
    } else if (countrysideMode === 2) {
        drawFloweringTrees(80, 40);
        drawHills(color(180, 220, 130));
        drawSun(color(255, 255, 0));
    }
    pop();

    // --- Draw City (right half) ---
    push();
    if (cityMode === 0) {
        fill(100, 100, 120); // Default grey
    } else if (cityMode === 1) {
        fill(80, 80, 100); // Darker, more concrete
    } else if (cityMode === 2) {
        fill(130, 130, 150); // Brighter, bustling city
    }
    noStroke();
    rect(width / 2, 0, width / 2, height);

    // Add city elements based on mode
    if (cityMode === 0) {
        drawBasicBuildings(width / 2 + 50, height - 100);
    } else if (cityMode === 1) {
        drawTallBuildings(width / 2 + 30, height - 80);
        drawRoads();
    } else if (cityMode === 2) {
        drawModernBuildings(width / 2 + 20, height - 120);
        drawRoads();
        drawCityLights();
    }
    pop();

    // --- Draw connection line (optional, for emphasis) ---
    stroke(0, 0, 0, 50); // Semi-transparent black
    strokeWeight(2);
    line(width / 2, 0, width / 2, height);

    // --- Update and display particles ---
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

// --- Interaction ---
function mousePressed() {
    if (mouseX < width / 2) { // Clicked on countryside side
        countrysideMode = (countrysideMode + 1) % 3; // Cycle through 0, 1, 2
    } else { // Clicked on city side
        cityMode = (cityMode + 1) % 3; // Cycle through 0, 1, 2
    }
}

// --- Countryside Drawing Functions ---
function drawBasicTrees(startX, startY) {
    fill(0, 80, 0); // Tree trunk
    rect(startX, height - 50, 10, 40);
    fill(0, 120, 0); // Tree leaves
    ellipse(startX + 5, height - 50, 30, 30);

    fill(0, 80, 0);
    rect(startX + 100, height - 60, 10, 50);
    fill(0, 120, 0);
    ellipse(startX + 105, height - 60, 35, 35);
}

function drawDenseTrees(startX, startY) {
    for (let i = 0; i < 5; i++) {
        fill(50, 100, 30);
        rect(startX + i * 60, height - (40 + i * 5), 15, 30 + i * 5);
        fill(70, 140, 40);
        ellipse(startX + i * 60 + 7, height - (40 + i * 5), 40, 40);
    }
}

function drawFloweringTrees(startX, startY) {
    for (let i = 0; i < 4; i++) {
        fill(100, 120, 80);
        rect(startX + i * 80, height - (60 + i * 10), 12, 50 + i * 10);
        fill(255, 150, 180); // Pink flowers
        ellipse(startX + i * 80 + 6, height - (60 + i * 10), 35, 35);
        fill(255, 200, 220); // Lighter pink
        ellipse(startX + i * 80 + 6, height - (60 + i * 10) - 10, 25, 25);
    }
}

function drawHills(c) {
    fill(c);
    ellipse(width / 4, height * 0.9, width / 2, height / 3);
    ellipse(width / 4 + 100, height * 0.95, width / 3, height / 4);
}

function drawSun(c) {
    fill(c);
    noStroke();
    ellipse(width / 4, 80, 80, 80);
    for (let i = 0; i < 8; i++) {
        line(width / 4, 80, width / 4 + cos(TWO_PI / 8 * i) * 60, 80 + sin(TWO_PI / 8 * i) * 60);
    }
}


// --- City Drawing Functions ---
function drawBasicBuildings(startX, startY) {
    fill(150);
    rect(startX, height - 70, 40, 70);
    rect(startX + 60, height - 90, 50, 90);
}

function drawTallBuildings(startX, startY) {
    fill(130);
    rect(startX, height - 120, 50, 120);
    fill(160);
    rect(startX + 60, height - 150, 60, 150);
    fill(110);
    rect(startX + 130, height - 100, 45, 100);
}

function drawModernBuildings(startX, startY) {
    fill(180, 180, 200); // Lighter grey
    rect(startX, height - 180, 70, 180);
    fill(150, 150, 170); // Darker grey for windows
    rect(startX + 10, height - 170, 10, 20);
    rect(startX + 30, height - 170, 10, 20);
    rect(startX + 50, height - 170, 10, 20);

    fill(190, 190, 210);
    rect(startX + 90, height - 140, 80, 140);
    fill(160, 160, 180);
    rect(startX + 100, height - 130, 15, 25);
    rect(startX + 120, height - 130, 15, 25);
    rect(startX + 140, height - 130, 15, 25);
}

function drawRoads() {
    fill(60);
    rect(width / 2, height - 40, width / 2, 40); // Main road
    fill(255, 255, 0); // Yellow lines
    for (let i = 0; i < width / 2; i += 20) {
        rect(width / 2 + i, height - 20, 10, 2);
    }
}

function drawCityLights() {
    // Street lights
    fill(255, 255, 100, 150); // Yellowish light
    ellipse(width / 2 + 50, height - 50, 10, 10);
    ellipse(width / 2 + 150, height - 60, 12, 12);
    ellipse(width / 2 + 250, height - 55, 11, 11);

    // Building windows
    if (frameCount % 30 < 15) { // Flickering effect
        fill(255, 255, 150, 180);
        rect(width / 2 + 10, height - 170, 10, 10);
        rect(width / 2 + 100, height - 130, 15, 15);
    }
}

// --- Particle Class ---
class Particle {
    constructor() {
        this.reset();
        this.speed = random(1, 3);
        this.size = random(2, 6);
    }

    reset() {
        // Randomly start from countryside or city
        if (random(1) < 0.5) {
            this.x = random(0, width / 2); // Start in countryside
            this.y = random(height);
            this.targetX = random(width / 2, width); // Move to city
        } else {
            this.x = random(width / 2, width); // Start in city
            this.y = random(height);
            this.targetX = random(0, width / 2); // Move to countryside
        }
        this.originalX = this.x;
        this.originalY = this.y;
        this.lerpAmount = 0; // For smooth movement
        this.color = color(random(150, 255), random(150, 255), random(150, 255), 150); // Light, semi-transparent
    }

    update() {
        this.lerpAmount += 0.005 * this.speed; // Increase lerp amount over time
        this.x = lerp(this.originalX, this.targetX, this.lerpAmount);
        // Add some vertical wiggle for natural movement
        this.y += sin(frameCount * 0.05 + this.x * 0.01) * 0.5;

        if (this.lerpAmount >= 1) { // Particle reached its target
            this.reset();
        }
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }
}
// Set up the canvas
const canvas = document.getElementById('albumCanvas');
const ctx = canvas.getContext('2d');

// Set a default background color
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Load the Parental Advisory image
const parentalAdvisoryImg = new Image();
parentalAdvisoryImg.src = 'parental_advisory.png'; // Replace with the actual path to your image
parentalAdvisoryImg.onload = function () {
    drawCanvas();
};

// Function to draw the canvas
function drawCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the background with a rectangle with rounded corners
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get the text from the input field uppercase
    const text = document.getElementById('textInput').value.toUpperCase();


    // Draw background text with long-tall-sally font
    const back_scale = 3.5; // Scale factor for the font size background text
    const text1size = canvas.width / back_scale;

    ctx.font = (text1size | 0) + "px bold long-tall-sally";
    // At least 40px padding from the left edge
    const textX1 = Math.max(40, canvas.width / 2 - ctx.measureText(text).width / 2);
    const textWidth1 = Math.min(ctx.measureText(text).width, canvas.width - textX1 * 2);
    const textY = canvas.height / 2 + text1size / 4;
    ctx.fillStyle = '#000'; // Black text

    ctx.fillText(text, textX1, textY, canvas.width - textX1 * 2);

    // Draw foreground text with swiss-911 font and stretch it
    const front_scale = 10; // Scale factor for the font size foreground text
    const text2size = canvas.width / front_scale;
    ctx.font = (text2size | 0) + "px swiss-911";
    const textWidth2 = ctx.measureText(text).width;
    // Scale factor for the text width
    const scaleX = (textWidth1 / textWidth2);
    const textY2 = textY - text2size / 2;
    ctx.save(); // Save the current state
    ctx.scale(scaleX, 1); // Scale the text horizontally
    ctx.fillStyle = '#000'; // Black text
    ctx.fillText(text, (canvas.width / scaleX - textWidth2) / 2, textY2);
    ctx.restore(); // Restore the original state

    // Redraw the Parental Advisory label
    const width = canvas.width / 8;
    const height = width / parentalAdvisoryImg.width * parentalAdvisoryImg.height;
    const x = canvas.width - width - 10; // 10px padding from the right edge
    const y = canvas.height - height - 10; // 10px padding from the bottom edge
    ctx.drawImage(parentalAdvisoryImg, x, y, width, height);
}

// Update text in real-time
const textInput = document.getElementById('textInput');
textInput.addEventListener('input', drawCanvas);

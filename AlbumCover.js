import React, { useEffect, useRef } from 'react';

const AlbumCover = () => {
    const canvasRef = useRef(null);
    const textInputRef = useRef(null);
    const parentalAdvisoryImg = useRef(new Image());

    useEffect(() => {
        parentalAdvisoryImg.current.src = 'parental_advisory.png'; // Replace with the actual path to your image
        parentalAdvisoryImg.current.onload = () => {
            drawCanvas();
        };
    }, []);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw the background with a rectangle with rounded corners
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Get the text input value
        const text = textInputRef.current.value.toUpperCase();

        // Draw background text with long-tall-sally font
        const back_scale = 3.5; // Scale factor for the font size background text
        const text1size = canvas.width / back_scale;
        ctx.font = `${text1size | 0}px bold long-tall-sally`;
        const textY = canvas.height / 2 + text1size / 4;
        ctx.fillStyle = '#000'; // Black text

        // Calculate the total width of the text
        let totalWidth = 0;
        for (let i = 0; i < text.length; i++) {
            totalWidth += ctx.measureText(text[i]).width;
        }

        // Calculate the starting X position to center the text
        let textX = (canvas.width - totalWidth) / 2;

        // Draw each letter individually for background text
        for (let i = 0; i < text.length; i++) {
            const letter = text[i];
            ctx.fillText(letter, textX, textY);
            textX += ctx.measureText(letter).width;
        }

        // Draw foreground text with swiss-911 font and stretch it
        const front_scale = 10; // Scale factor for the font size foreground text
        const text2size = canvas.width / front_scale;
        ctx.font = `${text2size | 0}px swiss-911`;
        ctx.fillStyle = '#000'; // Black text

        // Calculate the total width of the text for the foreground font
        totalWidth = 0;
        for (let i = 0; i < text.length; i++) {
            totalWidth += ctx.measureText(text[i]).width;
        }

        // Calculate the starting X position to center the text
        textX = (canvas.width - totalWidth) / 2;

        // Draw each letter individually for foreground text
        for (let i = 0; i < text.length; i++) {
            const letter = text[i];
            const letterWidth = ctx.measureText(letter).width;
            const scaleX = (canvas.width - 80) / ctx.measureText(text).width; // Scale factor for the text width
            ctx.save(); // Save the current state
            ctx.scale(scaleX, 1); // Scale the text horizontally
            ctx.fillText(letter, textX / scaleX, textY);
            ctx.restore(); // Restore the original state
            textX += letterWidth;
        }

        // Redraw the Parental Advisory label
        const width = canvas.width / 8;
        const height = width / parentalAdvisoryImg.current.width * parentalAdvisoryImg.current.height;
        const x = canvas.width - width - 10; // 10px padding from the right edge
        const y = canvas.height - height - 10; // 10px padding from the bottom edge
        ctx.drawImage(parentalAdvisoryImg.current, x, y, width, height);
    };

    return (
        <div>
            <header>
                <h1>MUSIC</h1>
            </header>
            <div className="canvas-container">
                <canvas ref={canvasRef} id="albumCanvas" width="600" height="600"></canvas>
            </div>
            <div className="tools">
                <input
                    type="text"
                    ref={textInputRef}
                    id="textInput"
                    defaultValue="I AM MUSIC"
                    maxLength="15"
                    onInput={drawCanvas}
                />
            </div>
        </div>
    );
};

export default AlbumCover;
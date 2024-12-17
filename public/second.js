setInterval(async () => {
    try {
        const response = await fetch('http://localhost:3000/get-objects');
        const objects = await response.json();

        if (objects.length === 0) return;

        const latestObject = objects[objects.length - 1];
        const { text, color, shadow1, shadow2, shadow3, duration } = latestObject;

        const glitchText = document.getElementById('glitchText');
        const toRemove = document.getElementById('toRemove');
        if (toRemove) toRemove.style.display = 'none';

        glitchText.innerHTML = `
            <span aria-hidden="true">${text}</span>
            ${text}
            <span aria-hidden="true">${text}</span>
        `;

        const span1 = glitchText.children[0];
        const span2 = glitchText.children[1];

        glitchText.style.cssText += `
            font-size: 32px;
            font-weight: bold;
            text-transform: uppercase;
            position: relative;
            color: ${color};
            text-shadow: 
                0.05em 0 0 ${shadow1}, 
                -0.025em -0.05em 0 ${shadow2}, 
                0.025em 0.05em 0 ${shadow3};
            animation: glitch-text ${duration}s infinite;
        `;

        span1.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            animation: glitch-text ${duration}s infinite;
            clip-path: polygon(0 0, 100% 0, 100% 0, 100% 45%, 0 45%);
            transform: translate(-0.05em, -0.025em);
            opacity: 0.8;
        `;

        span2.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            animation: glitch-text ${duration}s infinite;
        `;

        // 7. Оновлення ключових кадрів анімації
        const styleSheet = document.getElementById('dynamic-styles');
        if (styleSheet) styleSheet.remove();

        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.innerHTML = `
            @keyframes glitch-text {
                0%, 14% {
                    text-shadow: 0.05em 0 0 ${shadow1}, -0.05em -0.025em 0 ${shadow2}, -0.025em 0.05em 0 ${shadow3};
                }
                15%, 49% {
                    text-shadow: -0.05em -0.025em 0 ${shadow1}, 0.025em 0.025em 0 ${shadow2}, -0.05em -0.05em 0 ${shadow3};
                }
                50%, 99% {
                    text-shadow: 0.025em 0.05em 0 ${shadow1}, 0.05em 0 0 ${shadow2}, 0 -0.05em 0 ${shadow3};
                }
                100% {
                    text-shadow: -0.025em 0 0 ${shadow1}, -0.025em -0.025em 0 ${shadow2}, 0.025em -0.05em 0 ${shadow3};
                }
            }
        `;
        document.head.appendChild(style);

    } catch (error) {
        console.error('Error fetching or updating glitch text:', error);
    }
}, 5000); // Оновлення кожні 5 секунд

document.getElementById('create-btn').addEventListener('click', () => {
    const createBtn = document.getElementById('create-btn');

    document.getElementById('glitchContainer').style = `
        display: flex;
        flex-direction: column;
        align-items: center;`;

    createBtn.style.display = 'none';
});

function updateGlitchStyles() {
    const newText = document.getElementById('glitchInput').value;
    const mainColor = document.getElementById('colorInputForMain').value;
    const shadowColor1 = document.getElementById('colorInputForShadow-1').value;
    const shadowColor2 = document.getElementById('colorInputForShadow-2').value;
    const shadowColor3 = document.getElementById('colorInputForShadow-3').value;
    const duration = document.getElementById('durationInput').value;

    const glitchText = document.getElementById('glitchText');

    glitchText.innerHTML = `<p class="glitch-text" id="glitchText"><span aria-hidden = 'true'>${newText}</span>${newText}<span aria-hidden = 'true'>${newText}</span></p>`;

    const span1 = glitchText.children[0];
    const span2 = glitchText.children[1];

    glitchText.style.color = mainColor;
    glitchText.style.textShadow = `
        0.05em 0 0 ${shadowColor1},
        -0.025em -0.05em 0 ${shadowColor2},
        0.025em 0.05em 0 ${shadowColor3}`;

    const styleSheet = document.getElementById('dynamic-styles');
    if (styleSheet) styleSheet.remove();

    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.innerHTML = `
        @keyframes glitch-text {
            0%, 14% {
                text-shadow: 0.05em 0 0 ${shadowColor1}, -0.05em -0.025em 0 ${shadowColor2}, -0.025em 0.05em 0 ${shadowColor3};
            }
            15%, 49% {
                text-shadow: -0.05em -0.025em 0 ${shadowColor1}, 0.025em 0.025em 0 ${shadowColor2}, -0.05em -0.05em 0 ${shadowColor3};
            }
            50%, 99% {
                text-shadow: 0.025em 0.05em 0 ${shadowColor1}, 0.05em 0 0 ${shadowColor2}, 0 -0.05em 0 ${shadowColor3};
            }
            100% {
                text-shadow: -0.025em 0 0 ${shadowColor1}, -0.025em -0.025em 0 ${shadowColor2}, 0.025em -0.05em 0 ${shadowColor3};
            }
        }
    `;
    document.head.appendChild(style);

    glitchText.style.animationDuration = `${duration}s`;
    span1.style.animationDuration = `${duration}s`;
    span2.style.animationDuration = `${duration}s`;
}

document.getElementById('glitchForm').addEventListener('input', updateGlitchStyles);

document.getElementById('submit-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const newObj = {
        text: document.getElementById('glitchInput').value,
        color: document.getElementById('colorInputForMain').value,
        shadow1: document.getElementById('colorInputForShadow-1').value,
        shadow2: document.getElementById('colorInputForShadow-2').value,
        shadow3: document.getElementById('colorInputForShadow-3').value,
        duration: document.getElementById('durationInput').value
    };

    try {
        const response = await fetch('https://glitch-text-project.up.railway.app/add-object', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newObj)
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error sending data:', error);
    }
});

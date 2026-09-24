let Titulo = document.title;

window.addEventListener('blur', () => {
    Titulo = document.title;
    document.title = "No te vayas, regresa :(";
});

window.addEventListener('focus', () => {
    document.title = Titulo;
});

let h1 = document.getElementById("Titulo");
let Boton1 = document.getElementById("B1");

Boton1.addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    document.querySelector(".Texto").style.display = "block";
    ContenedorBotones.style.display = "none";
    // Centramos la flor individual en el canvas (ancho 800, alto 600)
    DibujarFlor(400, 200, 6, 30, 100, 180);
    if(h1) h1.remove();
});

document.getElementById("B12").addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    ContenedorBotones.style.display = "none";
    document.querySelector(".Texto").style.display = "block";
    CrearVarias();
    if(h1) h1.remove();
});

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
    const Numero = scala;
    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, Numero);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
        const AnguloActual = i * AnguloIncrement;
        const currentRadius = Math.sin(AnguloActual) * RadioX;
        const PuntoY = Math.sin(AnguloActual) * currentRadius;
        const PuntoX = Math.cos(AnguloActual) * currentRadius;
        if (i === 0) {
          ctx.moveTo(PuntoX, PuntoY);
        } else {
          ctx.lineTo(PuntoX, PuntoY);
        }
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }
    ctx.restore();
}

function DibujarFlor(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + AltoTrazo);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#2e7d32'; 
    ctx.stroke();

    DibujarPetalo(x - 12, y + 70, 12, 2, 2.5, '#4caf50', 30);
    DibujarPetalo(x + 12, y + 95, 12, 2, -2.5, '#4caf50', 30);

    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
    let contadorPetalos = 0;
    
    function dibujarSiguientePetalo() {
        if (contadorPetalos < NumeroPetalos) {
            const Angulo = contadorPetalos * AnguloIncrement;
            DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, '#ffeb3b', 50); 
            contadorPetalos++;
            setTimeout(dibujarSiguientePetalo, 200); 
        } else {
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fillStyle = '#ff8f00'; 
            ctx.fill();
            ctx.strokeStyle = '#e65100';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    dibujarSiguientePetalo();
}

function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo) {
    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos < NumeroPetalos) {
            const Angulo = contadorPetalos * AnguloIncrement;
            DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, '#ffeb3b', 50);
            contadorPetalos++;
            setTimeout(dibujarSiguientePetalo, 200); 
        } else {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#ff8f00';
            ctx.fill();
            ctx.strokeStyle = '#e65100';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    dibujarSiguientePetalo();
}

function CrearVarias() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const posiciones = [
        {x: 200, y: 150}, {x: 400, y: 150}, {x: 600, y: 150},
        {x: 150, y: 300}, {x: 325, y: 300}, {x: 500, y: 300}, {x: 650, y: 300},
        {x: 200, y: 450}, {x: 400, y: 450}, {x: 600, y: 450},
        {x: 300, y: 220}, {x: 500, y: 220}
    ];

    posiciones.forEach((pos, index) => {
        setTimeout(() => {
            DibujarFlorSinTallo(pos.x, pos.y, 7, 20);
        }, index * 300);
    });
}

document.getElementById("BVer").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "block";
});

document.getElementById("BotonCerrar").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "none";
    document.querySelector(".Contenedor-Binicio").style.display = "none";
    document.querySelector(".Con-2").style.display = "block";
});

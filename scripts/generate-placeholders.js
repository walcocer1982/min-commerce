const fs = require('fs');
const path = require('path');

// Asegúrate de que el directorio public existe
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Datos para los placeholders
const placeholders = [
  {
    name: 'placeholder-watch.jpg',
    content: `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#555" text-anchor="middle">Smartwatch Image</text>
      </svg>
    `
  },
  {
    name: 'placeholder-headphones.jpg',
    content: `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#555" text-anchor="middle">Headphones Image</text>
      </svg>
    `
  },
  {
    name: 'placeholder-camera.jpg',
    content: `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#555" text-anchor="middle">Camera Image</text>
      </svg>
    `
  }
];

// Guarda cada placeholder como SVG
placeholders.forEach(placeholder => {
  const svgPath = path.join(publicDir, placeholder.name.replace('.jpg', '.svg'));
  fs.writeFileSync(svgPath, placeholder.content.trim());
  console.log(`Creado: ${svgPath}`);
});

console.log('Placeholders generados correctamente'); 
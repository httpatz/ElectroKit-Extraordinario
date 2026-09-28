// productos-data.js — Catálogo de 9 productos (3 x 3)
// Cada producto tiene 6 imágenes: 1 se muestra en grande y las demás como miniaturas intercambiables.
const VISTAS = ['frontal', 'trasera', 'detalle', 'angulo', 'empaque', 'uso'];
const imagenes = (id) => VISTAS.map(v => `img/productos/${id}-${v}.svg`);

const PRODUCTOS = [
  {
    id: 'arduino-uno', nombre: 'Arduino UNO R3',
    descripcion: 'Tarjeta de desarrollo con ATmega328P, 14 pines digitales (6 PWM), 6 entradas analógicas y cable USB incluido.',
    diasEnvio: 2, calificacion: 5, imagenes: imagenes('arduino-uno'),
    comentarios: [
      { usuario: 'luis_mx', estrellas: 5, texto: 'Llegó rápido y funciona perfecto con el IDE.', fecha: '2026-09-02' },
      { usuario: 'karla', estrellas: 5, texto: 'Ideal para empezar mis prácticas de la escuela.', fecha: '2026-09-10' }
    ]
  },
  {
    id: 'esp32', nombre: 'ESP32 DevKit V1',
    descripcion: 'Microcontrolador de doble núcleo con Wi‑Fi y Bluetooth integrados. Perfecto para proyectos IoT.',
    diasEnvio: 3, calificacion: 4, imagenes: imagenes('esp32'),
    comentarios: [
      { usuario: 'iot_dev', estrellas: 4, texto: 'Buen precio; hay que presionar BOOT al cargar el código.', fecha: '2026-08-28' }
    ]
  },
  {
    id: 'pico', nombre: 'Raspberry Pi Pico',
    descripcion: 'Microcontrolador RP2040 de doble núcleo a 133 MHz, programable en MicroPython o C/C++.',
    diasEnvio: 4, calificacion: 4, imagenes: imagenes('pico'),
    comentarios: [
      { usuario: 'maria_py', estrellas: 4, texto: 'Excelente para aprender MicroPython.', fecha: '2026-09-05' }
    ]
  },
  {
    id: 'hc-sr04', nombre: 'Sensor ultrasónico HC‑SR04',
    descripcion: 'Mide distancias de 2 cm a 4 m con precisión de ±3 mm. Alimentación de 5 V.',
    diasEnvio: 2, calificacion: 4, imagenes: imagenes('hc-sr04'),
    comentarios: [
      { usuario: 'robotica22', estrellas: 4, texto: 'Lo usé en un carrito evasor de obstáculos, muy estable.', fecha: '2026-09-12' }
    ]
  },
  {
    id: 'relevador', nombre: 'Módulo relevador 4 canales',
    descripcion: 'Cuatro relevadores de 5 V con optoacopladores para controlar cargas de hasta 10 A / 250 VAC.',
    diasEnvio: 5, calificacion: 3, imagenes: imagenes('relevador'),
    comentarios: [
      { usuario: 'domotica_ana', estrellas: 3, texto: 'Funciona, pero los tornillos de las borneras son pequeños.', fecha: '2026-08-30' }
    ]
  },
  {
    id: 'kit-leds', nombre: 'Kit de LEDs y resistencias',
    descripcion: '100 LEDs de 5 mm en 5 colores y 300 resistencias de 1/4 W en 10 valores, en caja organizadora.',
    diasEnvio: 3, calificacion: 5, imagenes: imagenes('kit-leds'),
    comentarios: [
      { usuario: 'pepe', estrellas: 5, texto: 'Muy completo, la caja está bien organizada.', fecha: '2026-09-15' }
    ]
  },
  {
    id: 'servo', nombre: 'Servomotor SG90',
    descripcion: 'Micro servo de 9 g con giro de 180° y torque de 1.8 kg·cm. Incluye brazos y tornillos.',
    diasEnvio: 2, calificacion: 4, imagenes: imagenes('servo'),
    comentarios: [
      { usuario: 'brazo_robot', estrellas: 4, texto: 'Buena respuesta para su tamaño.', fecha: '2026-09-01' }
    ]
  },
  {
    id: 'oled', nombre: 'Pantalla OLED 0.96" I2C',
    descripcion: 'Pantalla monocromática de 128×64 píxeles con controlador SSD1306 y comunicación I2C.',
    diasEnvio: 6, calificacion: 3, imagenes: imagenes('oled'),
    comentarios: []
  },
  {
    id: 'protoboard', nombre: 'Protoboard 830 puntos',
    descripcion: 'Tablilla de prototipos sin soldadura con 2 rieles de alimentación y base adhesiva.',
    diasEnvio: 1, calificacion: 5, imagenes: imagenes('protoboard'),
    comentarios: [
      { usuario: 'karla', estrellas: 5, texto: 'Los contactos sujetan bien los componentes.', fecha: '2026-09-18' }
    ]
  }
];

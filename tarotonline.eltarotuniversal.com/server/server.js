import express from 'express';
import axios from 'axios';

const app = express();
const port = 3001; // Puedes cambiar el puerto si es necesario

// Middleware para manejar las solicitudes JSON
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Se accedió a la ruta raíz');
    res.send('Bienvenido al servidor de API');
  });

// Endpoint que hará la llamada a la API externa
app.get('/api/transito', async (req, res) => {
  const { phone } = req.query; // Recibe el número de teléfono como parámetro de la solicitud

  const url_service = 'https://pro77.meetip.net/crm2rest/v2/rest.php';
  const key_service = 'iiUpoSgskyzXHUx5olqweKjaJySGaa9USKQx';
  const agente_service = '10';

  try {
    // Hacer la solicitud a la API externa utilizando axios
    const apiUrl = `${url_service}?accion=transito&numero=${phone}&Authorization=${key_service}&agente=${agente_service}`;
    console.log('Haciendo solicitud a:', apiUrl);
    const response = await axios.get(apiUrl);
    console.error('Respuesta:', response);
    // Responder al cliente con los datos de la API
    res.json(response.data);
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    res.status(500).send('Error al hacer la solicitud');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de proxy corriendo en http://localhost:${port}`);
});

import express from 'express';
import { handleLogin } from '../../components/login';

const app = express();
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await handleLogin(username, password);
  res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro de conexão:', err));

sequelize.sync({ force: false }) 
  .then(() => console.log('Modelos sincronizados!'))
  .catch(err => console.error('Erro ao sincronizar:', err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

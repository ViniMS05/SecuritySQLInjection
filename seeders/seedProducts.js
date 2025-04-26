const sequelize = require('../config/database');
const Product = require('../models/Product');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Tabelas recriadas!');

    const products = [
      {
        name: 'Whey Protein',
        category: 'Suplementos',
        price: 120.00,
        is_launched: true,
      },
      {
        name: 'Creatina Monohidratada',
        category: 'Suplementos',
        price: 90.00,
        is_launched: true,
      },
      {
        name: 'Pré-Treino Insano',
        category: 'Suplementos',
        price: 140.00,
        is_launched: false,
      },
      {
        name: 'Mouse Gamer XYZ',
        category: 'Eletrônicos',
        price: 250.00,
        is_launched: true,
      },
      {
        name: 'Teclado Mecânico RGB',
        category: 'Eletrônicos',
        price: 320.00,
        is_launched: true,
      },
      {
        name: 'Livro: Machine Learning para Iniciantes',
        category: 'Livros',
        price: 59.90,
        is_launched: true,
      },
      {
        name: 'Livro: Segredos de Banco de Dados',
        category: 'Livros',
        price: 69.90,
        is_launched: false
      }
    ];

    await Product.bulkCreate(products);
    console.log('Produtos inseridos com sucesso!');

    process.exit();
  } catch (error) {
    console.error('Erro ao rodar o seeder:', error);
    process.exit(1);
  }
}

seed();

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const sequelize = require("../config/database");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        is_launched: true,
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, category, price, is_launched } = req.body;
    const product = await Product.create({
      name,
      category,
      price,
      is_launched,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto." });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, is_launched } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    await product.update({ name, category, price, is_launched });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    await product.destroy();
    res.json({ message: "Produto deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
});

// Rota INSEGURA usando QUERY (vulnerável a SQL Injection)
// router.get("/products/category/:category", async (req, res) => {
//   try {
//     const { category } = req.params;
//     console.log({ category });
//     const [results] = await sequelize.query(
//       `SELECT * FROM products WHERE category = '${category}' AND is_launched = true`
//     );

//     res.json(results);
//   } catch (error) {
//     console.error("Erro na consulta por categoria:", error);
//     res.status(500).json({ error: "Erro ao buscar produtos por categoria." });
//   }
// });

// Buscar Produtos por Categoria (e proteger contra SQL Injection)
router.get("/products/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.findAll({
      where: {
        category,
        is_launched: true,
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos por categoria." });
  }
});  

// Buscar TODOS produtos por Categoria (inclusive não lançados) se autorizado
router.get("/products/category/:category/all", async (req, res) => {
  try {
    const { category } = req.params;

    // Se admin=true, mostra todos
    const products = await Product.findAll({
      where: {
        category: category,
      },
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar todos produtos por categoria." });
  }
});

module.exports = router;

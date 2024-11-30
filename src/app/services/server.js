// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear el cuerpo de la petición en formato JSON
app.use(express.json());

// Configurar la conexión con la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopsport",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log("Conexión a la base de datos MySQL exitosa!");
});

// Rutas de CRUD para productos
// Obtener todos los productos
app.get("/api/productos", (req, res) => {
  const query = "SELECT * FROM productos";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error al obtener productos");
      return;
    }
    res.json(results); // Devuelve los productos en formato JSON
  });
});

// Obtener un producto por su id
app.get("/api/productos/:ID", (req, res) => {
  const { ID } = req.params;
  const query = "SELECT * FROM productos WHERE ID = ?";

  db.query(query, [ID], (err, results) => {
    if (err) {
      res.status(500).send("Error al obtener producto");
      return;
    }

    if (results.length > 0) {
      res.status(200).json(results[0]); // Enviamos el primer producto encontrado
    } else {
      res.status(404).send("Producto no encontrado");
    }
  });
});

// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { NOMBRE, DESCRIPCION, PRECIO, UNIDADES, MARCA, DISTRIBUIDOR, URLIMAGEN } = req.body;

  // Verifica que los datos estén siendo recibidos
  console.log(req.body);

  if (!NOMBRE || !DESCRIPCION || !PRECIO || !UNIDADES || !MARCA || !DISTRIBUIDOR || !URLIMAGEN) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Si los datos son correctos, los insertas en la base de datos
  const query = `INSERT INTO productos (NOMBRE, DESCRIPCION, PRECIO, UNIDADES, MARCA, DISTRIBUIDOR, URLIMAGEN)
                 VALUES ('${NOMBRE}', '${DESCRIPCION}', ${PRECIO}, ${UNIDADES}, '${MARCA}', '${DISTRIBUIDOR}', '${URLIMAGEN}')`;

  // Ejecuta la consulta para insertar en la base de datos
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar el producto en la base de datos' });
    }
    res.status(201).json({ message: 'Producto creado correctamente' });
  });
});

// Actualizar un producto
app.put("/api/productos/:ID", (req, res) => {
  const { ID } = req.params;
  const {
    NOMBRE,
    DESCRIPCION,
    PRECIO,
    UNIDADES,
    MARCA,
    DISTRIBUIDOR,
    URLIMAGEN,
  } = req.body;

  const query = "UPDATE productos SET NOMBRE = ?, DESCRIPCION = ?, PRECIO = ?, UNIDADES = ?, MARCA = ?, DISTRIBUIDOR = ?, URLIMAGEN = ? WHERE ID = ?";
  
  db.query(query, [NOMBRE, DESCRIPCION, PRECIO, UNIDADES, MARCA, DISTRIBUIDOR, URLIMAGEN, ID], (err, results) => {
    if (err) {
      console.error("Error en la consulta SQL:", err); // Log del error
      return res.status(500).send("Error al actualizar el producto.");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Producto no encontrado o no se actualizó.");
    }

    // Respuesta exitosa
    res.status(200).send({ message: "Producto actualizado con éxito." });
  });
});

// Eliminar un producto
app.delete("/api/productos/:ID", (req, res) => {
  const { ID } = req.params;
  const query = "DELETE FROM productos WHERE ID = ?";

  db.query(query, [ID], (err, results) => {
    if (err) {
      res.status(500).send("Error al eliminar producto");
      return;
    }

    if (results.affectedRows > 0) {
      res.status(200).send({ message: "Producto eliminado con éxito" });
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  });
});


// Provedores



// Rutas de CRUD para provedores
// Obtener todos los provedores
app.get("/api/provedores", (req, res) => {
  const query = "SELECT * FROM Provedores";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error al obtener Provedores");
      return;
    }
    res.json(results); // Devuelve los Provedores en formato JSON
  });
});

// Obtener un Provedor por su id
app.get("/api/provedores/:ID", (req, res) => {
  const { ID } = req.params;
  const query = "SELECT * FROM provedores WHERE ID = ?";

  db.query(query, [ID], (err, results) => {
    if (err) {
      res.status(500).send("Error al obtener Provedor");
      return;
    }

    if (results.length > 0) {
      res.status(200).json(results[0]); // Enviamos el primer Provedor encontrado
    } else {
      res.status(404).send("Provedor no encontrado");
    }
  });
});

// Crear un nuevo Provedor
app.post('/api/provedores', (req, res) => {
  const { NOMBRE, TELEFONO, EMAIL, DIRECCION } = req.body;

  // Verifica que los datos estén siendo recibidos
  console.log(req.body);

  if (!NOMBRE || !TELEFONO || !EMAIL || !DIRECCION ) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  
  // Si los datos son correctos, los insertas en la base de datos
  const query = `INSERT INTO Provedores (NOMBRE, TELEFONO, EMAIL, DIRECCION)
                 VALUES ('${NOMBRE}', ${TELEFONO}, '${EMAIL}', '${DIRECCION}')`;

        



  // Ejecuta la consulta para insertar en la base de datos
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar el Provedor en la base de datos' });
    }
    res.status(201).json({ message: 'Provedor creado correctamente' });
  });
});

// Actualizar un Provedor
app.put("/api/provedores/:ID", (req, res) => {
  const { ID } = req.params;
  const {
    NOMBRE,
    TELEFONO,
    EMAIL,
    DIRECCION,
  } = req.body;

  const query = "UPDATE Provedores SET NOMBRE = ?, TELEFONO = ?, EMAIL = ?, DIRECCION = ? WHERE ID = ?";
  
  db.query(query, [NOMBRE, TELEFONO, EMAIL, DIRECCION, ID], (err, results) => {
    if (err) {
      console.error("Error en la consulta SQL:", err); // Log del error
      return res.status(500).send("Error al actualizar el Provedor.");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Provedor no encontrado o no se actualizó.");
    }

    // Respuesta exitosa
    res.status(200).send({ message: "Provedor actualizado con éxito." });
  });
});

// Eliminar un Provedor
app.delete("/api/provedores/:ID", (req, res) => {
  const { ID } = req.params;
  const query = "DELETE FROM provedores WHERE ID = ?";

  db.query(query, [ID], (err, results) => {
    if (err) {
      res.status(500).send("Error al eliminar Provedor");
      return;
    }

    if (results.affectedRows > 0) {
      res.status(200).send({ message: "Provedor eliminado con éxito" });
    } else {
      res.status(404).send({ message: "Provedor no encontrado" });
    }
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

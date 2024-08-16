const express = require('express');
const { sequelize, Empleado, Proyecto } = require('./db');
const app = express();

app.use(express.json());

app.post('/empleados', async (req, res) => {
  try {
    const empleado = await Empleado.create(req.body);
    res.status(201).json(empleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/empleados', async (req, res) => {
  const empleados = await Empleado.findAll();
  res.json(empleados);
});

app.put('/empleados/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    await empleado.update(req.body);
    res.json(empleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/empleados/:id', async (req, res) => {
  const empleado = await Empleado.findByPk(req.params.id);
  if (!empleado) {
    return res.status(404).json({ error: 'Empleado no encontrado' });
  }
  await empleado.destroy();
  res.json({ message: 'Empleado eliminado' });
});

app.post('/proyectos', async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/proyectos', async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.json(proyectos);
});

app.put('/proyectos/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    await proyecto.update(req.body);
    res.json(proyecto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, async () => {
  await sequelize.sync();
  console.log('API escuchando en el puerto 3000');
});

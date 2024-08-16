const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'hr_management.db'
});

const Empleado = sequelize.define('Empleado', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  proyectoId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

const Proyecto = sequelize.define('Proyecto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  porcentajeCompletado: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  }
});

Empleado.belongsTo(Proyecto, { foreignKey: 'proyectoId' });
Proyecto.hasMany(Empleado, { foreignKey: 'proyectoId' });

module.exports = { sequelize, Empleado, Proyecto };

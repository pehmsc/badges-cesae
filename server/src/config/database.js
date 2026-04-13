const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    // Neon drops idle connections — keepalive prevents ECONNRESET
    keepAlive: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,        // remove idle connections after 10s
    evict: 1000,        // check for idle connections every 1s
  },
  logging: false
});

module.exports = sequelize;

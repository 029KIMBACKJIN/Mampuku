const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
//データベースの名前、ユーザ、パスワードなどをここで設定する。
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//turorialsに、テーブルモデルを代入する？
db.tutorials = require("./model.js")(sequelize, Sequelize);

module.exports = db;
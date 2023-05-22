// MySQL 連携設定及び Sequelizerのためのパラメーター設定

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "mysql",
    DB: "task_db",
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
        timestamps: false
    }
  };
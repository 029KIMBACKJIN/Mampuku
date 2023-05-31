module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
      id: {
        // id 設定する際には必ず primarykey を入力
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING
      },
      contents: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      complelte: {
        type: Sequelize.BOOLEAN
      },
      parentId: {
        type: Sequelize.INTEGER
      },
      childId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING
      }
      }, 
      {
          timestamps: false
      });
  
    return Task;
  };
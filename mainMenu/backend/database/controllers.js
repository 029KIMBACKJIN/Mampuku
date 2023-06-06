const db = require("./models");
const temp = require("./originModules/task");
//テーブルモデルを取り出す。Tutorialとなっているが、tasksテーブルと思っていい
const tasks = db.task_db;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const task = temp.taskTemp(req);
    console.log("登録情報：" + task.toString());
    // Save Tutorial in the database
    tasks.create(task)
      .then(task => {
        res.send(task);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task."
        });
      });
  };

// 未完成
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id = req.body.id;

    var condition = title ? { id: { [Op.like]: `%${id}%` } } : null;
    //{内に、select文などのsql文を記載すれば取れるはず？}
    tasks.findAll({ where: condition })
      .then(task => {
        res.send(task);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      });
  };


//追加
exports.findAllData = (req, res) => {
  //{内に、select文などのsql文を記載すれば取れるはず？}
  tasks.findAll()
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


// フロントからIDをもらってDBで検索
exports.findOne = (req, res) => {
    // Axiosから送られたBodyを分析してIDをとる
    const id = req.body.id;
    tasks.findByPk(id)
      .then(task => {
        if (task) {
          // taskに検索された情報が入っている
          res.send(task);
        } else {
          res.status(404).send({
            message: `Cannot find task with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving task with id=" + id
        });
      });
  };

  // フロントからIDをもらってDBで検索
exports.findWithIdAll = (req, res) => {
  // Axiosから送られたBodyを分析してIDをとる
  const uid = req.body.uid;


  var condition = {
    userId: {
      [Op.like]: `%${uid}%`
    }
  };
  console.log("uid:" + uid + ", " + condition);

  tasks.findAll({ where: condition })
    .then(task => {
      console.log(task);
      res.send(task);
    })
    .catch(err => {
      res.status(500).send({
        message: "Some error occurred while retrieving tasks."
      });
    });


};


// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;

    const task = temp.taskTemp(req);

    //idが一致するものを修正する。
    tasks.update(task, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send(task);
        } else {
          res.send("更新に失敗しました！");
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating task with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.body.id;

    const task = temp.taskTemp(req);
  

    tasks.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send(task);
        } else {
          res.send({
            message: `Cannot delete task with id=${id}. Maybe task was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete task with id=" + id
        });
      });
  };

// Delete all task from the database.
exports.deleteAll = (req, res) => {
  tasks.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} tasks were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tasks."
        });
      });
  };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tasks."
//         });
//       });
//   };
exports.taskTemp = function(req){
    const task = {
        //左側の名前は、model.jsのカラム名と一致している必要がある。
        id: req.body.id,
        title: req.body.title,
        contents: req.body.contents,  
        deadline: req.body.deadline,
        complelte: req.body.complete,
        parentId: req.body.parentId,   //不明
        childId: req.body.childId,    //不明
        userId: req.body.userId
      }
    return task;
}
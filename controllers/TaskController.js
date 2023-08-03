const TaskModel = require("../models/Model");

module.exports.getTask = async (req, res) => {
  const task = await TaskModel.find();
  res.send(task);
};

module.exports.saveTask = (req, res) => {
  const { title, description } = req.body;
  TaskModel.create({ title, description })
    .then((data) => {
      console.log("Added Successfully...");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.deleteTask = (req, res) => {
  const { _id } = req.body;
  console.log("id ---> ", _id);
  TaskModel.findByIdAndDelete(_id)
    .then(() => res.set(201).send("Deleted Successfully..."))
    .catch((err) => console.log(err));
};

module.exports.updateTask = (req, res) => {
  const { _id, title, description } = req.body;

  TaskModel.findByIdAndUpdate(_id, { title, description })
    .then(() => res.set(201).send("Updated Successfully..."))
    .catch((err) => console.log(err));
};

module.exports.updateTaskCompletionStatus = async (req, res) => {
  try {
    const { _id } = req.body;
    const task = await TaskModel.findById(_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
  }
};

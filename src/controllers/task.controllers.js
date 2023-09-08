import pool from "../database.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  const task = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [task.title, task.description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const task = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM task WHERE id = $1 RETURNING *",
      [task.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const task = req.params;
  const newTask = req.body;

  try {
    const result = await pool.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [newTask.title, newTask.description, task.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getSingleTask = async (req, res, next) => {
  const task = req.params;

  try {
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [
      task.id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

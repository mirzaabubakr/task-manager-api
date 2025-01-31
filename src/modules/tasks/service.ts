import { Request } from "express";
import { Task } from "../../utils/sequelize/sequelize";
import { TaskData, TaskUpdateData } from "./interface/task.interface";
import { TaskSchema } from "./validations/task.validation";
import { z } from "zod";
import { errorResponse } from "../../shared/response";

export const getUserTasks = async (req: Request) => {
  try {
    const { sortBy, order } = req.query;
    const options: any = {};

    if (["priority", "dueDate"].includes(sortBy as string)) {
      options.order = [[sortBy, order === "desc" ? "DESC" : "ASC"]];
    }

    const tasks = await Task.findAll(options);

    const processedTasks: any = tasks.map((task) => {
      const taskData = task.get();
      const isOverdue =
        taskData.status === "Pending" &&
        new Date(taskData.dueDate) < new Date();
      return {
        ...taskData,
        status: isOverdue ? "Overdue" : taskData.status,
      };
    });

    return {
      statusCode: 200,
      data: {
        tasks: processedTasks,
      },
    };
  } catch (error: any) {
    return errorResponse(500, error.message);
  }
};

export const createUserTask = async (taskData: TaskData) => {
  try {
    const validTask = TaskSchema.parse(taskData);
    const task = await Task.create(validTask);
    return {
      statusCode: 201,
      data: task,
      message: `Task created successfully`,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        message: error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", "),
      };
    } else {
      return errorResponse(500, error.message);
    }
  }
};

export const updateUserTask = async (
  id: string,
  taskUpdateData: TaskUpdateData
) => {
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return {
        statusCode: 404,
        message: `Task not found`,
      };
    }
    await task.update(taskUpdateData);
    return {
      statusCode: 200,
      data: {
        message: `Task updated successfully`,
      },
    };
  } catch (error: any) {
    return errorResponse(500, error.message);
  }
};

export const deleteUserTask = async (id: string) => {
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return {
        statusCode: 404,
        message: `Task not found`,
      };
    }
    await task.destroy();
    return {
      statusCode: 200,
      data: {
        message: `Task deleted successfully`,
      },
    };
  } catch (error: any) {
    return errorResponse(500, error.message);
  }
};

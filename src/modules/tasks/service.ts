import { Request } from "express";
import { sequelize, Task } from "../../utils/sequelize/sequelize";
import { TaskData, TaskUpdateData } from "./interface/task.interface";
import { TaskSchema } from "./validations/task.validation";
import { z } from "zod";
import { errorResponse } from "../../shared/response";
import { Op } from "sequelize";
import { logTaskChange } from "../TaskLogs/service";

export const getUserTasks = async (req: Request) => {
  try {
    const { sortBy, order, search, limit, offset } = req.query;
    const options: any = {};

    const pageLimit = limit ? parseInt(limit as string, 10) : 10; // Default limit to 10
    const pageOffset = offset ? parseInt(offset as string, 10) : 0; // Default offset to 0

    if (search) {
      options.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    if (sortBy && order) {
      const sortCriteria = (sortBy as string).split(",");
      const sortOrder = (order as string).split(",");

      options.order = sortCriteria.map((criteria, index) => {
        if (criteria === "priority") {
          return [
            sequelize.literal(
              `CASE WHEN priority = 'Low' THEN 1 WHEN priority = 'Medium' THEN 2 WHEN priority = 'High' THEN 3 END`
            ),
            sortOrder[index] === "desc" ? "DESC" : "ASC",
          ];
        } else if (criteria === "dueDate") {
          return [criteria, sortOrder[index] === "desc" ? "DESC" : "ASC"];
        } else {
          return [criteria, sortOrder[index] === "desc" ? "DESC" : "ASC"];
        }
      });
    }

    options.limit = pageLimit;
    options.offset = pageOffset;

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
    const totalTasks = await Task.count({ where: options.where || {} });

    return {
      statusCode: 200,
      data: {
        tasks: processedTasks,
        pagination: {
          total: totalTasks,
          limit: pageLimit,
          offset: pageOffset,
          totalPages: Math.ceil(totalTasks / pageLimit),
          currentPage: Math.ceil(pageOffset / pageLimit) + 1,
        },
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
    await logTaskChange(
      task.id,
      "CREATE",
      `Task created with title: ${task.title}`
    );
    return {
      statusCode: 201,
      data: task,
      message: `Task created successfully`,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return errorResponse(
        400,
        error.errors
          .map((e: any) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")
      );
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
    await logTaskChange(
      id,
      "UPDATE",
      `Task updated with new data: ${JSON.stringify(taskUpdateData)}`
    );

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
    await logTaskChange(id, "DELETE", `Task with id: ${id} was deleted`);
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

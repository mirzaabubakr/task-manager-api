import { TaskLogs } from "../../utils/sequelize/sequelize";

export const logTaskChange = async (
  taskId: string,
  changeType: string,
  changeDetails: string
) => {
  try {
    await TaskLogs.create({
      taskId,
      changeType,
      changeDetails,
    });
    console.log(`Task log created: ${changeType} - ${changeDetails}`);
  } catch (error) {
    console.error("Error logging task change:", error);
  }
};

export const fetchTaskLogs = async (page: number, limit: number) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await TaskLogs.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      statusCode: 200,
      data: {
        logs: rows,
        pagination: {
          total: count,
          limit: limit,
          offset: offset,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching task logs:", error);
    return {
      statusCode: 500,
      message: "Error fetching task logs",
    };
  }
};

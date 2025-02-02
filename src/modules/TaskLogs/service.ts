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

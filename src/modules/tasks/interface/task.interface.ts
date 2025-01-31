export interface TaskData {
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}

export interface TaskUpdateData {
  title?: string;
  description?: string;
  status?: "Completed";
  dueDate?: Date;
  priority?: "Low" | "Medium" | "High";
}

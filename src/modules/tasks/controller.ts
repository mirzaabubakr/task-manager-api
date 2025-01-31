import { Request, Response } from "express";
import {
  getUserTasks,
  createUserTask,
  updateUserTask,
  deleteUserTask,
} from "./service";
import { handleResponse } from "../../shared/response";

export const getTasks = async (req: Request, res: Response) => {
  const result = await getUserTasks(req);
  handleResponse(res, result);
};

export const createTask = async (req: Request, res: Response) => {
  const result = await createUserTask(req.body);
  handleResponse(res, result);
};

export const updateTask = async (req: Request, res: Response) => {
  const result = await updateUserTask(req.params.id, req.body);
  handleResponse(res, result);
};

export const deleteTask = async (req: Request, res: Response) => {
  const result = await deleteUserTask(req.params.id);
  handleResponse(res, result);
};

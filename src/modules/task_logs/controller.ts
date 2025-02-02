import { Request, Response } from "express";
import { handleResponse } from "../../shared/response";
import { fetchTaskLogs } from "./service";

export const getTaskLogs = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await fetchTaskLogs(page, limit);
  handleResponse(res, result);
};

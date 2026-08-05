import { Request, Response } from 'express';
import { departmentsData, Department } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getAllDepartments = (req: Request, res: Response) => {
  return res.json({ success: true, data: departmentsData });
};

export const createDepartment = (req: AuthenticatedRequest, res: Response) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({ success: false, message: 'Department name and code required.' });
  }

  const newDept: Department = {
    id: departmentsData.length + 1,
    name,
    code: code.toUpperCase(),
    created_at: new Date().toISOString()
  };

  departmentsData.push(newDept);

  return res.status(201).json({ success: true, message: 'Department created.', data: newDept });
};

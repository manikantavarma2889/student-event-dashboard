import { Response } from 'express';
import { notificationsData } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getMyNotifications = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const userNotifs = notificationsData.filter(n => n.user_id === userId);

  return res.json({ success: true, count: userNotifs.length, data: userNotifs });
};

export const markNotificationRead = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const notif = notificationsData.find(n => n.id === Number(id) && n.user_id === req.user!.id);

  if (notif) {
    notif.is_read = true;
  }

  return res.json({ success: true, message: 'Notification marked as read.' });
};

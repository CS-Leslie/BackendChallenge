import { Router } from 'express';
import userValidator from '../validators/userValidator.js';
import userMiddleware from '../middlewares/userMiddleware.js';
import userController from '../controllers/userController.js';

const router = Router();

router.post('/user', 
  userValidator.createUser,
  userMiddleware.checkUserExists,
  userController.createUser);

  router.get('/user', 
  userValidator.getUser,
  [userMiddleware.checkUserExists],
  userController.getUser);

router.get('/users',
  userValidator.getUsers, 
  [userMiddleware.checkUserExists],
  userController.getUsers);

router.patch('/user', 
  userValidator.updateUser,
  [userMiddleware.checkUserExists],
  userController.updateUser);

router.delete('/user', 
  userValidator.deleteUser,
  [userMiddleware.checkUserExists],
  userController.deleteUser);

export default router;
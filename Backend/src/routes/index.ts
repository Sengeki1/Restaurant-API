import express from'express';
import { 
    menu, 
    orders, 
    patchOrder,
    deleteOrder
} from './order';
import { createUser, validateUser } from './user';
import { authenticate } from '../controllers/controller';

export const router = express.Router();

// --- Order --- //

router.get('/menu', menu);
router.post('/orders', authenticate, orders);
router.delete('/orders/:id', authenticate, deleteOrder);
router.patch('/orders/:id', authenticate, patchOrder);

// --- User --- //

router.post('/', createUser);
router.post('/user', validateUser);
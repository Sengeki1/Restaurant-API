import express from'express';
import { 
    menu, 
    orders, 
    patchOrder,
    deleteOrder
} from './order';
import { createUser, validateUser } from './user';

export const router = express.Router();

// --- Order --- //

router.get('/menu', menu);
router.post('/orders', orders);
router.delete('/orders/:id', deleteOrder);
router.patch('/orders/:id', patchOrder);

// --- User --- //

router.post('/', createUser);
router.post('/user', validateUser);
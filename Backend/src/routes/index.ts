import express from'express';
import { 
    menu, 
    orders, 
    patchOrder,
    deleteOrder
} from './order';

export const router = express.Router();

// --- Order --- //

router.get('/menu', menu);
router.post('/orders', orders);
router.delete('/orders/:id', deleteOrder); // register routes
router.patch('/orders/:id', patchOrder);

// --- User --- //

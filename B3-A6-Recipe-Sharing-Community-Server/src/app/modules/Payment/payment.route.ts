import express from 'express';
import { paymentControllers } from './payment.controllers';

const router = express.Router();

//------------route for inserting new facility data in DB------------
router.post('/', paymentControllers.sendConfirmation);

//exporting routes
export const paymentRoutes = router;

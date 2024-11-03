import { Request, Response } from 'express';
import { paymentServices } from './payment.services';
/*

----------------controller for sending payment summary after successful booking----------------*/
const sendConfirmation = async (req: Request, res: Response) => {
  const { transactionID, status } = req.query;

  const response = await paymentServices.sendConfirmationService(
    transactionID as string,
    status as string
  );

  res.send(response);
};

//exporting all the controller functions through paymentControllers object
export const paymentControllers = {
  sendConfirmation,
};

import { verifyPayment } from './payment.utils';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Payment } from './payment.model';
import { USER_STATUS } from '../User/user.constant';
import { User } from '../User/user.model';
/*

----------------service function for changing paymnet status of a booking in DB----------------*/
const sendConfirmationService = async (
  transactionID: string,
  status: string
) => {
  await verifyPayment(transactionID);

  const response = await Payment.findOne({ transactionID }).populate('user');

  const query = { _id: response?.user, status: USER_STATUS.ACTIVE };

  const user = await User.findOne(query);

  const filePath = join(__dirname, './payment.views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template
    .replace('{{message}}', status)

    .replace('{{customerName}}', user?.name as string)
    .replace('{{customerEmail}}', user?.email as string)
    .replace('{{customerPhone}}', user?.mobileNumber as string)
    .replace('{{bill}}', response?.payableAmount.toString() as string)
    .replace('{{txnId}}', response?.transactionID as string);

  return template;
};

//exporting all the service functions through facilityServices object
export const paymentServices = {
  sendConfirmationService,
};

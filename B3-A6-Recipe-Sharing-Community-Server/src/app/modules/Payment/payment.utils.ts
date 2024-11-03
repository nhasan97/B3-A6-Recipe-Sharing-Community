import axios from 'axios';
import config from '../../config';
import { TPaymentParams } from './payment.interface';

export const initiatePayment = async ({
  transactionID,
  payableAmount,
  name,
  email,
  phone,
  address = '',
}: TPaymentParams) => {
  const paymentInfo = {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: transactionID,
    success_url: `${config.base_url}/confirmation?transactionID=${transactionID}&status=success`,
    fail_url: `${config.base_url}/confirmation?transactionID=${transactionID}&status=failed`,
    //cancel_url: 'http://localhost:3000',
    cancel_url: 'https://b3-a6-recipe-sharing-community-client.vercel.app',
    amount: payableAmount,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: name,
    cus_email: email,
    cus_add1: address,
    cus_add2: 'N/A',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1206',
    cus_country: 'Bangladesh',
    cus_phone: phone,
    type: 'json',
  };

  const res = await axios.post(config.payment_url!, paymentInfo);

  return res.data;
};

export const verifyPayment = async (transactionID: string) => {
  const params = {
    store_id: config.store_id,
    signature_key: config.signature_key,
    type: 'json',
    request_id: transactionID,
  };
  const res = await axios.get(config.payment_verification_url!, { params });

  return res.data;
};

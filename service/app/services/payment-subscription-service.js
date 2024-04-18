import PaymentSubscription from '../models/payment-subscription.js';

export const createPaymentSubscription = async (params) => {
  const res = await PaymentSubscription.create(params);

  return res;
};

export const updatePaymentSubscription = async (filter, params) => {
  const res = await PaymentSubscription.updateOne(filter, params);
  if (!res) {
    throw new Error('PaymentSubscription not found');
  }

  return res;
};

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// stripe subscription schema
const PaymentSubscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  stripeCustomerId: { type: String, required: false },
  stripeSubscriptionId: { type: String, required: false },
  stripePriceId: { type: String, required: false },
  status: { type: String, required: false },

  // timestamps
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },

  // stripe subscription object
  stripeSubscription: { type: Object, required: false },
  stripePrice: { type: Object, required: false },
  stripeProduct: { type: Object, required: false },

  // stripe customer object
  stripeCustomer: { type: Object, required: false },

  // stripe payment method object
  stripePaymentMethod: { type: Object, required: false },
  stripePaymentMethodId: { type: String, required: false },

  // stripe invoice object
  stripeInvoice: { type: Object, required: false },
  stripeInvoiceId: { type: String, required: false },
});

const PaymentSubscription = mongoose.model(
  'PaymentSubscription',
  PaymentSubscriptionSchema
);

export default PaymentSubscription;

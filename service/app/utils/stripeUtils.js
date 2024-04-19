import stripe from 'stripe';
import logger from './logger.js';
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

export const getStripeCustomerByEmail = async (email) => {
  try {
    const customers = await stripeClient.customers.list({
      email,
      limit: 1,
    });
    return customers; // Return the entire response object from Stripe
  } catch (error) {
    logger.error('Error fetching Stripe customer:', error);
  }
};

export const getCustomerSubscriptions = async (customerId) => {
  const subscriptions = await stripeClient.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });

  return subscriptions;
};

export const createBillingPortalSession = async (customerId, return_url) => {
  const sessions = await stripeClient.billingPortal.sessions.create({
    customer: customerId,
    return_url: return_url,
  });

  return sessions;
};

export const createStripeCustomer = async (userEmail, auth0UserId) => {
  const customer = await stripeClient.customers.create({
    email: userEmail,
    metadata: {
      userId: auth0UserId,
    },
  });

  return customer;
};

export const createCheckoutSession = async (
  customer,
  successUrl,
  cancelUrl,
  lineItems,
  auth0UserId
) => {
  const session = await stripeClient.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    line_items: lineItems,
    metadata: {
      userId: auth0UserId,
    },

    customer: customer.id, // Use the customer ID here
  });

  return session;
};

export const constructStripeEvent = async (rawBody, sig) => {
  const event = stripeClient.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.WEBHOOK_SIGNING_SECRET
  );

  return event;
};

export const retrieveSubscriptions = async (subscription) => {
  const res = await stripeClient.subscriptions.retrieve(subscription);
  return res;
};

export const retrieveCustomer = async (customer) => {
  const res = await stripeClient.customers.retrieve(customer);
  return res;
};

import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Ruta para crear un Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // Monto en centavos (ej: 1000 = $10.00 USD)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Ruta para confirmar el pago (opcional)
app.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    res.json({ success: true, paymentIntent });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
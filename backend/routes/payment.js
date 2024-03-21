import express from "express";
const router = express.Router();

import { isAuthenticatedUser } from "../middlewares/auth.js";
<<<<<<< HEAD
import { stripeCheckoutSession, stripeWebhook } from "../controllers/paymentControllers.js";
=======
import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentControllers.js";
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4

router
  .route("/payment/checkout_session")
  .post(isAuthenticatedUser, stripeCheckoutSession);

<<<<<<< HEAD

  router
  .route("/payment/webhook")
  .post(stripeWebhook);

=======
router.route("/payment/webhook").post(stripeWebhook);
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
export default router;

import { ActionFunctionArgs } from "@remix-run/node";
import {
  validateEvent,
  WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";
import {
  handleOrderPaid,
  handleSubscriptionCanceled,
  handleSubscriptionRevoked,
} from "~/server/services/payments/payment.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Get the raw body for webhook validation
  const rawBody = await request.text();

  try {
    // Validate the webhook event
    const event = validateEvent(
      rawBody,
      Object.fromEntries(request.headers),
      process.env.POLAR_WEBHOOK_SECRET ?? ""
    );

    // Handle different event types
    switch (event.type) {
      case "order.paid":
        await handleOrderPaid(event);
        break;

      case "subscription.canceled":
        await handleSubscriptionCanceled(event);
        break;

      case "subscription.revoked":
        await handleSubscriptionRevoked(event);
        break;

      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    // Return 202 Accepted status
    return new Response("", { status: 202 });
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return new Response("Invalid signature", { status: 403 });
    }

    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
};

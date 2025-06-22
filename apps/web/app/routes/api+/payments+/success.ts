import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession, prisma } from "~/server/services/auth/db.server";

/*
    This route is used to handle the success of the payment.
    It is used to update the subscription status and the user's subscription status.
    It is also used to redirect the user to the dashboard.

    step 1 - get the checkoutId from the params
    step 2 - get the subscription via current user
    step 3 - update the checkoutId in the subscription
    step 4 - todo verification
    step 5 - redirect the user to the dashboard;

    backstep - through webhook there will be call which updates the details in subscription
*/

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const checkout_id = url.searchParams.get("checkout_id");
  console.log("checkoutId", checkout_id);

  if (!checkout_id) {
    return redirect("/feature/home");
  }
  const session = await getSession(request);
  if (!session) {
    return redirect("/auth/signin");
  }

  // verification step

  // const subscription = await prisma.subscription.findUnique({
  //   where: {
  //     userId: session.user.id!,
  //   },
  // });

  // if (!subscription) {
  //   console.log("no subscription found");
  //   return redirect("/feature/home");
  // }

  // await prisma.subscription.update({
  //   where: {
  //     id: subscription.id,
  //   },
  //   data: {
  //     polarCheckoutId: checkoutId,
  //   },
  // });

  await prisma.user.update({
    where: {
      id: session.user.id!,
    },
    data: {
      subscriptionId: "iniit",
    },
  });

  return redirect("/feature/home");
}

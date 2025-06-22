import { authClient } from "../auth/auth-client";

/*
 * checkout
 *  products - the products to checkout
 *  slug - the slug of the product
 *  returns the checkout response
 */
export const checkout = async () => {
  const response = await authClient.checkout({
    products: ["d6fd3bbd-8fae-4302-b4a6-240497c03626"],
    slug: "benificial",
  });
  return response;
};

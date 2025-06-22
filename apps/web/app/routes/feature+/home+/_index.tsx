import { CommonHero } from "@/components/common/CommonHero";
import { User } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import PricingSectionCards from "~/components/common/pricing/PricingComponent";

import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";
export const loader = HomeLoader;

export default function HomeIndex() {
  const user = useLoaderData<typeof HomeLoader>() as User;
  return (
    <>
      <CommonHero />
      {user.subscriptionId === null && <PricingSectionCards />}
    </>
  );
}

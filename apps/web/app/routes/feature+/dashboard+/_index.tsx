import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";
import { useToast } from "~/hooks/use-toast";

export const loader = HomeLoader;
export default function DashboardIndex() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-6 m-2 w-full h-full justify-center items-center">
      Dashboard
      {/* <Button onClick={handleCheckout}>Checkout</Button> */}
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { MessageSquareWarning } from "lucide-react";
import { cn } from "~/lib/utils";

export function CommonSubHeader({
  userName,
  role,
  variant,
  className,
}: {
  userName: string;
  role: string;
  variant: "default" | "warning";
  className?: string;
}) {
  // console.log(role, userName);
  const makeCamle = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Card
      className={cn(
        "shadow-none bg-transparent border-b rounded-md m-2",
        className,
        variant === "warning" && "border-yellow-500"
      )}
    >
      <CardContent className="flex flex-col p-4">
        <CardDescription>Welcome {role && makeCamle(role)}</CardDescription>
        <div className="text-xl font-medium mt-0.5">{userName}</div>
      </CardContent>
      {variant === "warning" && (
        <CardFooter>
          <MessageSquareWarning className="w-4 h-4 text-yellow-500" />
        </CardFooter>
      )}
    </Card>
  );
}

// imports
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserInput } from "@/components/self/user-input";

// remix
import { Form, Link, useNavigate } from "@remix-run/react";
import { useState } from "react";

// hooks
import { toast } from "@/hooks/use-toast";

// loader and action
import { loader as signinLoader } from "@/routes/loader+/auth+/signin";
import { authClient } from "~/server/services/auth/auth-client";
import { GoogleSignInButton } from "~/components/auth/providers/google";
import { OrbitIcon } from "lucide-react";
export const loader = signinLoader;

export default function Signin() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );

  const navigate = useNavigate();

  // action
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Signed in successfully!",
              variant: "default",
            });
            navigate("/");
          },
          onError: (ctx) => {
            console.log("ctx", ctx);
            if (ctx.response.status === 401) {
              setError({
                type: "password",
                message: "invalid email or password",
              });
              toast({
                title: "Error",
                description: "invalid email or password",
                variant: "destructive",
              });
            } else {
              setError({
                type: "error",
                message: "something went wrong",
              });
              toast({
                title: "Error",
                description: "something went wrong",
                variant: "destructive",
              });
            }
          },
        }
      );
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            We recommend using google provider to login
          </CardDescription>
        <GoogleSignInButton />
        </CardHeader>
        <OrbitIcon className="w-full text-center" />
        <CardContent>
          <Form onSubmit={handleSignIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* email input */}
                <UserInput
                  id="email"
                  className="grid gap-2"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error?.type === "email" ? error.message : ""}
                  required
                />
              </div>
              {/* password input */}
              <div className="grid gap-2">
                <UserInput
                  id="password"
                  className="grid gap-2"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={error?.type === "password" ? error.message : ""}
                  required
                />
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              {/* login button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* back to home button */}
              <Button variant="outline" className="w-full">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
            {/* toggle signup link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link to="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

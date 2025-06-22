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
import { Form, Link, useActionData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

// types
import { ORIGIN } from "@/types/action-result";

// hooks
import { toast } from "@/hooks/use-toast";

// loader and action
import { loader as signupLoader } from "@/routes/loader+/auth+/signup";
import {
  authClient,
  signupPayloadSchema,
} from "~/server/services/auth/auth-client";
import { GoogleSignInButton } from "~/components/auth/providers/google";
import { Orbit, OrbitIcon } from "lucide-react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { PROFILE_PICTURES } from "~/models/profilePictures";
export const loader = signupLoader;

export default function Signup() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );
  const [selectedProfilePic, setSelectedProfilePic] = useState(
    PROFILE_PICTURES[0]
  );

  // navigate
  const navigate = useNavigate();

  // action
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = signupPayloadSchema.safeParse({
        email,
        password,
        name,
        confirmPassword,
        image: selectedProfilePic,
      });
      if (!payload.success) {
        setError({
          type: payload.error.issues[0].path[0] as ORIGIN,
          message: payload.error.issues[1].message,
        });
        toast({
          title: "Error",
          description: payload.error.issues[0].message,
          variant: "destructive",
        });
        return;
      }
      await authClient.signUp.email(payload.data, {
        onSuccess: () => {
          toast({
            title: "Signup",
            description: "Signup successful",
            variant: "default",
          });
          navigate("/");
        },
        onError: (ctx) => {
          console.log(ctx);
          if (ctx.response.status === 422) {
            setError({
              type: "email",
              message: "user already exists",
            });
            toast({
              title: "Error",
              description: "email already exists",
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
      });
    } catch (error) {
      console.error(error);
    }
  };

  // component
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            We recommend using google provider to sign up
          </CardDescription>
          <GoogleSignInButton />
        </CardHeader>
        <OrbitIcon className="w-full text-center" />
        <CardContent>
          <Form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              {/* Profile Picture Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Profile Picture</label>
                <div className="flex gap-4">
                  {PROFILE_PICTURES.map((pic, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-full border-2 ${
                        selectedProfilePic === pic
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedProfilePic(pic)}
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={pic} alt={`Profile ${index + 1}`} />
                      </Avatar>
                    </div>
                  ))}
                </div>
                <input
                  type="hidden"
                  name="profilePicUrl"
                  value={selectedProfilePic}
                />
              </div>

              <div className="grid gap-2">
                <UserInput
                  id="email"
                  className="grid gap-2"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={error?.type === "email" ? error.message : ""}
                />
              </div>
              <div className="grid gap-2">
                <UserInput
                  id="name"
                  className="grid gap-2"
                  label="Name"
                  type="text"
                  autoComplete="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <UserInput
                  id="password"
                  className="grid gap-2"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <UserInput
                  id="confirmPassword"
                  className="grid gap-2"
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password !== e.target.value) {
                      setError({
                        type: "password",
                        message: "Passwords do not match",
                      });
                    } else {
                      setError(null);
                    }
                  }}
                  error={error?.type === "password" ? error.message : ""}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link to="/auth/signin" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

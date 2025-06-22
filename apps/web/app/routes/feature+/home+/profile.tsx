import { useState } from "react";
import { useLoaderData, Form, Link } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInput } from "@/components/self/user-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "~/server/services/auth/db.server";
import { updateUser } from "~/server/services/auth/user.server";
import { redirect } from "@remix-run/node";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Persona } from "~/models/persona";
import { PhoneInput } from "~/components/common/utils/phoneInput";

export async function loader({ request }: any) {
  const session = await getSession(request);
  const user = session?.user;
  console.log("user", user);
  if (!user) {
    return redirect("/auth/signin");
  }
  return { user: user };
}

export async function action({ request }: any) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const name = formData.get("name");
  const phone = formData.get("phone")?.toString().replaceAll(" ", "") as string;
  const role = formData.get("role") as string;
  console.log(formData);
  const user = await updateUser(id, name, phone, role);
  return { user };
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();
  const [name, setName] = useState(user?.name || "");
  const [image] = useState(user?.image || "");
  const [email, setEmail] = useState(user?.email || "");
  const [emailVerified] = useState(user?.emailVerified || false);
  const [phone, setPhone] = useState(user?.phone || "");
  const [phoneVerified] = useState(user?.phoneVerified || false);
  const [role, setRole] = useState(user?.role || "");

  return (
    <>
      <CommonSubHeader
        className={"w-fit"}
        variant={user?.profileCompleted ? "default" : "warning"}
        userName={
          user?.profileCompleted
            ? "You have verified your details"
            : "Please enter your phone number and role to access the product"
        }
        role={user?.role || ""}
      />
      <div className="flex flex-col gap-6 max-w-xl m-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={image} alt="@user" />
                  <AvatarFallback>
                    {name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button disabled variant="secondary" size="sm">
                  Hello {name}
                </Button>
              </div>

              {/* Profile Form */}
              <Form method="post" className="flex flex-col gap-4">
                {/* Name */}
                <div className="grid gap-2">
                  <UserInput
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="grid gap-6 grid-cols-2">
                  <div className="flex flex-col gap-2 justify-center">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={user?.email && emailVerified ? true : false}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <Label htmlFor="emailVerified">Email Verified</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="emailVerified"
                        checked={emailVerified}
                        disabled
                      />
                      {!emailVerified && (
                        <Button variant="secondary" size="sm">
                          Verify Email
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="grid gap-6 grid-cols-2">
                  <div className="flex flex-col gap-2 justify-center">
                    <Label htmlFor="phone">Phone</Label>
                    <PhoneInput
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      placeholder="Enter your phone number"
                      disabled={user?.phone ? true : false}
                    />
                    {!user?.phone && (
                      <p className="text-sm text-gray-500">
                        please be careful while entering -
                        <br />
                        <b>{"+<country code><phone number>"}</b>
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <Label htmlFor="phoneVerified">Phone Verified</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="phoneVerified"
                        checked={phoneVerified}
                        disabled
                      />
                      {!phoneVerified && (
                        <Button variant="secondary" size="sm" disabled>
                          Verify Phone
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="grid gap-2 w-fit">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={role}
                    onValueChange={(value) => setRole(value)}
                    name="role"
                    disabled={user?.role ? true : false}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Persona).map((persona) => (
                        <SelectItem key={persona} value={persona}>
                          {persona}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="id" value={user?.id} />
                </div>
                <Button
                  disabled={user?.profileCompleted || !role || !email || !phone}
                  type="submit"
                  className="w-full"
                >
                  Save Changes
                </Button>
                <Link
                  to="/feature/home"
                  className="w-full text-center outline outline-1 outline-gray-300 rounded-md p-2 hover:bg-gray-900"
                >
                  Home
                </Link>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

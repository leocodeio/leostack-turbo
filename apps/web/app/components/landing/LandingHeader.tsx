import { Button } from "@/components/ui/button";
import { Link, useSubmit } from "@remix-run/react";
import { ModeToggle } from "@/components/mode-toggle";

import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { language } from "@/utils/language";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
export default function LandingHeader() {
  const { i18n } = useTranslation();
  const submit = useSubmit();
  const handleLanguageChange = (value: string) => {
    submit(
      { locale: value },
      { method: "post", action: "/action/set-language" }
    );
  };

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 fixed top-0 left-0 right-0  z-50 ">
      <div className="ml-auto flex gap-2">
        <Select
          onValueChange={handleLanguageChange}
          defaultValue={i18n.language}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(language).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" asChild>
          <Link to="/auth/signin">Sign in</Link>
        </Button>
        <Button asChild>
          <Link to="/auth/signup">Sign Up</Link>
        </Button>
      </div>
      <ModeToggle />
      <ThemeColorToggle />
    </header>
  );
}

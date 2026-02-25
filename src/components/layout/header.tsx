import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 px-4">
          <span className="font-bold">Python Course</span>
        </Link>
        <div className="flex items-center gap-4 px-4">
          <ThemeToggle />
          {user ? (
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="sm">
                Выйти
              </Button>
            </form>
          ) : (
            <Link href="/login">
              <Button size="sm">Войти</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

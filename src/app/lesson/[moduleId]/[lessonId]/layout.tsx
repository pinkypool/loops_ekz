import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function LessonLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { moduleId, lessonId } = await params;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Optional sidebar can go here */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Назад к модулям
            </Link>
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            Обучение / Модуль: {moduleId} / Урок: {lessonId}
          </div>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

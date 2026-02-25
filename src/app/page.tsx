import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Mock progress data for now. In reality, fetch from Supabase `progress` table.
  const modules = [
    {
      id: "loops",
      title: "Модуль 1: Инструкции цикла (Loops)",
      description: "Изучение циклов while, for, вложенных циклов и управления потоком.",
      progress: 0,
      isLocked: false,
      lessons: [
        { id: "1.1", title: "Цикл while", completed: false },
        { id: "1.2", title: "Управление потоком", completed: false },
        { id: "1.3", title: "Цикл for и range()", completed: false },
        { id: "1.4", title: "Вложенные циклы", completed: false },
      ],
    },
    {
      id: "lists",
      title: "Модуль 2: Списки (Lists)",
      description: "Создание списков, срезы, методы и list comprehensions.",
      progress: 0,
      isLocked: true, // Will unlock when module 1 is done
      lessons: [
        { id: "2.1", title: "Создание списков и индексы", completed: false },
        { id: "2.2", title: "Срезы (Slices)", completed: false },
        { id: "2.3", title: "Методы списков", completed: false },
        { id: "2.4", title: "List Comprehensions", completed: false },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Добро пожаловать в CS 101</h1>
        <p className="text-muted-foreground mt-2">
          Выберите модуль для начала обучения. Теория, тесты и практика встроены в каждый урок.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((mod) => (
          <Card key={mod.id} className={`flex flex-col ${mod.isLocked ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{mod.title}</CardTitle>
                  <CardDescription className="mt-2">{mod.description}</CardDescription>
                </div>
                {mod.isLocked ? <Lock className="text-muted-foreground" /> : null}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Прогресс</span>
                    <span>{mod.progress}%</span>
                  </div>
                  <Progress value={mod.progress} />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${lesson.completed ? "text-green-500" : "text-border"}`} />
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild disabled={mod.isLocked} className="w-full">
                <Link href={`/lesson/${mod.id}/${mod.lessons[0].id}`}>
                  {mod.progress > 0 ? "Продолжить" : "Начать модуль"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>


    </div>
  );
}

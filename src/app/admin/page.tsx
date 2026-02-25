"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (!res.ok) {
        throw new Error("Неверный пароль");
      }

      const data = await res.json();
      setStudents(data.students);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Панель администратора</CardTitle>
            <CardDescription>Введите код доступа для просмотра прогресса.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent>
              <Input
                type="password"
                placeholder="********"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Войти"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // Calculate stats
  const totalStudents = students.length;
  // Let's assume passed exam if some condition is met. We don't have exams right now. Let's just say "finished loops module"
  const passedLoops = students.filter(s => s.completedLoops === 16).length;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Панель управления учениками</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Всего студентов начавших курс</CardDescription>
            <CardTitle className="text-4xl">{totalStudents}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Завершили модуль "Циклы" (все 16 уроков)</CardDescription>
            <CardTitle className="text-4xl text-green-600">{passedLoops}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список студентов и прогресс</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email (или ID)</TableHead>
                <TableHead>Модуль 1 (Циклы)</TableHead>
                <TableHead>Модуль 2 (Списки)</TableHead>
                <TableHead>Ошибки в коде</TableHead>
                <TableHead>Баллы тестов</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                // We have 16 lessons per module. Progress = completed / 16 * 100
                const loopsPercent = Math.round((student.completedLoops / 16) * 100);
                const listsPercent = Math.round((student.completedLists / 16) * 100);

                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.email}</TableCell>
                    <TableCell>
                      <Badge variant={loopsPercent === 100 ? "default" : "secondary"}>
                        {loopsPercent}% ({student.completedLoops}/16)
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={listsPercent === 100 ? "default" : "secondary"}>
                        {listsPercent}% ({student.completedLists}/16)
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.totalAttempts > 0 ? (
                        <span className="text-yellow-600 font-bold">{student.totalAttempts}</span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-blue-600 font-bold">{student.totalTheoryScore}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
              {students.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Пока нет данных о прогрессе студентов.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

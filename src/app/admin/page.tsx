import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  // Fetch students, progress, exam results...
  // For now, using mock data formatted as how it should be returned from standard Supabase query
  const students = [
    {
      id: "1",
      name: "Студент 1",
      email: "student1@buketov.kz",
      progressLoops: 100,
      progressLists: 25,
      examScore: null,
    },
    {
      id: "2",
      name: "Студент 2",
      email: "student2@buketov.kz",
      progressLoops: 100,
      progressLists: 100,
      examScore: 92,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Панель администратора</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Всего студентов</CardDescription>
            <CardTitle className="text-4xl">45</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Сдали экзамен</CardDescription>
            <CardTitle className="text-4xl text-green-600">12</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Средний балл</CardDescription>
            <CardTitle className="text-4xl text-blue-600">84%</CardTitle>
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
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Модуль 1 (Циклы)</TableHead>
                <TableHead>Модуль 2 (Списки)</TableHead>
                <TableHead>Экзамен</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Badge variant={student.progressLoops === 100 ? "default" : "secondary"}>
                      {student.progressLoops}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.progressLists === 100 ? "default" : "secondary"}>
                      {student.progressLists}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {student.examScore !== null ? (
                      <span className="font-bold text-green-600">{student.examScore}/100</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

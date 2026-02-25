import { modules } from "@/data/lessons";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PythonRunner } from "@/components/editor/python-runner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AntiCopy } from "@/components/ui/anti-copy";

export default async function LessonPage({
  params
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;

  // @ts-expect-error type override
  const moduleData = modules[moduleId];
  if (!moduleData) return notFound();

  const lessonData = moduleData.lessons[lessonId];
  if (!lessonData) return notFound();

  // Calculate next lesson URL
  const currentModuleIds = Object.keys(modules);
  const currentModuleIndex = currentModuleIds.indexOf(moduleId);
  
  const currentLessonIds = Object.keys(moduleData.lessons);
  const currentLessonIndex = currentLessonIds.indexOf(lessonId);

  let nextLessonUrl = "/";
  if (currentLessonIndex < currentLessonIds.length - 1) {
    const nextLessonId = currentLessonIds[currentLessonIndex + 1];
    nextLessonUrl = `/lesson/${moduleId}/${nextLessonId}`;
  } else if (currentModuleIndex < currentModuleIds.length - 1) {
    const nextModuleId = currentModuleIds[currentModuleIndex + 1];
    // @ts-expect-error type override
    const nextModule = modules[nextModuleId];
    const nextLessonId = Object.keys(nextModule.lessons)[0];
    nextLessonUrl = `/lesson/${nextModuleId}/${nextLessonId}`;
  }

  return (
    <div className="container mx-auto max-w-6xl py-6 px-4">
      <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
        
        {/* Left Side: Theory & Tasks */}
        <Card className="h-full flex flex-col overflow-hidden">
          <Tabs defaultValue="theory" className="h-full flex flex-col">
            <div className="px-4 pt-4">
               <TabsList className="w-full grid grid-cols-2">
                 <TabsTrigger value="theory">Теория</TabsTrigger>
                 <TabsTrigger value="task">Задание</TabsTrigger>
               </TabsList>
            </div>
            
            <TabsContent value="theory" className="flex-1 overflow-y-auto p-0 prose prose-slate dark:prose-invert max-w-none select-none">
              <AntiCopy className="h-full w-full p-6" message="Копирование теории запрещено!">
                 <h2>{lessonData.title}</h2>
                 <ReactMarkdown>{lessonData.theory}</ReactMarkdown>
              </AntiCopy>
            </TabsContent>
            
            <TabsContent value="task" className="flex-1 overflow-y-auto p-0 select-none">
              <AntiCopy className="h-full w-full p-6" message="Копирование задания запрещено!">
                 <h3 className="font-bold text-lg mb-4">Практическое задание</h3>
                 <div className="prose prose-slate dark:prose-invert">
                   <ReactMarkdown>{lessonData.task.description}</ReactMarkdown>
                 </div>
              </AntiCopy>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Right Side: IDE */}
        <div className="h-full">
           <PythonRunner 
             initialCode={lessonData.task.initialCode}
             testCases={lessonData.task.testCases}
             solutionCode={lessonData.task.solutionCode}
             hints={lessonData.task.hints}
             nextLessonUrl={nextLessonUrl}
           />
        </div>

      </div>
    </div>
  );
}

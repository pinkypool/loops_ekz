import { modules } from "@/data/lessons";
import { notFound } from "next/navigation";
import { LessonManager } from "@/components/lesson/lesson-manager";

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
      <LessonManager 
        moduleId={moduleId} 
        lessonId={lessonId} 
        lessonData={lessonData} 
        nextLessonUrl={nextLessonUrl} 
      />
    </div>
  );
}

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId, lessonId, theoryScore, codeAttempts, timeSpentSeconds, isCompleted } = body;

    if (!moduleId || !lessonId) {
      return NextResponse.json({ error: "Missing module or lesson ID" }, { status: 400 });
    }

    // Upsert progress. RLS allows users to insert/update their own records based on auth.uid()
    const { data, error } = await supabase
      .from('user_progress')
      .upsert(
        { 
          user_id: user.id,
          module_id: moduleId,
          lesson_id: lessonId,
          ...(theoryScore !== undefined && { theory_score: theoryScore }),
          ...(codeAttempts !== undefined && { code_attempts: codeAttempts }),
          ...(timeSpentSeconds !== undefined && { time_spent_seconds: timeSpentSeconds }),
          ...(isCompleted !== undefined && { is_completed: isCompleted }),
        },
        { onConflict: 'user_id,module_id,lesson_id' }
      )
      .select()
      .single();

    if (error) {
      console.error("Error saving progress:", error);
      return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
    }

    return NextResponse.json({ success: true, progress: data });
  } catch (error) {
    console.error("Progress API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

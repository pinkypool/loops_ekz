import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();
    if (passcode !== "1234") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch users for their emails Bypassing RLS
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    
    // Fetch user progress bypassing RLS
    const { data: progressData, error } = await supabaseAdmin
      .from('user_progress')
      .select('*');

    if (error || usersError) {
      throw error || usersError;
    }

    // Map users
    const emailMap: Record<string, string> = {};
    users.forEach(u => { emailMap[u.id] = u.email || "unknown"; });

    // Group progress by user_id
    const userMap: Record<string, any> = {};
    
    progressData.forEach((row: any) => {
      if (!userMap[row.user_id]) {
        userMap[row.user_id] = { 
          id: row.user_id, 
          email: emailMap[row.user_id] || "unknown", 
          completedLoops: 0, 
          completedLists: 0, 
          totalTheoryScore: 0, 
          totalAttempts: 0 
        };
      }
      
      if (row.module_id === 'loops' && row.is_completed) userMap[row.user_id].completedLoops++;
      if (row.module_id === 'lists' && row.is_completed) userMap[row.user_id].completedLists++;
      
      if (row.theory_score) userMap[row.user_id].totalTheoryScore += row.theory_score;
      if (row.code_attempts) userMap[row.user_id].totalAttempts += row.code_attempts;
    });

    return NextResponse.json({ success: true, students: Object.values(userMap) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

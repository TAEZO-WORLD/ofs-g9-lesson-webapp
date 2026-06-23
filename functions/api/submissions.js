export async function onRequest(context) {
  const { request, env } = context;
  
  // Handle preflight options request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-teacher-passcode',
      },
    });
  }

  const url = new URL(request.url);

  if (request.method === 'POST') {
    return handlePost(request, env);
  } else if (request.method === 'GET') {
    return handleGet(request, url, env);
  }

  return new Response('Method not allowed', { status: 405 });
}

async function handlePost(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const data = await request.json();
    const { studentName, studentCode, lessonSlug, lessonTitle } = data;

    if (!studentName || !studentCode || !lessonSlug || !lessonTitle) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: studentName, studentCode, lessonSlug, or lessonTitle' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const db = env.LESSON_DB;
    if (!db) {
      return new Response(
        JSON.stringify({ error: 'LESSON_DB binding is not configured on the server.' }),
        { status: 503, headers: corsHeaders }
      );
    }

    // Auto-create table if not exists with new schema
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        lesson_slug TEXT NOT NULL,
        lesson_title TEXT NOT NULL,
        student_name TEXT NOT NULL,
        student_code TEXT NOT NULL,
        attempt_number INTEGER NOT NULL,
        payload TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `).run();

    // Calculate attempt number: count existing submissions for this lesson and student code
    const countResult = await db.prepare(
      `SELECT COUNT(*) as count FROM submissions WHERE lesson_slug = ? AND student_code = ?`
    ).bind(lessonSlug, studentCode).first();
    const attemptNumber = (countResult?.count || 0) + 1;

    // Create unique ID and timestamp
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    
    // Add attempt number to payload
    const submissionPayload = {
      ...data,
      attemptNumber
    };
    const payloadStr = JSON.stringify(submissionPayload);

    await db.prepare(`
      INSERT INTO submissions (id, lesson_slug, lesson_title, student_name, student_code, attempt_number, payload, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(id, lessonSlug, lessonTitle, studentName, studentCode, attemptNumber, payloadStr, createdAt).run();

    return new Response(
      JSON.stringify({ success: true, id, attemptNumber }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function handleGet(request, url, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const lessonSlug = url.searchParams.get('lessonSlug');
    const teacherPasscode = request.headers.get('x-teacher-passcode');

    const expectedPasscode = env.TEACHER_PASSCODE;
    if (!expectedPasscode) {
      return new Response(
        JSON.stringify({ error: 'Submission monitoring is not connected yet. Check TEACHER_PASSCODE.' }),
        { status: 503, headers: corsHeaders }
      );
    }

    if (!teacherPasscode || teacherPasscode !== expectedPasscode) {
      return new Response(
        JSON.stringify({ error: 'Invalid teacher passcode.' }),
        { status: 401, headers: corsHeaders }
      );
    }

    const db = env.LESSON_DB;
    if (!db) {
      return new Response(
        JSON.stringify({ error: 'Submission monitoring is not connected yet. Check Cloudflare D1 binding.' }),
        { status: 503, headers: corsHeaders }
      );
    }

    // Auto-create table if not exists
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        lesson_slug TEXT NOT NULL,
        lesson_title TEXT NOT NULL,
        student_name TEXT NOT NULL,
        student_code TEXT NOT NULL,
        attempt_number INTEGER NOT NULL,
        payload TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `).run();

    let query = `SELECT * FROM submissions`;
    let params = [];
    if (lessonSlug) {
      query += ` WHERE lesson_slug = ?`;
      params.push(lessonSlug);
    }
    query += ` ORDER BY created_at DESC`;

    const { results } = await db.prepare(query).bind(...params).all();

    const submissions = results.map(row => {
      let parsedPayload = {};
      try {
        parsedPayload = JSON.parse(row.payload);
      } catch (e) {}
      return {
        id: row.id,
        lessonSlug: row.lesson_slug,
        lessonTitle: row.lesson_title,
        studentName: row.student_name,
        studentCode: row.student_code,
        attemptNumber: row.attempt_number,
        createdAt: row.created_at,
        payload: parsedPayload
      };
    });

    return new Response(
      JSON.stringify({ submissions }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  
  // Handle preflight options request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const url = new URL(request.url);

  if (request.method === 'POST') {
    return handlePost(request, env);
  } else if (request.method === 'GET') {
    return handleGet(url, env);
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
    const { studentName, lessonSlug, lessonTitle } = data;

    if (!studentName || !lessonSlug || !lessonTitle) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: studentName, lessonSlug, or lessonTitle' }),
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

    // Auto-create table if not exists
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        lesson_slug TEXT NOT NULL,
        lesson_title TEXT NOT NULL,
        student_name TEXT NOT NULL,
        payload TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `).run();

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const payloadStr = JSON.stringify(data);

    await db.prepare(`
      INSERT INTO submissions (id, lesson_slug, lesson_title, student_name, payload, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(id, lessonSlug, lessonTitle, studentName, payloadStr, createdAt).run();

    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function handleGet(url, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const lessonSlug = url.searchParams.get('lessonSlug');
    const teacherPasscode = url.searchParams.get('teacherPasscode');

    const expectedPasscode = env.TEACHER_PASSCODE;
    if (!expectedPasscode) {
      return new Response(
        JSON.stringify({ error: 'TEACHER_PASSCODE is not configured on the server.' }),
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
        JSON.stringify({ error: 'LESSON_DB binding is not configured on the server.' }),
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

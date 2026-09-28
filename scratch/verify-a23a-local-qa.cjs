const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

function norm(s) {
  return s.normalize('NFC').replace(/\s+/g, ' ').trim();
}

function getHash(str) {
  return crypto.createHash('sha256').update(norm(str), 'utf8').digest('hex');
}

function startStaticServer(port) {
  const distDir = path.join(__dirname, '../dist');
  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url.split('?')[0]);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const contentType = ext === '.json' ? 'application/json' : ext === '.js' ? 'application/javascript' : ext === '.css' ? 'text/css' : 'text/html';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fs.readFileSync(filePath));
    } else {
      // SPA Fallback to index.html for page routes
      const indexPath = path.join(distDir, 'index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(indexPath));
    }
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

async function runLocalQA() {
  console.log('=== STARTING LOCAL BROWSER QA VERIFICATION FOR A23A ICEBERG LESSON ===');
  const server = await startStaticServer(4173);

  try {
    // 1. Data URL test
    const dataUrl = 'http://127.0.0.1:4173/lessons/2026-09-28-a23a-iceberg-disappears/lesson-data.json';
    console.log(`[1] Fetching local lesson data: ${dataUrl}`);
    const dataRes = await fetchUrl(dataUrl);
    if (dataRes.statusCode !== 200) throw new Error(`Local lesson-data.json returned status ${dataRes.statusCode}`);
    
    const lessonObj = JSON.parse(dataRes.body);
    if (lessonObj.lessonTitle !== "World’s Biggest Iceberg Disappears After 40 Years") throw new Error("Local data title mismatch");
    console.log('Local lesson-data.json returned valid JSON with correct title!');

    // Check source hashes
    const p1 = lessonObj.article.paragraphs[0];
    const p2 = lessonObj.article.paragraphs[1];
    const p3 = lessonObj.article.paragraphs[2];
    const p4 = lessonObj.article.paragraphs[3];

    const p1Hash = getHash(p1);
    const p2Hash = getHash(p2);
    const p3Hash = getHash(p3);
    const p4Hash = getHash(p4);
    const bodyCombined = [p1, p2, p3, p4].join(' ');
    const bodyHash = getHash(bodyCombined);

    if (p1Hash !== "3ac6c302267ba99dd1becc06e24f29c2888839a8059246b91170a87bcae4c994") throw new Error("P1 hash mismatch");
    if (p2Hash !== "f1e2c33c97b37f0ccf08cb5b3c69f8cc2f850e6d7e2c21f54a296e4bdee50303") throw new Error("P2 hash mismatch");
    if (p3Hash !== "02f61f0b78df32410c7526fe2f018ffe307f67c20a5a3de9b504c7fb08a5b00a") throw new Error("P3 hash mismatch");
    if (p4Hash !== "3360b6a00485032021a1e9b2d82e4ff68fb4e2c050494e709c39f230f2b5b4f8") throw new Error("P4 hash mismatch");
    if (bodyHash !== "561d682a32bffc13decf7436bc023253b0d1f77a8ed3a61c4828bee7f36e086d") throw new Error("Body hash mismatch");

    console.log('Local JSON source hashes verified matching fixture SHA-256 values!');

    // 2. Student page route test
    const studentUrl = 'http://127.0.0.1:4173/lessons/2026-09-28-a23a-iceberg-disappears/student';
    console.log(`[2] Fetching student page HTML: ${studentUrl}`);
    const studentRes = await fetchUrl(studentUrl);
    if (studentRes.statusCode !== 200) throw new Error(`Student page returned status ${studentRes.statusCode}`);
    if (!studentRes.body.includes('<div id="root">')) throw new Error("Student page HTML missing #root container");
    console.log('Student page HTML returned 200 OK!');

    // 3. Teacher page route test
    const teacherUrl = 'http://127.0.0.1:4173/lessons/2026-09-28-a23a-iceberg-disappears/teacher';
    console.log(`[3] Fetching teacher page HTML: ${teacherUrl}`);
    const teacherRes = await fetchUrl(teacherUrl);
    if (teacherRes.statusCode !== 200) throw new Error(`Teacher page returned status ${teacherRes.statusCode}`);
    if (!teacherRes.body.includes('<div id="root">')) throw new Error("Teacher page HTML missing #root container");
    console.log('Teacher page HTML returned 200 OK!');

    // 4. Archive route test
    const archiveUrl = 'http://127.0.0.1:4173/lessons';
    console.log(`[4] Fetching archive page HTML: ${archiveUrl}`);
    const archiveRes = await fetchUrl(archiveUrl);
    if (archiveRes.statusCode !== 200) throw new Error(`Archive page returned status ${archiveRes.statusCode}`);
    console.log('Archive page HTML returned 200 OK!');

    // 5. Preceding lesson test (sweden)
    const prevDataUrl = 'http://127.0.0.1:4173/lessons/2026-09-21-sweden-forests-fika/lesson-data.json';
    console.log(`[5] Fetching preceding lesson data: ${prevDataUrl}`);
    const prevDataRes = await fetchUrl(prevDataUrl);
    if (prevDataRes.statusCode !== 200) throw new Error(`Preceding lesson data returned status ${prevDataRes.statusCode}`);
    const prevLessonObj = JSON.parse(prevDataRes.body);
    if (prevLessonObj.lessonTitle !== "Sweden: Forests, Fika, and Fantastic Ideas") throw new Error("Preceding lesson title mismatch");
    console.log('Preceding lesson data verified intact!');

    console.log('=== LOCAL BROWSER QA PASSED SUCCESSFULLY! ===');
  } finally {
    server.close();
  }
}

runLocalQA().catch(err => {
  console.error('Local QA failed:', err);
  process.exit(1);
});

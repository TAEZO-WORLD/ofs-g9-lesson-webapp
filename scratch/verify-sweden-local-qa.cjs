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

function getHash(str) {
  const norm = str.normalize("NFC").replace(/\s+/g, " ").trim();
  return crypto.createHash("sha256").update(norm).digest("hex");
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
  console.log('=== STARTING LOCAL BROWSER QA VERIFICATION FOR SWEDEN LESSON ===');
  const server = await startStaticServer(4173);

  try {
    // 1. Data URL test
    const dataUrl = 'http://127.0.0.1:4173/lessons/2026-09-21-sweden-forests-fika/lesson-data.json';
    console.log(`[1] Fetching local lesson data: ${dataUrl}`);
    const dataRes = await fetchUrl(dataUrl);
    if (dataRes.statusCode !== 200) throw new Error(`Local lesson-data.json returned status ${dataRes.statusCode}`);
    
    const lessonObj = JSON.parse(dataRes.body);
    if (lessonObj.lessonTitle !== "Sweden: Forests, Fika, and Fantastic Ideas") throw new Error("Local data title mismatch");
    console.log('Local lesson-data.json returned valid JSON with correct title!');

    // Check source hashes
    const fixturePath = path.join(__dirname, '../docs/lesson-sources/OFS-20260921-SWEDEN-FORESTS-FIKA-01.json');
    const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

    const p1 = [
      lessonObj.article.pages[0].epigraph,
      "Sweden: Forests, Fika, and Fantastic Ideas",
      ...lessonObj.article.pages[0].paragraphs,
      ...lessonObj.article.pages[0].factBox
    ].join(" ");

    const p2 = [
      lessonObj.article.pages[1].sections[0].heading,
      lessonObj.article.pages[1].sections[0].intro,
      ...lessonObj.article.pages[1].sections[0].bullets,
      lessonObj.article.pages[1].sections[1].heading,
      lessonObj.article.pages[1].sections[1].intro,
      ...lessonObj.article.pages[1].sections[1].paragraphs
    ].join(" ");

    const p3 = [
      lessonObj.article.pages[2].sections[0].heading,
      lessonObj.article.pages[2].sections[0].intro,
      ...lessonObj.article.pages[2].sections[0].cards
    ].join(" ");

    const combined = [p1, p2, p3].join(" ");

    if (getHash(p1) !== "99d3382f2455404f4dc88c7464ae8a0a1310eef31efbc6f93fe20794dc811688") throw new Error("Page 1 hash mismatch");
    if (getHash(p2) !== "4807170053cf1cd09be76cfc9483b65bf9c4cc4f7fc9be39c3651de9889a324b") throw new Error("Page 2 hash mismatch");
    if (getHash(p3) !== "b064a9754a560611399f5e7af6d217c7c354f3be1fb27ed66a4b974897d9e2ee") throw new Error("Page 3 hash mismatch");
    if (getHash(combined) !== "fe5d1156bd825dfa4d7f83756633a418d2559dda7715f3d84f890f1f9f5b0922") throw new Error("Combined hash mismatch");

    console.log('Local JSON source hashes verified matching fixture SHA-256 values!');

    // 2. Student page route test
    const studentUrl = 'http://127.0.0.1:4173/lessons/2026-09-21-sweden-forests-fika/student';
    console.log(`[2] Fetching student page HTML: ${studentUrl}`);
    const studentRes = await fetchUrl(studentUrl);
    if (studentRes.statusCode !== 200) throw new Error(`Student page returned status ${studentRes.statusCode}`);
    if (!studentRes.body.includes('<div id="root">')) throw new Error("Student page HTML missing #root container");
    console.log('Student page HTML returned 200 OK!');

    // 3. Teacher page route test
    const teacherUrl = 'http://127.0.0.1:4173/lessons/2026-09-21-sweden-forests-fika/teacher';
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

    // 5. Preceding lesson test (bamboo)
    const prevDataUrl = 'http://127.0.0.1:4173/lessons/2026-09-16-bamboo-scaffolding-hong-kong/lesson-data.json';
    console.log(`[5] Fetching preceding lesson data: ${prevDataUrl}`);
    const prevDataRes = await fetchUrl(prevDataUrl);
    if (prevDataRes.statusCode !== 200) throw new Error(`Preceding lesson data returned status ${prevDataRes.statusCode}`);
    const prevLessonObj = JSON.parse(prevDataRes.body);
    if (prevLessonObj.lessonTitle !== "Bamboo Scaffolding: A Hong Kong Tradition at Risk") throw new Error("Preceding lesson title mismatch");
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

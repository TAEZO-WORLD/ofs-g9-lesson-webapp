const https = require('https');

function fetchProdUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', err => resolve({ statusCode: 0, error: err.message }));
  });
}

async function verifyProduction() {
  const targetSlug = '2026-08-31-mars-leopard-spots-evidence';
  const expectedTitleSnippet = 'Ancient Life on Mars';
  const prodUrls = {
    lessonData: `https://ofs-g9-lesson-webapp-pages.pages.dev/lessons/${targetSlug}/lesson-data.json`,
    lessonIndex: 'https://ofs-g9-lesson-webapp-pages.pages.dev/lessons/lesson-index.json',
    archive: 'https://ofs-g9-lesson-webapp-pages.pages.dev/lessons',
    student: `https://ofs-g9-lesson-webapp-pages.pages.dev/lessons/${targetSlug}/student`,
    teacher: `https://ofs-g9-lesson-webapp-pages.pages.dev/lessons/${targetSlug}/teacher`
  };

  console.log("Checking Cloudflare Pages Production Deployment for New Lesson...\n");

  let deployed = false;
  let attempts = 0;
  const maxAttempts = 18;

  while (attempts < maxAttempts && !deployed) {
    attempts++;
    console.log(`Attempt ${attempts}/${maxAttempts}: Checking production lesson-data.json title...`);
    const res = await fetchProdUrl(prodUrls.lessonData);
    if (res.statusCode === 200) {
      try {
        const json = JSON.parse(res.body);
        if (json.lessonTitle && json.lessonTitle.includes(expectedTitleSnippet)) {
          deployed = true;
          console.log(`SUCCESS: Production deployment detected for '${json.lessonTitle}'!`);
          break;
        }
      } catch (e) {}
    }
    console.log(`Status: ${res.statusCode}. Waiting 10s for Cloudflare Pages build...`);
    await new Promise(r => setTimeout(r, 10000));
  }

  if (!deployed) {
    console.error("FAIL: Cloudflare Pages did not deploy new lesson version within timeout.");
    process.exit(1);
  }

  console.log("\nVerifying all production endpoints...\n");
  for (const [key, url] of Object.entries(prodUrls)) {
    const res = await fetchProdUrl(url);
    console.log(`URL [${key}]: ${url} -> Status: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      console.error(`FAIL: ${url} returned ${res.statusCode}`);
      process.exit(1);
    }
  }

  // Check lesson index title and latest
  const indexRes = await fetchProdUrl(prodUrls.lessonIndex);
  const indexJson = JSON.parse(indexRes.body);
  console.log(`Production lesson-index latest: ${indexJson.latest}`);
  console.log(`Production latest title: ${indexJson.lessons[0].title}`);

  if (indexJson.latest !== targetSlug) {
    console.error(`FAIL: Production lesson-index latest is not ${targetSlug}!`);
    process.exit(1);
  }
  if (!indexJson.lessons[0].title.includes(expectedTitleSnippet)) {
    console.error("FAIL: Production lesson-index title not updated!");
    process.exit(1);
  }

  console.log("\nALL CLOUDFLARE PRODUCTION VERIFICATION CHECKS PASSED SUCCESSFULLY!");
}

verifyProduction();

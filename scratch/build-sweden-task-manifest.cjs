const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const indexPath = path.join(__dirname, '../public/lessons/lesson-index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const baselineSlugs = index.lessons.map(l => l.slug);
const preExistingLessonHashes = {};

for (const slug of baselineSlugs) {
  const file = path.join(__dirname, '../public/lessons', slug, 'lesson-data.json');
  const buf = fs.readFileSync(file);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  preExistingLessonHashes[slug] = hash;
}

const taskManifest = {
  taskId: "OFS-20260921-SWEDEN-FORESTS-FIKA-01",
  operation: "CREATE_NEW_LESSON",
  lessonSlug: "2026-09-21-sweden-forests-fika",
  title: "Sweden: Forests, Fika, and Fantastic Ideas",
  unit: "Unit 1 — Global Cultures, Identity & Daily Life",
  level: "OFS Grade 9 International English G1/G2 ESL",
  readingType: "Cultural Profile / Informational Visual Text",
  writingType: "Evidence-Based Cultural Profile Paragraph",
  duration: "90 minutes",
  createdAt: new Date().toISOString(),
  baselineLessonCount: baselineSlugs.length,
  baselineSlugs,
  priorIndexLatest: index.latest,
  priorIndexEntries: index.lessons,
  preExistingLessonHashes,
  sourceInventory: [
    {
      page: 1,
      title: "Sweden: Forests, Fika, and Fantastic Ideas",
      note: "Page 1: Epigraph by Walt Whitman, introduction, capital, fact box (population, size, currency, language)."
    },
    {
      page: 2,
      title: "What shaped its identity? / What Is Sweden Dealing With Today?",
      note: "Page 2: Identity background (Vikings, 1600s, 1900s) and current social questions (safety/inclusion, crime, refugees/immigrants)."
    },
    {
      page: 3,
      title: "What is daily life like?",
      note: "Page 3: Daily life routines (school & free hot lunch, fika snack break, public transit/biking, outdoor nature activities)."
    }
  ]
};

const taskPath = path.join(__dirname, '../docs/lesson-tasks/OFS-20260921-SWEDEN-FORESTS-FIKA-01.json');
fs.writeFileSync(taskPath, JSON.stringify(taskManifest, null, 2), 'utf8');
console.log(`Sweden task manifest created successfully with ${baselineSlugs.length} baseline lessons!`);

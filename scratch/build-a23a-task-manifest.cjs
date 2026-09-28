const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const indexPath = path.join(__dirname, '../public/lessons/lesson-index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const baselineSlugs = index.lessons.map(l => l.slug);
const baselineLessonCount = baselineSlugs.length;
const priorIndexLatest = index.latest;
const priorIndexEntries = index.lessons;

const preExistingLessonHashes = {};
for (const slug of baselineSlugs) {
  const filePath = path.join(__dirname, '../public/lessons', slug, 'lesson-data.json');
  const content = fs.readFileSync(filePath);
  preExistingLessonHashes[slug] = crypto.createHash('sha256').update(content).digest('hex');
}

const taskManifest = {
  taskId: "OFS-20260928-A23A-ICEBERG-01",
  operation: "CREATE_NEW_LESSON",
  lessonSlug: "2026-09-28-a23a-iceberg-disappears",
  title: "World’s Biggest Iceberg Disappears After 40 Years",
  unit: "Unit 2 — Earth, Climate & Change",
  level: "OFS Grade 9 International English G1/G2 ESL",
  readingType: "Informational News Report",
  writingType: "Evidence-Based Environmental Explanation Paragraph",
  duration: "90 minutes",
  createdAt: new Date().toISOString(),
  baselineLessonCount,
  baselineSlugs,
  priorIndexLatest,
  priorIndexEntries,
  preExistingLessonHashes
};

const outputPath = path.join(__dirname, '../docs/lesson-tasks/OFS-20260928-A23A-ICEBERG-01.json');
fs.writeFileSync(outputPath, JSON.stringify(taskManifest, null, 2), 'utf8');
console.log(`Task manifest created successfully at ${outputPath}`);

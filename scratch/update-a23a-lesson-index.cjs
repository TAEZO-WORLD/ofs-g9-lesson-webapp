const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../public/lessons/lesson-index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntry = {
  "slug": "2026-09-28-a23a-iceberg-disappears",
  "title": "World’s Biggest Iceberg Disappears After 40 Years",
  "ofsUnit": "Unit 2 — Earth, Climate & Change",
  "textType": "Informational News Report / Evidence-Based Environmental Explanation Paragraph",
  "date": "2026-09-28"
};

// Check if entry already exists
const existingIndex = index.lessons.findIndex(l => l.slug === newEntry.slug);
if (existingIndex !== -1) {
  index.lessons[existingIndex] = newEntry;
} else {
  index.lessons.unshift(newEntry);
}

index.latest = newEntry.slug;

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
console.log(`Updated lesson-index.json successfully. Latest is now ${index.latest}. Total lessons: ${index.lessons.length}`);

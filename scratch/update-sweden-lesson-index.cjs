const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../public/lessons/lesson-index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntry = {
  "slug": "2026-09-21-sweden-forests-fika",
  "title": "Sweden: Forests, Fika, and Fantastic Ideas",
  "ofsUnit": "Unit 1 — Global Cultures, Identity & Daily Life",
  "textType": "Cultural Profile / Informational Visual Text",
  "date": "2026-09-21"
};

// Check if already present to prevent duplicate
const existsIndex = index.lessons.findIndex(l => l.slug === newEntry.slug);
if (existsIndex >= 0) {
  index.lessons[existsIndex] = newEntry;
} else {
  index.lessons.unshift(newEntry);
}

index.latest = newEntry.slug;

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
console.log(`Updated lesson-index.json. Latest set to: ${index.latest}. Total lessons: ${index.lessons.length}`);

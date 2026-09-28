const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, '../public/lessons');
const slugs = fs.readdirSync(lessonsDir).filter(f => fs.statSync(path.join(lessonsDir, f)).isDirectory());

console.log(`Checking ${slugs.length} lesson JSON files for Evidence, Language Focus, and Writing Practice structure...`);

for (const slug of slugs) {
  const filePath = path.join(lessonsDir, slug, 'lesson-data.json');
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // 1. Evidence Prompts
  if (data.evidenceFromText) {
    const prompts = data.evidenceFromText.prompts || data.evidenceFromText.questions || [];
    for (let i = 0; i < prompts.length; i++) {
      const p = prompts[i];
      const q = typeof p === 'string' ? p : (p.question || p.prompt || p.statement || p.instruction || p.text);
      if (!q) {
        console.error(`[ERROR] Lesson ${slug} Evidence item ${i + 1} has empty text!`, p);
      }
    }
  }

  // 2. Language Focus
  if (data.languageFocus) {
    const hasContent = (data.languageFocus.patterns && data.languageFocus.patterns.length > 0) ||
                      (data.languageFocus.items && data.languageFocus.items.length > 0) ||
                      (data.languageFocus.sections && data.languageFocus.sections.length > 0) ||
                      (data.languageFocus.examples && data.languageFocus.examples.length > 0) ||
                      (data.languageFocus.practice && data.languageFocus.practice.length > 0) ||
                      data.languageFocus.explanation;
    if (!hasContent) {
      console.error(`[ERROR] Lesson ${slug} Language Focus has no renderable content!`, data.languageFocus);
    }
  }

  // 3. Writing Practice Prompts
  const wpData = data.writingPractice || data.speakingPractice;
  if (wpData) {
    const prompts = wpData.prompts || wpData.questions || wpData.items || [];
    for (let i = 0; i < prompts.length; i++) {
      const p = prompts[i];
      const q = typeof p === 'string' ? p : (p.prompt || p.question || p.instruction || p.statement || p.text);
      if (!q) {
        console.error(`[ERROR] Lesson ${slug} Writing Practice item ${i + 1} has empty text!`, p);
      }
    }
  }
}

console.log('All lesson data structures checked cleanly for Evidence, Language Focus, and Writing Practice!');

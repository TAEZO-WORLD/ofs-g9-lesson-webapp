const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('=== STARTING SWEDEN FORESTS FIKA LESSON VALIDATION ===');

const lessonPath = path.join(__dirname, '../public/lessons/2026-09-21-sweden-forests-fika/lesson-data.json');
const fixturePath = path.join(__dirname, '../docs/lesson-sources/OFS-20260921-SWEDEN-FORESTS-FIKA-01.json');
const taskPath = path.join(__dirname, '../docs/lesson-tasks/OFS-20260921-SWEDEN-FORESTS-FIKA-01.json');
const indexPath = path.join(__dirname, '../public/lessons/lesson-index.json');

const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const taskManifest = JSON.parse(fs.readFileSync(taskPath, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

function getHash(str) {
  const norm = str.normalize("NFC").replace(/\s+/g, " ").trim();
  return crypto.createHash("sha256").update(norm).digest("hex");
}

// 1. Basic Metadata
console.log('[1] Checking basic metadata...');
if (lesson.lessonTitle !== "Sweden: Forests, Fika, and Fantastic Ideas") throw new Error("Invalid title");
if (lesson.ofsUnit !== "Unit 1 — Global Cultures, Identity & Daily Life") throw new Error("Invalid unit");
if (lesson.textType !== "Cultural Profile / Informational Visual Text") throw new Error("Invalid textType");
if (lesson.writingType !== "Evidence-Based Cultural Profile Paragraph") throw new Error("Invalid writingType");
if (lesson.duration !== "90 minutes") throw new Error("Invalid duration");
if (lesson.level !== "OFS Grade 9 International English G1/G2 ESL") throw new Error("Invalid level");

// 2. Count Checks
console.log('[2] Checking section item counts...');
if (lesson.warmUp.questions.length !== 3) throw new Error(`Warmup questions count: ${lesson.warmUp.questions.length} (expected 3)`);
if (lesson.vocabularyInContext.items.length !== 10) throw new Error(`Vocab count: ${lesson.vocabularyInContext.items.length} (expected 10)`);
if (!lesson.mainIdeaQuestion || lesson.mainIdeaQuestion.correctIndex !== 1) throw new Error(`Main Idea invalid (correctIndex != 1)`);
if (lesson.readingComprehension.questions.length !== 6) throw new Error(`RC questions count: ${lesson.readingComprehension.questions.length} (expected 6)`);
if (lesson.evidenceFromText.prompts.length !== 3) throw new Error(`Evidence prompts count: ${lesson.evidenceFromText.prompts.length} (expected 3)`);
if (lesson.writingPractice.prompts.length !== 4) throw new Error(`Writing practice items count: ${lesson.writingPractice.prompts.length} (expected 4)`);
if (lesson.selfCheck.items.length !== 6) throw new Error(`Self check count: ${lesson.selfCheck.items.length} (expected 6)`);

// 3. Final Task Model Answer Word Count (110 - 130 words)
console.log('[3] Checking final task model answer word count...');
const modelWords = lesson.teacher.modelAnswer.trim().split(/\s+/).filter(Boolean).length;
console.log(`Final Task Model Answer Word Count: ${modelWords} words`);
if (modelWords < 110 || modelWords > 130) throw new Error(`Model answer word count ${modelWords} out of range 110-130!`);

// 4. Source Preservation & Hashes against Fixture
console.log('[4] Checking source preservation and SHA-256 hashes against fixture...');

// Reconstruct page text strings from lesson.article.pages
const p1 = [
  lesson.article.pages[0].epigraph,
  "Sweden: Forests, Fika, and Fantastic Ideas",
  ...lesson.article.pages[0].paragraphs,
  ...lesson.article.pages[0].factBox
].join(" ");

const p2 = [
  lesson.article.pages[1].sections[0].heading,
  lesson.article.pages[1].sections[0].intro,
  ...lesson.article.pages[1].sections[0].bullets,
  lesson.article.pages[1].sections[1].heading,
  lesson.article.pages[1].sections[1].intro,
  ...lesson.article.pages[1].sections[1].paragraphs
].join(" ");

const p3 = [
  lesson.article.pages[2].sections[0].heading,
  lesson.article.pages[2].sections[0].intro,
  ...lesson.article.pages[2].sections[0].cards
].join(" ");

const combined = [p1, p2, p3].join(" ");

const p1Hash = getHash(p1);
const p2Hash = getHash(p2);
const p3Hash = getHash(p3);
const combinedHash = getHash(combined);

console.log('Page 1 Hash:', p1Hash);
console.log('Page 2 Hash:', p2Hash);
console.log('Page 3 Hash:', p3Hash);
console.log('Combined Hash:', combinedHash);

const expectedP1 = "99d3382f2455404f4dc88c7464ae8a0a1310eef31efbc6f93fe20794dc811688";
const expectedP2 = "4807170053cf1cd09be76cfc9483b65bf9c4cc4f7fc9be39c3651de9889a324b";
const expectedP3 = "b064a9754a560611399f5e7af6d217c7c354f3be1fb27ed66a4b974897d9e2ee";
const expectedCombined = "fe5d1156bd825dfa4d7f83756633a418d2559dda7715f3d84f890f1f9f5b0922";

if (p1Hash !== expectedP1) throw new Error(`Page 1 hash mismatch! Got: ${p1Hash}`);
if (p2Hash !== expectedP2) throw new Error(`Page 2 hash mismatch! Got: ${p2Hash}`);
if (p3Hash !== expectedP3) throw new Error(`Page 3 hash mismatch! Got: ${p3Hash}`);
if (combinedHash !== expectedCombined) throw new Error(`Combined hash mismatch! Got: ${combinedHash}`);

// 5. Check 21 Sentence Units in detailedReadingGuide
console.log('[5] Checking detailed reading guide sentence units...');
const sentenceAnalysis = lesson.teacher.detailedReadingGuide.sentenceAnalysis;
if (!sentenceAnalysis || sentenceAnalysis.length !== 21) {
  throw new Error(`Detailed reading guide sentence count: ${sentenceAnalysis ? sentenceAnalysis.length : 0} (expected 21)`);
}

for (let i = 0; i < 21; i++) {
  const sent = sentenceAnalysis[i];
  if (sent.sentenceNumber !== i + 1) throw new Error(`Sentence number mismatch at index ${i}`);
  if (sent.original !== fixture.sentenceUnits[i]) {
    throw new Error(`Sentence ${i + 1} original text mismatch!\nExpected: "${fixture.sentenceUnits[i]}"\nGot: "${sent.original}"`);
  }
  
  // Feynman Explanation 3-5 sentence check
  const feynman = sent.feynmanExplanation;
  if (!feynman) throw new Error(`Sentence ${i + 1} missing Feynman explanation`);
  const sentencesCount = feynman.split('.').map(s => s.trim()).filter(Boolean).length;
  if (sentencesCount < 3 || sentencesCount > 5) {
    throw new Error(`Sentence ${i + 1} Feynman explanation has ${sentencesCount} sentences (expected 3-5)!`);
  }
}

// 6. Pre-existing Lesson Hash Integrity
console.log('[6] Checking pre-existing lesson hash integrity...');
for (const slug of taskManifest.baselineSlugs) {
  const file = path.join(__dirname, '../public/lessons', slug, 'lesson-data.json');
  const buf = fs.readFileSync(file);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  if (hash !== taskManifest.preExistingLessonHashes[slug]) {
    throw new Error(`Pre-existing lesson ${slug} hash changed!`);
  }
}
console.log(`All ${taskManifest.baselineSlugs.length} baseline lessons verified unchanged.`);

// 7. Teacher Mode Completeness
console.log('[7] Checking teacher mode completeness...');
if (!lesson.teacher.answerKey) throw new Error("Missing answerKey");
if (!lesson.teacher.rubric || lesson.teacher.rubric.length !== 5) throw new Error("Rubric categories count != 5");
if (!lesson.teacher.teacherNotes || lesson.teacher.teacherNotes.length < 10) throw new Error("Teacher notes count < 10");
if (!lesson.teacher.teachingPhases || lesson.teacher.teachingPhases.length !== 8) throw new Error("Teaching phases count != 8");

const totalMins = lesson.teacher.teachingPhases.reduce((acc, p) => acc + (p.durationMinutes || p.duration || 0), 0);
console.log(`Total teaching phases duration: ${totalMins} minutes`);
if (totalMins !== 90) throw new Error(`Teaching phases total minutes ${totalMins} != 90`);

if (!lesson.teacher.detailedReadingGuide.openingScript || lesson.teacher.detailedReadingGuide.openingScript.length < 3) throw new Error("Missing or incomplete opening script (expected >= 3)");
if (!lesson.teacher.detailedReadingGuide.warmupGuide || lesson.teacher.detailedReadingGuide.warmupGuide.length !== 3) throw new Error("WarmUp guide count != 3");
if (!lesson.teacher.detailedReadingGuide.finalWritingSupport || !lesson.teacher.detailedReadingGuide.finalWritingSupport.commonMistakes || lesson.teacher.detailedReadingGuide.finalWritingSupport.commonMistakes.length < 4) throw new Error("Final writing support incomplete");

console.log('=== ALL SWEDEN FORESTS FIKA LESSON VALIDATION CHECKS PASSED SUCCESSFULLY! ===');

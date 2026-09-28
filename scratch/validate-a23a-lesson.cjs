const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('=== STARTING A23A ICEBERG LESSON VALIDATION ===');

const lessonPath = path.join(__dirname, '../public/lessons/2026-09-28-a23a-iceberg-disappears/lesson-data.json');
const fixturePath = path.join(__dirname, '../docs/lesson-sources/OFS-20260928-A23A-ICEBERG-01.json');
const taskPath = path.join(__dirname, '../docs/lesson-tasks/OFS-20260928-A23A-ICEBERG-01.json');
const indexPath = path.join(__dirname, '../public/lessons/lesson-index.json');

const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const taskManifest = JSON.parse(fs.readFileSync(taskPath, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

function norm(s) {
  return s.normalize('NFC').replace(/\s+/g, ' ').trim();
}

function getHash(str) {
  return crypto.createHash('sha256').update(norm(str), 'utf8').digest('hex');
}

// 1. Basic Metadata
console.log('[1] Checking basic metadata...');
if (lesson.lessonTitle !== "World’s Biggest Iceberg Disappears After 40 Years") throw new Error("Invalid title");
if (lesson.ofsUnit !== "Unit 2 — Earth, Climate & Change") throw new Error("Invalid unit");
if (lesson.level !== "OFS Grade 9 International English G1/G2 ESL") throw new Error("Invalid level");
if (lesson.textType !== "Informational News Report") throw new Error("Invalid textType");
if (lesson.writingType !== "Evidence-Based Environmental Explanation Paragraph") throw new Error("Invalid writingType");
if (lesson.duration !== "90 minutes") throw new Error("Invalid duration");

// 2. Count Checks
console.log('[2] Checking section item counts...');
if (lesson.warmUp.questions.length !== 3) throw new Error(`Warmup questions count: ${lesson.warmUp.questions.length} (expected 3)`);
if (lesson.vocabularyInContext.items.length !== 10) throw new Error(`Vocab count: ${lesson.vocabularyInContext.items.length} (expected 10)`);
if (!lesson.mainIdeaQuestion || lesson.mainIdeaQuestion.correctIndex !== 1) throw new Error(`Main Idea invalid (correctIndex != 1)`);
if (lesson.readingComprehension.questions.length !== 6) throw new Error(`RC questions count: ${lesson.readingComprehension.questions.length} (expected 6)`);
if (lesson.evidenceFromText.prompts.length !== 3) throw new Error(`Evidence prompts count: ${lesson.evidenceFromText.prompts.length} (expected 3)`);
if (lesson.writingPractice.prompts.length !== 4) throw new Error(`Writing practice items count: ${lesson.writingPractice.prompts.length} (expected 4)`);
if (lesson.selfCheck.items.length !== 6) throw new Error(`Self check count: ${lesson.selfCheck.items.length} (expected 6)`);

// 3. Final Task Model Answer Word Count (100 - 140 words)
console.log('[3] Checking final task model answer word count...');
const modelWords = lesson.teacher.modelAnswer.trim().split(/\s+/).filter(Boolean).length;
console.log(`Final Task Model Answer Word Count: ${modelWords} words`);
if (modelWords < 100 || modelWords > 140) throw new Error(`Model answer word count ${modelWords} out of range 100-140!`);

// 4. Source Preservation & Hashes against Fixture
console.log('[4] Checking source preservation and SHA-256 hashes against fixture...');
const p1 = lesson.article.paragraphs[0];
const p2 = lesson.article.paragraphs[1];
const p3 = lesson.article.paragraphs[2];
const p4 = lesson.article.paragraphs[3];

const p1Hash = getHash(p1);
const p2Hash = getHash(p2);
const p3Hash = getHash(p3);
const p4Hash = getHash(p4);
const bodyCombined = [p1, p2, p3, p4].join(' ');
const bodyHash = getHash(bodyCombined);

console.log('P1 Hash:', p1Hash);
console.log('P2 Hash:', p2Hash);
console.log('P3 Hash:', p3Hash);
console.log('P4 Hash:', p4Hash);
console.log('Body Hash:', bodyHash);

const expectedP1 = "3ac6c302267ba99dd1becc06e24f29c2888839a8059246b91170a87bcae4c994";
const expectedP2 = "f1e2c33c97b37f0ccf08cb5b3c69f8cc2f850e6d7e2c21f54a296e4bdee50303";
const expectedP3 = "02f61f0b78df32410c7526fe2f018ffe307f67c20a5a3de9b504c7fb08a5b00a";
const expectedP4 = "3360b6a00485032021a1e9b2d82e4ff68fb4e2c050494e709c39f230f2b5b4f8";
const expectedBody = "561d682a32bffc13decf7436bc023253b0d1f77a8ed3a61c4828bee7f36e086d";

if (p1Hash !== expectedP1) throw new Error(`P1 hash mismatch! Got: ${p1Hash}`);
if (p2Hash !== expectedP2) throw new Error(`P2 hash mismatch! Got: ${p2Hash}`);
if (p3Hash !== expectedP3) throw new Error(`P3 hash mismatch! Got: ${p3Hash}`);
if (p4Hash !== expectedP4) throw new Error(`P4 hash mismatch! Got: ${p4Hash}`);
if (bodyHash !== expectedBody) throw new Error(`Body hash mismatch! Got: ${bodyHash}`);

// 5. Check 6 Sentence Units in detailedReadingGuide
console.log('[5] Checking detailed reading guide sentence units...');
const sentenceAnalysis = lesson.teacher.detailedReadingGuide.sentenceAnalysis;
if (!sentenceAnalysis || sentenceAnalysis.length !== 6) {
  throw new Error(`Detailed reading guide sentence count: ${sentenceAnalysis ? sentenceAnalysis.length : 0} (expected 6)`);
}

for (let i = 0; i < 6; i++) {
  const sent = sentenceAnalysis[i];
  if (sent.sentenceNumber !== i + 1) throw new Error(`Sentence number mismatch at index ${i}`);
  if (sent.original !== fixture.sentenceUnits[i]) {
    throw new Error(`Sentence ${i + 1} original text mismatch!\nExpected: "${fixture.sentenceUnits[i]}"\nGot: "${sent.original}"`);
  }
  
  if (!sent.chunkReading) throw new Error(`Sentence ${i + 1} missing chunkReading`);
  if (!sent.directKorean) throw new Error(`Sentence ${i + 1} missing directKorean`);
  if (!sent.naturalKorean) throw new Error(`Sentence ${i + 1} missing naturalKorean`);
  if (!sent.mustKnowChunks) throw new Error(`Sentence ${i + 1} missing mustKnowChunks`);
  if (!sent.mustKnowGrammar) throw new Error(`Sentence ${i + 1} missing mustKnowGrammar`);
  
  // Feynman Explanation 3-5 sentence check
  const feynman = sent.feynmanExplanation;
  if (!feynman) throw new Error(`Sentence ${i + 1} missing Feynman explanation`);
  const sentencesCount = feynman.split('.').map(s => s.trim()).filter(Boolean).length;
  console.log(`Sentence ${i + 1} Feynman explanation sentence count: ${sentencesCount}`);
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

console.log('=== ALL A23A ICEBERG LESSON VALIDATION CHECKS PASSED SUCCESSFULLY! ===');

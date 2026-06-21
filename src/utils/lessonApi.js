const INDEX_URL = '/lessons/lesson-index.json';

export async function fetchLessonIndex() {
  const response = await fetch(INDEX_URL);

  if (!response.ok) {
    throw new Error('Failed to load lesson index');
  }

  return response.json();
}

export async function fetchLessonData(slug) {
  const response = await fetch(`/lessons/${slug}/lesson-data.json`);

  if (!response.ok) {
    throw new Error(`Lesson "${slug}" not found`);
  }

  return response.json();
}

export function lessonStudentPath(slug) {
  return `/lessons/${slug}/student`;
}

export function lessonTeacherPath(slug) {
  return `/lessons/${slug}/teacher`;
}
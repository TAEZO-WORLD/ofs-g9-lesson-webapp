export const DEFAULT_CONNECTORS = [
  'because',
  'so',
  'as a result',
  'therefore',
  'however',
  'although',
  'even though',
  'due to',
  'while',
  'if',
  'this means',
  'could change',
  'highlighting',
  'on the other hand',
  'for example',
  'overall',
  'in conclusion',
  'affecting',
  'forcing',
  'consequently'
];

export function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function hasMinimumWords(text, minWords) {
  return countWords(text) >= minWords;
}

export function hasCapitalStart(text) {
  const trimmed = (text || '').trim();
  if (trimmed.length === 0) return false;
  // Match first alphabetical character
  const match = trimmed.match(/[a-zA-Z]/);
  if (!match) return false;
  return match[0] === match[0].toUpperCase();
}

export function hasEndingPunctuation(text) {
  const trimmed = (text || '').trim();
  if (trimmed.length === 0) return false;
  return /[.!?]["”']?$/.test(trimmed);
}

export function hasMultipleSentences(text) {
  const trimmed = (text || '').trim();
  if (trimmed.length === 0) return false;
  // Split by sentence ending punctuation
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return sentences.length > 1;
}

export function includesAnyConnector(text, connectors = DEFAULT_CONNECTORS) {
  if (!text) return null;
  const lowerText = text.toLowerCase();
  const list = connectors.length > 0 ? connectors : DEFAULT_CONNECTORS;
  
  for (const conn of list) {
    const cleanedConn = conn.replace(/\s*\([^)]*\)\s*/g, '').trim(); // clean descriptions like "however (하지만)"
    if (!cleanedConn) continue;
    const escaped = cleanedConn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(lowerText)) {
      return cleanedConn;
    }
  }
  return null;
}

export function includesAnyVocabulary(text, vocabulary = []) {
  if (!text || !vocabulary || vocabulary.length === 0) return null;
  const lowerText = text.toLowerCase();
  
  for (const word of vocabulary) {
    // clean parenthesis or translation helpers
    const cleanedWord = word.replace(/\s*\([^)]*\)\s*/g, '').trim();
    if (!cleanedWord) continue;
    
    // Check direct word boundary or common suffixes (plural, past tense, etc.)
    const escaped = cleanedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // For words like "unveil", check "unveil", "unveils", "unveiled", "unveiling"
    // We can allow simple word boundary check
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(lowerText)) {
      return cleanedWord;
    }
    // Also allow sub-string boundary match for stem words if they are long
    if (cleanedWord.length > 4 && lowerText.includes(cleanedWord.toLowerCase())) {
      return cleanedWord;
    }
  }
  return null;
}

export function isWithinWordRange(text, min, max) {
  const count = countWords(text);
  return count >= min && count <= max;
}

export function generateEvidenceFeedback(text, suggestedAnswer = '', articleText = '') {
  const words = countWords(text);
  const feedback = [];

  // Rule 1: You wrote a response
  if (words > 0) {
    feedback.push({ status: 'good', text: 'You wrote a response.' });
  } else {
    feedback.push({ status: 'missing', text: 'You did not write a response.' });
    return feedback;
  }

  // Rule 2: Your answer includes enough words
  if (words >= 4) {
    feedback.push({ status: 'good', text: 'Your answer includes enough words.' });
  } else {
    feedback.push({ status: 'try-this', text: 'Try to write a more complete answer (at least 4 words).' });
  }

  // Rule 3: Try to quote or closely paraphrase the article
  let hasQuotes = /["'“”'‘]/.test(text);
  let overlaps = false;
  
  const cleanAndTokenize = (t) => t.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  const studentTokens = cleanAndTokenize(text);
  
  // Look for consecutive word match in suggested answer or article
  const checkOverlap = (compareText) => {
    if (!compareText) return false;
    const compareTokens = cleanAndTokenize(compareText);
    // Look for any 3-gram match
    for (let i = 0; i <= studentTokens.length - 3; i++) {
      const phrase = studentTokens.slice(i, i + 3).join(' ');
      if (compareTokens.join(' ').includes(phrase)) {
        return true;
      }
    }
    return false;
  };

  if (checkOverlap(suggestedAnswer) || (articleText && checkOverlap(articleText))) {
    overlaps = true;
  }

  if (hasQuotes || overlaps) {
    feedback.push({ status: 'good', text: 'Nice job quoting or closely paraphrasing the article.' });
  } else {
    feedback.push({ status: 'try-this', text: 'Try to quote or closely paraphrase the article.' });
  }

  return feedback;
}

export function generateShortAnswerFeedback(text, settings = {}) {
  const words = countWords(text);
  const feedback = [];

  // Basic check: did they write anything?
  if (words === 0) {
    feedback.push({ status: 'missing', text: 'Please write a response.' });
    return feedback;
  }

  // Rule 1: Complete sentence
  const hasCapital = hasCapitalStart(text);
  const hasPunctuation = hasEndingPunctuation(text);
  const isComplete = words >= 5 && hasCapital && hasPunctuation;
  if (isComplete) {
    feedback.push({ status: 'good', text: 'You wrote a complete sentence.' });
  } else {
    feedback.push({ status: 'try-this', text: 'Try to write in a complete sentence.' });
  }

  // Rule 2: At least 8 words
  const minWords = settings.targetWords || 8;
  if (words >= minWords) {
    feedback.push({ status: 'good', text: `Your answer has ${words} words.` });
  } else {
    feedback.push({ status: 'try-this', text: `Try to write at least ${minWords} words (currently ${words}).` });
  }

  // Rule 3: Start with capital letter
  if (hasCapital) {
    feedback.push({ status: 'good', text: 'Your sentence starts with a capital letter.' });
  } else {
    feedback.push({ status: 'try-this', text: 'Start your sentence with a capital letter.' });
  }

  // Rule 4: End with punctuation
  if (hasPunctuation) {
    feedback.push({ status: 'good', text: 'Your sentence ends with punctuation.' });
  } else {
    feedback.push({ status: 'try-this', text: 'End your sentence with punctuation.' });
  }

  // Rule 5: Target vocabulary or connectors
  if (settings.targetVocabulary && settings.targetVocabulary.length > 0) {
    const foundVocab = includesAnyVocabulary(text, settings.targetVocabulary);
    if (foundVocab) {
      feedback.push({ status: 'good', text: `You used a lesson vocabulary word: ${foundVocab}.` });
    } else {
      feedback.push({ status: 'try-this', text: 'Try to use one lesson vocabulary word.' });
    }
  }

  if (settings.targetConnectors && settings.targetConnectors.length > 0) {
    const foundConn = includesAnyConnector(text, settings.targetConnectors);
    if (foundConn) {
      feedback.push({ status: 'good', text: `You used a connector: ${foundConn}.` });
    } else {
      feedback.push({ status: 'try-this', text: 'Try to use a contrast or connection word.' });
    }
  }

  return feedback;
}

export function generateParagraphFeedback(text, settings = {}) {
  const words = countWords(text);
  const feedback = [];

  if (words === 0) {
    feedback.push({ status: 'missing', text: 'Please write your paragraph.' });
    return feedback;
  }

  // Rule 1 & 8: Too short check
  if (words < 40) {
    feedback.push({ status: 'missing', text: `Your answer is too short (currently ${words} words). Write a complete paragraph.` });
  } else {
    feedback.push({ status: 'good', text: `Your paragraph has ${words} words.` });
  }

  // Rule 2: Word range
  const { min, max } = settings.targetWordRange || { min: 80, max: 140 };
  if (words >= min && words <= max) {
    feedback.push({ status: 'good', text: `Your word count is within the target range of ${min}–${max} words.` });
  } else if (words >= min - 15 && words <= max + 15) {
    feedback.push({ status: 'try-this', text: `Your word count is close (${words} words). Try to get within the target range of ${min}–${max} words.` });
  } else {
    feedback.push({ status: 'try-this', text: `Try to write between ${min} and ${max} words.` });
  }

  // Rule 3: Connector check
  const connectors = settings.targetConnectors || DEFAULT_CONNECTORS;
  const foundConnector = includesAnyConnector(text, connectors);
  if (foundConnector) {
    feedback.push({ status: 'good', text: `You used a connector: ${foundConnector}.` });
  } else {
    feedback.push({ status: 'try-this', text: 'Try to use a connector (e.g., however, because, therefore) to link your ideas.' });
  }

  // Rule 4: Vocabulary check
  if (settings.targetVocabulary && settings.targetVocabulary.length > 0) {
    const foundVocab = includesAnyVocabulary(text, settings.targetVocabulary);
    if (foundVocab) {
      feedback.push({ status: 'good', text: `You used lesson vocabulary: ${foundVocab}.` });
    } else {
      feedback.push({ status: 'try-this', text: 'Try to use a lesson vocabulary word.' });
    }
  }

  // Rule 5: Capital start
  if (hasCapitalStart(text)) {
    feedback.push({ status: 'good', text: 'Your paragraph starts with a capital letter.' });
  } else {
    feedback.push({ status: 'try-this', text: 'Start your paragraph with a capital letter.' });
  }

  // Rule 6: Ending punctuation
  if (hasEndingPunctuation(text)) {
    feedback.push({ status: 'good', text: 'Your paragraph ends with punctuation.' });
  } else {
    feedback.push({ status: 'try-this', text: 'End your paragraph with punctuation.' });
  }

  // Rule 7: More than one sentence
  if (hasMultipleSentences(text)) {
    feedback.push({ status: 'good', text: 'Your paragraph has multiple sentences.' });
  } else {
    feedback.push({ status: 'try-this', text: 'Try to write more than one sentence to develop your ideas.' });
  }

  // Rule 9: Concluding sentence check
  // Check if the last sentence starts with a concluding transition (case-insensitive)
  const trimmed = text.trim();
  const sentences = trimmed.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const lastSentence = sentences[sentences.length - 1] || '';
  const concludingTransitions = ['overall', 'in conclusion', 'therefore', 'to sum up', 'in summary', 'finally', 'thus', 'consequently'];
  const hasConcludingWord = concludingTransitions.some(t => new RegExp(`^${t}\\b`, 'i').test(lastSentence));
  
  if (hasConcludingWord) {
    feedback.push({ status: 'good', text: 'Your final sentence clearly concludes your idea.' });
  } else {
    feedback.push({ status: 'try-this', text: 'Check that your final sentence clearly concludes your idea (e.g., starting with "Overall," or "In conclusion,").' });
  }

  return feedback;
}

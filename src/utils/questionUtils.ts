/**
 * Utility functions for question and choice generation
 */

export interface QuestionItem {
  english: string;
  thai: string;
  category: string;
  [key: string]: any;
}

/**
 * Generate multiple choice options from a dataset
 * @param correctAnswer The correct answer to include
 * @param allItems All available items to pick wrong answers from
 * @param correctAnswerField The field name for the correct answer (e.g., 'thai' or 'english')
 * @returns Array of 4 shuffled choices with the correct answer included
 */
export function generateChoicesForQuestion(
  correctAnswer: string,
  allItems: QuestionItem[],
  correctAnswerField: 'thai' | 'english'
): string[] {
  if (allItems.length < 4) {
    throw new Error('Not enough items to generate 4 unique choices');
  }

  const wrongAnswers: string[] = [];
  const maxAttempts = allItems.length * 2;
  let attempts = 0;

  while (wrongAnswers.length < 3 && attempts < maxAttempts) {
    const randomIndex = Math.floor(Math.random() * allItems.length);
    const randomAnswer = allItems[randomIndex][correctAnswerField];

    if (randomAnswer !== correctAnswer && !wrongAnswers.includes(randomAnswer)) {
      wrongAnswers.push(randomAnswer);
    }
    attempts++;
  }

  if (wrongAnswers.length < 3) {
    throw new Error('Could not generate 3 unique wrong answers');
  }

  // Combine and shuffle
  const allChoices = [correctAnswer, ...wrongAnswers];
  return allChoices.sort(() => Math.random() - 0.5);
}

/**
 * Check if an answer is correct
 * @param userAnswer The user's answer
 * @param correctAnswer The correct answer
 * @returns true if correct, false otherwise
 */
export function isAnswerCorrect(userAnswer: string, correctAnswer: string): boolean {
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}

/**
 * Get a random index from an array
 * @param length The length of the array
 * @returns A random index between 0 and length-1
 */
export function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

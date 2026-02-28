import { generateChoicesForQuestion, isAnswerCorrect, getRandomIndex } from './utils/questionUtils';
import Data from './data/phrases.json';

describe('App data integrity', () => {
  it('phrases.json has required fields on every entry', () => {
    Data.forEach((item, index) => {
      expect(item).toHaveProperty('english');
      expect(item).toHaveProperty('thai');
      expect(item).toHaveProperty('category');
      expect(typeof item.english).toBe('string');
      expect(typeof item.thai).toBe('string');
      expect(typeof item.category).toBe('string');
    });
  });

  it('phrases.json has at least 4 entries (needed for multiple choice)', () => {
    expect(Data.length).toBeGreaterThanOrEqual(4);
  });

  it('phrases.json categories match expected values', () => {
    const validCategories = new Set([
      'general', 'dining', 'location', 'object', 'phrases', 'colors', 'animals'
    ]);
    Data.forEach(item => {
      expect(validCategories.has(item.category)).toBe(true);
    });
  });

  it('can generate choices from full dataset for english-to-thai', () => {
    const correctAnswer = Data[0].thai;
    const choices = generateChoicesForQuestion(correctAnswer, Data, 'thai');
    expect(choices).toHaveLength(4);
    expect(choices).toContain(correctAnswer);
  });

  it('can generate choices from full dataset for thai-to-english', () => {
    const correctAnswer = Data[0].english;
    const choices = generateChoicesForQuestion(correctAnswer, Data, 'english');
    expect(choices).toHaveLength(4);
    expect(choices).toContain(correctAnswer);
  });
});

describe('Sound path helper', () => {
  it('isAnswerCorrect handles Thai vocabulary correctly', () => {
    expect(isAnswerCorrect('สวัสดี', 'สวัสดี')).toBe(true);
    expect(isAnswerCorrect('ฉัน', 'อยาก')).toBe(false);
  });

  it('getRandomIndex stays in bounds for dataset size', () => {
    for (let i = 0; i < 20; i++) {
      const index = getRandomIndex(Data.length);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(Data.length);
    }
  });
});

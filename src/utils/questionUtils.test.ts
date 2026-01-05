import {
  generateChoicesForQuestion,
  isAnswerCorrect,
  getRandomIndex,
  QuestionItem,
} from '../utils/questionUtils';

describe('Question Utilities', () => {
  const mockData: QuestionItem[] = [
    { english: 'hello', thai: 'สวัสดี', category: 'general' },
    { english: 'goodbye', thai: 'ลาก่อน', category: 'general' },
    { english: 'water', thai: 'น้ำ', category: 'dining' },
    { english: 'food', thai: 'อาหาร', category: 'dining' },
    { english: 'red', thai: 'แดง', category: 'colors' },
    { english: 'blue', thai: 'น้ำเงิน', category: 'colors' },
  ];

  describe('generateChoicesForQuestion', () => {
    it('should return an array of 4 choices', () => {
      const choices = generateChoicesForQuestion('สวัสดี', mockData, 'thai');
      expect(choices).toHaveLength(4);
    });

    it('should include the correct answer', () => {
      const correctAnswer = 'สวัสดี';
      const choices = generateChoicesForQuestion(correctAnswer, mockData, 'thai');
      expect(choices).toContain(correctAnswer);
    });

    it('should return unique choices (no duplicates)', () => {
      const choices = generateChoicesForQuestion('สวัสดี', mockData, 'thai');
      const uniqueChoices = new Set(choices);
      expect(uniqueChoices.size).toBe(4);
    });

    it('should work with english-to-thai mode', () => {
      const choices = generateChoicesForQuestion('hello', mockData, 'english');
      expect(choices).toHaveLength(4);
      expect(choices).toContain('hello');
    });

    it('should throw error if not enough items', () => {
      const tooFewItems: QuestionItem[] = [
        { english: 'hello', thai: 'สวัสดี', category: 'general' },
        { english: 'goodbye', thai: 'ลาก่อน', category: 'general' },
      ];
      expect(() => {
        generateChoicesForQuestion('สวัสดี', tooFewItems, 'thai');
      }).toThrow('Not enough items to generate 4 unique choices');
    });

    it('should generate different shuffles on multiple calls', () => {
      const choices1 = generateChoicesForQuestion('สวัสดี', mockData, 'thai');
      const choices2 = generateChoicesForQuestion('สวัสดี', mockData, 'thai');
      
      // Check that both have the same content
      const set1 = new Set(choices1);
      const set2 = new Set(choices2);
      
      expect(set1.size).toBe(4);
      expect(set2.size).toBe(4);
      // Both should contain the correct answer
      expect(set1.has('สวัสดี')).toBe(true);
      expect(set2.has('สวัสดี')).toBe(true);
    });
  });

  describe('isAnswerCorrect', () => {
    it('should return true for exact match', () => {
      expect(isAnswerCorrect('hello', 'hello')).toBe(true);
    });

    it('should be case-insensitive', () => {
      expect(isAnswerCorrect('HELLO', 'hello')).toBe(true);
      expect(isAnswerCorrect('Hello', 'hello')).toBe(true);
    });

    it('should ignore leading/trailing whitespace', () => {
      expect(isAnswerCorrect('  hello  ', 'hello')).toBe(true);
    });

    it('should return false for incorrect answer', () => {
      expect(isAnswerCorrect('hello', 'goodbye')).toBe(false);
    });

    it('should work with Thai characters', () => {
      expect(isAnswerCorrect('สวัสดี', 'สวัสดี')).toBe(true);
      expect(isAnswerCorrect('สวัสดี', 'ลาก่อน')).toBe(false);
    });
  });

  describe('getRandomIndex', () => {
    it('should return a valid index', () => {
      const index = getRandomIndex(10);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(10);
      expect(Number.isInteger(index)).toBe(true);
    });

    it('should work with different array lengths', () => {
      for (let length = 1; length <= 100; length += 10) {
        const index = getRandomIndex(length);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(length);
      }
    });

    it('should distribute randomness across range', () => {
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(getRandomIndex(5));
      }
      // Should hit at least 3 different values in 100 attempts with length 5
      expect(results.size).toBeGreaterThanOrEqual(3);
    });
  });
});

import { LOREM_WORDS, CLASSIC_OPENING } from './word-bank';

export type GeneratorUnit = 'words' | 'sentences' | 'paragraphs';
export type OutputFormat = 'plain' | 'html' | 'markdown';

export interface GeneratorOptions {
  count: number;
  unit: GeneratorUnit;
  startWithLorem: boolean;
  format: OutputFormat;
}

export class LoremGenerator {
  private words: string[];

  constructor(words: string[] = LOREM_WORDS) {
    this.words = words;
  }

  /**
   * Main public API for generating Lorem Ipsum text
   */
  generate(options: GeneratorOptions): string {
    let content: string[];

    switch (options.unit) {
      case 'words':
        content = [this.generateWords(options.count, options.startWithLorem).join(' ')];
        break;

      case 'sentences':
        content = [this.generateSentences(options.count, options.startWithLorem).join(' ')];
        break;

      case 'paragraphs':
        content = this.generateParagraphs(options.count, options.startWithLorem);
        break;

      default:
        throw new Error(`Invalid unit type: ${options.unit}`);
    }

    return this.formatContent(content, options.format);
  }

  /**
   * Generates random words from the corpus
   */
  private generateWords(count: number, startWithLorem: boolean): string[] {
    const result: string[] = [];

    if (startWithLorem && count >= CLASSIC_OPENING.length) {
      result.push(...CLASSIC_OPENING);
      count = count - CLASSIC_OPENING.length;
    }

    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * this.words.length);
      result.push(this.words[index]);
    }

    return result;
  }

  /**
   * Builds sentences with proper capitalization and punctuation
   */
  private generateSentences(count: number, startWithLorem: boolean): string[] {
    const sentences: string[] = [];

    for (let i = 0; i < count; i++) {
      const shouldStartWithLorem = startWithLorem && i === 0;

      // Use Gaussian distribution for natural sentence length
      // Average: 15 words, Standard deviation: 5 words
      const wordCount = Math.max(5, Math.floor(this.gaussian(15, 5)));
      const words = this.generateWords(wordCount, shouldStartWithLorem);

      // Capitalize first word
      if (words.length > 0) {
        words[0] = this.capitalize(words[0]);
      }

      // Add comma occasionally for variety (25% chance after 5th word)
      if (words.length > 8 && Math.random() > 0.75) {
        const commaIndex = Math.floor(words.length / 2) + Math.floor(Math.random() * 3);
        if (commaIndex < words.length - 1) {
          words[commaIndex] = words[commaIndex] + ',';
        }
      }

      sentences.push(words.join(' ') + '.');
    }

    return sentences;
  }

  /**
   * Groups sentences into paragraphs
   */
  private generateParagraphs(count: number, startWithLorem: boolean): string[] {
    const paragraphs: string[] = [];

    for (let i = 0; i < count; i++) {
      const shouldStartWithLorem = startWithLorem && i === 0;

      // Use Gaussian distribution for natural paragraph length
      // Average: 5 sentences, Standard deviation: 2 sentences
      const sentenceCount = Math.max(3, Math.floor(this.gaussian(5, 2)));
      const sentences = this.generateSentences(sentenceCount, shouldStartWithLorem);

      paragraphs.push(sentences.join(' '));
    }

    return paragraphs;
  }

  /**
   * Gaussian random number generator using Box-Muller transform
   * Provides natural variation in sentence/paragraph lengths
   */
  private gaussian(mean: number, stdev: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdev + mean;
  }

  /**
   * Capitalizes the first letter of a word
   */
  private capitalize(word: string): string {
    if (!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /**
   * Formats content based on output format
   */
  private formatContent(paragraphs: string[], format: OutputFormat): string {
    switch (format) {
      case 'html':
        return paragraphs.map(p => `<p>${p}</p>`).join('\n');

      case 'markdown':
        return paragraphs.join('\n\n');

      case 'plain':
      default:
        return paragraphs.join('\n\n');
    }
  }
}

// Export a default instance for convenience
export const loremGenerator = new LoremGenerator();

import {
  CLASSIC_OPENING,
  LOREM_WORDS,
  PIRATE_OPENING,
  PIRATE_WORDS,
  STARTUP_OPENING,
  STARTUP_WORDS,
  TECH_OPENING,
  TECH_WORDS,
} from "./word-bank";

export type GeneratorUnit =
  | "words"
  | "sentences"
  | "paragraphs"
  | "emails"
  | "urls"
  | "domains";
export type OutputFormat = "plain" | "html" | "markdown";
export type IpsumTheme = "classic" | "pirate" | "tech" | "startup";

export interface GeneratorOptions {
  count: number;
  unit: GeneratorUnit;
  startWithLorem: boolean;
  format: OutputFormat;
}

// TLDs for domain generation
const TLDS = [
  "com",
  "net",
  "org",
  "io",
  "dev",
  "app",
  "co",
  "tech",
  "info",
  "biz",
];

export class LoremGenerator {
  private words: string[];
  private opening: string[];

  constructor(
    words: string[] = LOREM_WORDS,
    opening: string[] = CLASSIC_OPENING,
  ) {
    this.words = words;
    this.opening = opening;
  }

  /**
   * Main public API for generating Lorem Ipsum text
   */
  generate(options: GeneratorOptions): string {
    let content: string[];

    switch (options.unit) {
      case "words":
        content = [
          this.generateWords(options.count, options.startWithLorem).join(" "),
        ];
        break;

      case "sentences":
        content = [
          this.generateSentences(options.count, options.startWithLorem).join(
            " ",
          ),
        ];
        break;

      case "paragraphs":
        content = this.generateParagraphs(
          options.count,
          options.startWithLorem,
        );
        break;

      case "emails":
        content = this.generateEmails(options.count);
        break;

      case "urls":
        content = this.generateUrls(options.count);
        break;

      case "domains":
        content = this.generateDomains(options.count);
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

    if (startWithLorem && count >= this.opening.length) {
      result.push(...this.opening);
      count = count - this.opening.length;
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
        const commaIndex =
          Math.floor(words.length / 2) + Math.floor(Math.random() * 3);
        if (commaIndex < words.length - 1) {
          words[commaIndex] = `${words[commaIndex]},`;
        }
      }

      sentences.push(`${words.join(" ")}.`);
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
      const sentences = this.generateSentences(
        sentenceCount,
        shouldStartWithLorem,
      );

      paragraphs.push(sentences.join(" "));
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
   * Generates random email addresses
   */
  private generateEmails(count: number): string[] {
    const emails: string[] = [];
    const providers = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "example.com",
    ];

    for (let i = 0; i < count; i++) {
      const username = this.generateWords(2, false).join(".");
      const provider = providers[Math.floor(Math.random() * providers.length)];
      emails.push(`${username}@${provider}`);
    }

    return emails;
  }

  /**
   * Generates random URLs
   */
  private generateUrls(count: number): string[] {
    const urls: string[] = [];
    const protocols = ["https://"];
    const paths = [
      "blog",
      "about",
      "products",
      "services",
      "contact",
      "news",
      "resources",
    ];

    for (let i = 0; i < count; i++) {
      const protocol = protocols[Math.floor(Math.random() * protocols.length)];
      const domain = this.generateDomains(1)[0];
      const hasPath = Math.random() > 0.3; // 70% chance of having a path

      if (hasPath) {
        const path = paths[Math.floor(Math.random() * paths.length)];
        urls.push(`${protocol}${domain}/${path}`);
      } else {
        urls.push(`${protocol}${domain}`);
      }
    }

    return urls;
  }

  /**
   * Generates random domain names
   */
  private generateDomains(count: number): string[] {
    const domains: string[] = [];

    for (let i = 0; i < count; i++) {
      const nameLength = Math.floor(Math.random() * 2) + 1; // 1-2 words
      const name = this.generateWords(nameLength, false).join("");
      const tld = TLDS[Math.floor(Math.random() * TLDS.length)];
      domains.push(`${name}.${tld}`);
    }

    return domains;
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
      case "html":
        return paragraphs.map((p) => `<p>${p}</p>`).join("\n");

      case "markdown":
        return paragraphs.join("\n\n");
      default:
        return paragraphs.join("\n\n");
    }
  }
}

// Export a default instance for convenience
export const loremGenerator = new LoremGenerator();

// Themed generator instances, keyed by theme name
export const themedGenerators: Record<IpsumTheme, LoremGenerator> = {
  classic: loremGenerator,
  pirate: new LoremGenerator(PIRATE_WORDS, PIRATE_OPENING),
  tech: new LoremGenerator(TECH_WORDS, TECH_OPENING),
  startup: new LoremGenerator(STARTUP_WORDS, STARTUP_OPENING),
};

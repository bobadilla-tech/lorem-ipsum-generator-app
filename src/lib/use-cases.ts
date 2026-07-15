export interface UseCase {
  slug: string;
  label: string;
  intro: string;
  tips: string[];
  faqQuestion: string;
  faqAnswer: string;
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'landing-pages',
    label: 'Landing Pages',
    intro:
      'A landing page lives or dies on its hero headline and one or two supporting lines — mismatched placeholder length here is the most common mockup mistake.',
    tips: [
      'Keep the hero headline to 5-8 words; a full sentence will look bloated once real copy replaces it.',
      'Generate a short paragraph for the supporting subhead, not a wall of text.',
      'Test the CTA button with both a 2-word and a 4-word label to catch button-width issues early.'
    ],
    faqQuestion: 'How long should placeholder text be on a landing page hero?',
    faqAnswer:
      'Short. Hero headlines read best at 5-8 words and subheads at one sentence — generate at the word or sentence level, not full paragraphs, to keep the mockup realistic.'
  },
  {
    slug: 'mobile-apps',
    label: 'Mobile Apps',
    intro:
      'Mobile screens have far less room than desktop, so placeholder text needs to be shorter and account for how real names and labels wrap on small viewports.',
    tips: [
      'Generate short word-level strings for tab labels and buttons — anything longer gets truncated on real devices.',
      'Test list items and notification previews with 1-2 sentences to check text-wrapping and line-clamping.',
      'Try both a short and a long username/title to catch overflow in avatar rows and headers.'
    ],
    faqQuestion: 'Why does mobile app placeholder text need to be shorter than website text?',
    faqAnswer:
      'Mobile screens have far less horizontal space, and system fonts often render larger by default, so text that fits on desktop can truncate or wrap awkwardly on a phone. Generate shorter word/sentence-level text and test the extremes.'
  },
  {
    slug: 'dashboards',
    label: 'Dashboards',
    intro:
      'Dashboard mockups usually fail on data-dense areas — table cells, stat labels, and chart legends — not the big headline text.',
    tips: [
      'Use word-level generation for table cells and stat labels; full sentences will overflow narrow columns.',
      'Generate 10-20 rows at once to see how the table behaves with real volume instead of 2-3 sample rows.',
      'Test long user/company names in cells that assume short labels — this is where dashboards usually break first.'
    ],
    faqQuestion: 'What placeholder text mistakes are specific to dashboard mockups?',
    faqAnswer:
      'The most common mistake is testing tables and stat cards with only 2-3 short sample rows. Generate 10-20 rows with varying text lengths to see how columns, sorting, and truncation actually behave at realistic volume.'
  },
  {
    slug: 'email-templates',
    label: 'Email Templates',
    intro:
      'Email clients render HTML far less consistently than browsers, so placeholder text needs to expose line-length and paragraph-spacing issues before you\'re debugging them in Outlook.',
    tips: [
      'Use the HTML output format so paragraph tags carry through into your email template editor correctly.',
      'Keep line length realistic — email body copy is usually narrower than a webpage, so long paragraphs will look cramped.',
      'Generate a short preheader-length snippet (one sentence) separately from the main body copy.'
    ],
    faqQuestion: 'Should I use HTML or plain text for email template placeholder copy?',
    faqAnswer:
      'Use HTML format if your email template uses paragraph tags for spacing — pasting HTML-formatted output preserves that structure. Use plain text if you\'re just checking line length inside a WYSIWYG email editor.'
  },
  {
    slug: 'ecommerce-product-pages',
    label: 'E-commerce Product Pages',
    intro:
      'Product pages mix very short fields (name, price) with longer ones (description, reviews) — placeholder text needs to cover both extremes in the same mockup.',
    tips: [
      'Generate short word-level text for product titles and a full paragraph for the description field.',
      'Test a product name at both its shortest and longest realistic length to check title-wrapping in grid views.',
      'Use sentence-level text for review snippets — real reviews are rarely a full paragraph.'
    ],
    faqQuestion: 'How should placeholder text differ between a product title and its description?',
    faqAnswer:
      'Product titles should use short word-level generation since they appear in tight grid layouts, while descriptions can use full paragraphs. Testing both the shortest and longest realistic title length catches most grid-wrapping bugs.'
  },
  {
    slug: 'presentations',
    label: 'Presentations',
    intro:
      'Slide decks fail when body text is sized for a document instead of a screen viewed from across a room — placeholder text should stay short per slide.',
    tips: [
      'Cap body text at 2-3 short sentences per slide; a full paragraph rarely fits comfortably on a slide.',
      'Generate a short word-level title for each slide separately from the body content.',
      'Test a bullet list with 3-5 short items rather than one long paragraph to match how decks are actually read.'
    ],
    faqQuestion: 'How much text should go on a single presentation slide mockup?',
    faqAnswer:
      'Keep it to 2-3 short sentences or 3-5 short bullet points. Slides are read from a distance, so a mockup with a full paragraph will misrepresent how the real deck will look and read.'
  },
  {
    slug: 'social-media-posts',
    label: 'Social Media Posts',
    intro:
      'Each platform truncates and displays text differently, so a single block of Lorem Ipsum doesn\'t represent how a post will actually look across feeds.',
    tips: [
      'Generate a short 1-2 sentence caption for image-first platforms and a longer paragraph for text-first ones.',
      'Test where a caption gets cut off with a "see more" link by generating text just past a typical truncation point.',
      'Use word-level generation for hashtag-style tags separately from the caption body.'
    ],
    faqQuestion: 'Does placeholder text length matter differently across social platforms?',
    faqAnswer:
      'Yes. Image-first platforms typically show only the first line or two before truncating, while text-first formats show more. Generate separate short and long variants to preview both behaviors.'
  },
  {
    slug: 'chatbot-ui',
    label: 'Chatbot & Messaging UI',
    intro:
      'Chat bubbles are read in short bursts, so placeholder text needs to be broken into message-length chunks rather than one continuous block.',
    tips: [
      'Generate several short sentences separately rather than one paragraph, to mimic how a conversation is actually chunked into bubbles.',
      'Test a single very long message to make sure long bubbles wrap and scroll correctly.',
      'Use word-level text for quick-reply button labels — they need to stay short to fit inline.'
    ],
    faqQuestion: 'Should chatbot placeholder text be one paragraph or multiple short messages?',
    faqAnswer:
      'Multiple short messages. Real conversations arrive as a sequence of short bubbles, not one paragraph, so generating several short sentences separately better represents the real UI.'
  },
  {
    slug: 'onboarding-flows',
    label: 'Onboarding Flows',
    intro:
      'Onboarding screens are read quickly by users who haven\'t committed to the product yet, so placeholder copy needs to stay short per step.',
    tips: [
      'Keep each onboarding step to one short sentence or two — long paragraphs get skipped, not read.',
      'Generate a short word-level title for each step, separate from the body copy.',
      'Test a progress-indicator label ("Step 3 of 5" style) with realistic short text rather than leaving it blank.'
    ],
    faqQuestion: 'How much placeholder text belongs on a single onboarding screen?',
    faqAnswer:
      'One or two short sentences at most. Onboarding is skimmed, not read closely, so a mockup with dense paragraphs will misrepresent both the design and the real user experience.'
  },
  {
    slug: 'error-pages',
    label: 'Error Pages',
    intro:
      'Error and empty states are easy to forget when mocking up a product, but they need placeholder text just as much as the happy path.',
    tips: [
      'Generate a short one-sentence explanation, not a paragraph — error messages should be scannable in under a second.',
      'Test a longer variant too, since some error messages (validation, permissions) legitimately need more detail.',
      'Use word-level text for the action button ("Try Again", "Go Back") separately from the message body.'
    ],
    faqQuestion: 'Do error pages and empty states need their own placeholder text strategy?',
    faqAnswer:
      'Yes. They\'re often skipped during mockups entirely, but error and empty states need short, scannable placeholder text of their own — usually one sentence plus a short action label, not a full paragraph.'
  },
  {
    slug: 'newsletters',
    label: 'Newsletters',
    intro:
      'A newsletter mixes a short intro, several medium sections, and a subject line — each needs a different placeholder length to mockup realistically.',
    tips: [
      'Generate a one-sentence subject line separately from the body — subject lines are read in isolation in an inbox.',
      'Use short paragraphs (2-3 sentences) per section rather than one long block for the whole newsletter.',
      'Test the preview-text snippet (the line shown next to the subject in an inbox) at a realistic short length.'
    ],
    faqQuestion: 'Should a newsletter subject line use the same placeholder text as the body?',
    faqAnswer:
      'No — generate it separately at a short, word-level length. Subject lines are read in an inbox list alongside dozens of others, so they need their own realistic length, distinct from the body copy.'
  },
  {
    slug: 'documentation',
    label: 'Documentation',
    intro:
      'Docs mix short headings, code blocks, and longer explanatory paragraphs — placeholder text should reflect that structure, not read as one continuous essay.',
    tips: [
      'Generate short word-level headings separately from body paragraphs to mock up the document outline first.',
      'Use full paragraphs for explanatory sections, but keep individual paragraphs to 3-5 sentences to match real technical writing.',
      'Test a long compound heading to make sure your typography handles wrapping in the sidebar/table of contents.'
    ],
    faqQuestion: 'How is placeholder text for documentation different from a blog post?',
    faqAnswer:
      'Documentation mixes short headings, code samples, and tightly-scoped paragraphs, while a blog post is closer to one continuous narrative. Mock up the heading structure first, separately from body paragraphs.'
  },
  {
    slug: 'wireframes',
    label: 'Wireframes',
    intro:
      'Wireframes are meant to test structure, not polish, so placeholder text should stay generic and word-count-accurate rather than themed or decorative.',
    tips: [
      'Stick to classic Lorem Ipsum rather than a themed variant — wireframe reviews are about structure, not personality.',
      'Match word/sentence/paragraph counts to the real content plan as closely as possible, even at low fidelity.',
      'Use simple grey boxes for images, but real generated text for copy — blank text fields hide spacing problems.'
    ],
    faqQuestion: 'Should wireframes use themed placeholder text like Pirate or Tech Ipsum?',
    faqAnswer:
      'No — stick to classic Lorem Ipsum for wireframes. Themed variants are memorable and fun for polished mockups and client presentations, but at the wireframe stage you want reviewers focused on structure, not wording.'
  }
];

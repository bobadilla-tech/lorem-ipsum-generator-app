import { loremGenerator, type GeneratorOptions } from '../lib/lorem-generator';

// Wait for DOM to be ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeGenerator();
  });
}

function initializeGenerator() {
  // Get DOM elements
  const form = document.getElementById('generator-form') as HTMLFormElement;
  const outputEl = document.getElementById('output') as HTMLDivElement;
  const copyButton = document.getElementById('copy-button') as HTMLButtonElement;
  const clearButton = document.getElementById('clear-button') as HTMLButtonElement;
  const copyText = document.getElementById('copy-text') as HTMLSpanElement;
  const charCountEl = document.getElementById('char-count') as HTMLSpanElement;
  const wordCountEl = document.getElementById('word-count') as HTMLSpanElement;

  // Get form inputs
  const countInput = document.getElementById('count') as HTMLInputElement;
  const unitSelect = document.getElementById('unit') as HTMLSelectElement;
  const formatSelect = document.getElementById('format') as HTMLSelectElement;
  const startLoremCheckbox = document.getElementById('start-lorem') as HTMLInputElement;

  // Preset buttons
  const presetButtons = document.querySelectorAll('.preset-btn');

  if (!form || !outputEl) {
    console.error('Required elements not found');
    return;
  }

  /**
   * Generate Lorem Ipsum text
   */
  function generateText() {
    const options: GeneratorOptions = {
      count: parseInt(countInput.value),
      unit: unitSelect.value as 'words' | 'sentences' | 'paragraphs',
      startWithLorem: startLoremCheckbox.checked,
      format: formatSelect.value as 'plain' | 'html' | 'markdown'
    };

    // Show loading state
    outputEl.classList.add('loading');

    // Simulate slight delay for better UX (allows loading animation to show)
    setTimeout(() => {
      try {
        const generatedText = loremGenerator.generate(options);

        // Update output based on format
        if (options.format === 'html') {
          // Show HTML as rendered content
          outputEl.innerHTML = generatedText;
        } else if (options.format === 'markdown') {
          // Show markdown as plain text (formatted)
          outputEl.textContent = generatedText;
        } else {
          // Plain text
          outputEl.textContent = generatedText;
        }

        // Update stats
        updateStats(generatedText);

        // Remove loading state
        outputEl.classList.remove('loading');

        // Smooth scroll to output
        outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (error) {
        console.error('Generation error:', error);
        outputEl.textContent = 'Error generating text. Please try again.';
        outputEl.classList.remove('loading');
      }
    }, 100);
  }

  /**
   * Update character and word counts
   */
  function updateStats(text: string) {
    // Remove HTML tags for accurate count
    const plainText = text.replace(/<[^>]*>/g, '');

    const charCount = plainText.length;
    const wordCount = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;

    if (charCountEl) {
      charCountEl.textContent = `${charCount.toLocaleString()} character${charCount !== 1 ? 's' : ''}`;
    }

    if (wordCountEl) {
      wordCountEl.textContent = `${wordCount.toLocaleString()} word${wordCount !== 1 ? 's' : ''}`;
    }
  }

  /**
   * Copy text to clipboard
   */
  async function copyToClipboard() {
    try {
      const text = outputEl.textContent || '';

      if (!text || text.includes('Click "Generate')) {
        return;
      }

      await navigator.clipboard.writeText(text);

      // Show success feedback
      copyButton.classList.add('success');
      if (copyText) {
        copyText.textContent = 'Copied!';
      }

      // Reset after 2 seconds
      setTimeout(() => {
        copyButton.classList.remove('success');
        if (copyText) {
          copyText.textContent = 'Copy to Clipboard';
        }
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      if (copyText) {
        copyText.textContent = 'Copy failed';
      }

      setTimeout(() => {
        if (copyText) {
          copyText.textContent = 'Copy to Clipboard';
        }
      }, 2000);
    }
  }

  /**
   * Clear output
   */
  function clearOutput() {
    outputEl.innerHTML = '<p class="placeholder-text">Click "Generate Lorem Ipsum" to create placeholder text...</p>';
    if (charCountEl) charCountEl.textContent = '0 characters';
    if (wordCountEl) wordCountEl.textContent = '0 words';
  }

  /**
   * Handle preset button clicks
   */
  function handlePresetClick(preset: string) {
    switch (preset) {
      case '1-para':
        countInput.value = '1';
        unitSelect.value = 'paragraphs';
        break;
      case '3-para':
        countInput.value = '3';
        unitSelect.value = 'paragraphs';
        break;
      case '5-para':
        countInput.value = '5';
        unitSelect.value = 'paragraphs';
        break;
      case '10-para':
        countInput.value = '10';
        unitSelect.value = 'paragraphs';
        break;
      case '10-emails':
        countInput.value = '10';
        unitSelect.value = 'emails';
        break;
      case '5-urls':
        countInput.value = '5';
        unitSelect.value = 'urls';
        break;
    }

    // Update UI based on selection
    updateUIForUnit();

    // Auto-generate after preset selection
    generateText();
  }

  /**
   * Update UI elements based on selected unit
   */
  function updateUIForUnit() {
    const unit = unitSelect.value;
    const checkboxGroup = document.querySelector('.checkbox-group') as HTMLElement;

    // Hide "Start with Lorem Ipsum" for non-text generators
    if (unit === 'emails' || unit === 'urls' || unit === 'domains') {
      if (checkboxGroup) {
        checkboxGroup.style.display = 'none';
      }
    } else {
      if (checkboxGroup) {
        checkboxGroup.style.display = 'flex';
      }
    }
  }

  // Event Listeners
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateText();
  });

  if (copyButton) {
    copyButton.addEventListener('click', copyToClipboard);
  }

  if (clearButton) {
    clearButton.addEventListener('click', clearOutput);
  }

  // Preset buttons
  presetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const preset = button.getAttribute('data-preset');
      if (preset) {
        handlePresetClick(preset);
      }
    });
  });

  // Update UI when unit changes
  unitSelect?.addEventListener('change', () => {
    updateUIForUnit();
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+G or Cmd+G: Generate
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
      e.preventDefault();
      generateText();
    }

    // Ctrl+K or Cmd+K: Copy (more intuitive than Ctrl+C which is system copy)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      copyToClipboard();
    }
  });

  // Auto-generate on first load
  setTimeout(() => {
    generateText();
  }, 500);
}

import {
  type GeneratorOptions,
  type IpsumTheme,
  loremGenerator,
  themedGenerators,
} from "../lib/lorem-generator";

type ExportFormat = "txt" | "csv" | "js" | "pdf";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends an analytics event if GA4 is loaded (no-op otherwise, e.g. ad blockers)
 */
function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/**
 * Swaps "Ctrl" shortcut hints for the Mac "⌘" symbol on Apple platforms
 */
function updateShortcutHintsForMac() {
  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  if (!isMac) return;

  document.querySelectorAll(".key-mod").forEach((el) => {
    el.textContent = "⌘";
  });

  ["shortcut-generate", "shortcut-copy"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = el.textContent?.replace("Ctrl", "⌘") ?? el.textContent;
    }
  });
}

// Wait for DOM to be ready
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeGenerator();
  });
}

function initializeGenerator() {
  // Get DOM elements
  const form = document.getElementById("generator-form") as HTMLFormElement;
  const outputEl = document.getElementById("output") as HTMLDivElement;
  const copyButton = document.getElementById(
    "copy-button",
  ) as HTMLButtonElement;
  const clearButton = document.getElementById(
    "clear-button",
  ) as HTMLButtonElement;
  const copyText = document.getElementById("copy-text") as HTMLSpanElement;
  const charCountEl = document.getElementById("char-count") as HTMLSpanElement;
  const wordCountEl = document.getElementById("word-count") as HTMLSpanElement;
  const exportButtons = document.querySelectorAll<HTMLButtonElement>(
    ".export-button",
  );

  // Get form inputs
  const countInput = document.getElementById("count") as HTMLInputElement;
  const unitSelect = document.getElementById("unit") as HTMLSelectElement;
  const formatSelect = document.getElementById("format") as HTMLSelectElement;
  const themeSelect = document.getElementById("theme") as HTMLSelectElement;
  const startLoremCheckbox = document.getElementById(
    "start-lorem",
  ) as HTMLInputElement;

  // Preset buttons
  const presetButtons = document.querySelectorAll(".preset-btn");

  if (!form || !outputEl) {
    console.error("Required elements not found");
    return;
  }

  updateShortcutHintsForMac();

  /**
   * Generate Lorem Ipsum text
   */
  function generateText() {
    const options: GeneratorOptions = {
      count: parseInt(countInput.value, 10),
      unit: unitSelect.value as "words" | "sentences" | "paragraphs",
      startWithLorem: startLoremCheckbox.checked,
      format: formatSelect.value as "plain" | "html" | "markdown",
    };

    const theme = (themeSelect?.value || "classic") as IpsumTheme;
    const generator = themedGenerators[theme] ?? loremGenerator;

    // Show loading state
    outputEl.classList.add("loading");

    // Simulate slight delay for better UX (allows loading animation to show)
    setTimeout(() => {
      try {
        const generatedText = generator.generate(options);

        // Update output based on format
        if (options.format === "html") {
          // Show HTML as rendered content
          outputEl.innerHTML = generatedText;
        } else if (options.format === "markdown") {
          // Show markdown as plain text (formatted)
          outputEl.textContent = generatedText;
        } else {
          // Plain text
          outputEl.textContent = generatedText;
        }

        // Update stats
        updateStats(generatedText);

        // Remove loading state
        outputEl.classList.remove("loading");

        // Smooth scroll to output
        outputEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } catch (error) {
        console.error("Generation error:", error);
        outputEl.textContent = "Error generating text. Please try again.";
        outputEl.classList.remove("loading");
      }
    }, 100);
  }

  /**
   * Update character and word counts
   */
  function updateStats(text: string) {
    // Remove HTML tags for accurate count
    const plainText = text.replace(/<[^>]*>/g, "");

    const charCount = plainText.length;
    const wordCount = plainText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    if (charCountEl) {
      charCountEl.textContent = `${charCount.toLocaleString()} character${
        charCount !== 1 ? "s" : ""
      }`;
    }

    if (wordCountEl) {
      wordCountEl.textContent = `${wordCount.toLocaleString()} word${
        wordCount !== 1 ? "s" : ""
      }`;
    }
  }

  /**
   * Copy text to clipboard
   */
  async function copyToClipboard() {
    try {
      const text = outputEl.textContent || "";

      if (!text || text.includes('Click "Generate')) {
        return;
      }

      await navigator.clipboard.writeText(text);

      trackEvent("copy_click", {
        unit: unitSelect.value,
        theme: themeSelect?.value || "classic",
        format: formatSelect.value,
      });

      // Show success feedback
      copyButton.classList.add("success");
      if (copyText) {
        copyText.textContent = "Copied!";
      }

      // Reset after 2 seconds
      setTimeout(() => {
        copyButton.classList.remove("success");
        if (copyText) {
          copyText.textContent = "Copy to Clipboard";
        }
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      if (copyText) {
        copyText.textContent = "Copy failed";
      }

      setTimeout(() => {
        if (copyText) {
          copyText.textContent = "Copy to Clipboard";
        }
      }, 2000);
    }
  }

  /**
   * Builds file content for a given export format from the current output text
   */
  function buildExportContent(text: string, format: ExportFormat): string {
    if (format === "csv") {
      const rows = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      const escaped = rows.map((row) => `"${row.replace(/"/g, '""')}"`);
      return ["text", ...escaped].join("\n");
    }

    if (format === "js") {
      const escaped = text.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
      return `export const loremIpsum = \`${escaped}\`;\n`;
    }

    return text;
  }

  /**
   * Triggers a browser download for the given content
   */
  function downloadBlob(content: string | Blob, mimeType: string, filename: string) {
    const blob =
      content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Exports the current output text as txt, csv, js, or pdf
   */
  async function exportOutput(format: ExportFormat) {
    const text = outputEl.textContent || "";

    if (!text || text.includes('Click "Generate')) {
      return;
    }

    const timestamp = Date.now();
    const filename = `lorem-ipsum-${timestamp}.${format}`;

    if (format === "pdf") {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);

      let cursorY = margin;
      const lineHeight = 7;

      for (const line of lines) {
        if (cursorY > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      }

      doc.save(filename);
    } else {
      const content = buildExportContent(text, format);
      const mimeType =
        format === "csv"
          ? "text/csv"
          : format === "js"
            ? "text/javascript"
            : "text/plain";
      downloadBlob(content, mimeType, filename);
    }

    trackEvent("export_click", {
      format,
      unit: unitSelect.value,
      theme: themeSelect?.value || "classic",
    });
  }

  /**
   * Clear output
   */
  function clearOutput() {
    outputEl.innerHTML =
      '<p class="placeholder-text">Click "Generate Lorem Ipsum" to create placeholder text...</p>';
    if (charCountEl) charCountEl.textContent = "0 characters";
    if (wordCountEl) wordCountEl.textContent = "0 words";
  }

  /**
   * Handle preset button clicks
   */
  function handlePresetClick(preset: string) {
    switch (preset) {
      case "1-para":
        countInput.value = "1";
        unitSelect.value = "paragraphs";
        break;
      case "3-para":
        countInput.value = "3";
        unitSelect.value = "paragraphs";
        break;
      case "5-para":
        countInput.value = "5";
        unitSelect.value = "paragraphs";
        break;
      case "10-para":
        countInput.value = "10";
        unitSelect.value = "paragraphs";
        break;
      case "10-emails":
        countInput.value = "10";
        unitSelect.value = "emails";
        break;
      case "5-urls":
        countInput.value = "5";
        unitSelect.value = "urls";
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
    const checkboxGroup = document.querySelector(
      ".checkbox-group",
    ) as HTMLElement;
    const themeGroup = document.getElementById("theme-group");

    // Hide "Start with classic opening" and "Style" for non-text generators
    const isTextUnit =
      unit !== "emails" && unit !== "urls" && unit !== "domains";

    if (checkboxGroup) {
      checkboxGroup.style.display = isTextUnit ? "flex" : "none";
    }

    if (themeGroup) {
      themeGroup.style.display = isTextUnit ? "flex" : "none";
    }
  }

  // Event Listeners
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    generateText();
  });

  if (copyButton) {
    copyButton.addEventListener("click", copyToClipboard);
  }

  if (clearButton) {
    clearButton.addEventListener("click", clearOutput);
  }

  exportButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const format = button.dataset.format as ExportFormat | undefined;
      if (format) {
        exportOutput(format);
      }
    });
  });

  // Preset buttons
  presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const preset = button.getAttribute("data-preset");
      if (preset) {
        handlePresetClick(preset);
      }
    });
  });

  // Update UI when unit changes
  unitSelect?.addEventListener("change", () => {
    updateUIForUnit();
  });

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl+G or Cmd+G: Generate
    if ((e.ctrlKey || e.metaKey) && e.key === "g") {
      e.preventDefault();
      generateText();
    }

    // Ctrl+K or Cmd+K: Copy (more intuitive than Ctrl+C which is system copy)
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      copyToClipboard();
    }
  });

  // Auto-generate on first load
  setTimeout(() => {
    generateText();
  }, 500);
}

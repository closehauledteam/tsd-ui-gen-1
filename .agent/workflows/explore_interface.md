---
description: Исследовать интерфейс (Explore Interface) and generate specifications
---

1.  **Input**: Check if a URL is provided as an argument. If not, ask the user for the URL of the TSD interface to explore.
2.  **Setup**: Read the prompt content from `specs/prompts/browser_crawler_prompt.md`.
3.  **Execution**: Call the `browser_subagent` with the following parameters:
    -   **TaskName**: "Exploring TSD Interface"
    -   **Task**: Combine the content of `specs/prompts/browser_crawler_prompt.md` with the instruction: "Navigate to [User Provided URL]. Recursively traverse the interface as per the instructions. For EVERY screen or window identified, generate the Markdown specification. Return the collected specifications in your final response."
4.  **Output**:
    -   Parse the text returned by the browser agent.
    -   Identify each Markdown block corresponding to a screen spec.
    -   For each spec, create a new file in `specs/technical-assignments/` using the `screenId` as the filename (e.g., `specs/technical-assignments/[screenId].md`).
    -   If the file already exists, ask the user if they want to overwrite it or create a version.

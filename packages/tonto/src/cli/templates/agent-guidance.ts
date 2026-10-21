import { tontoCardinalityGuidance } from "./rules/tonto-cardinality-guidance.js";
import { tontoGuidance } from "./rules/tonto-guidance.js";
import { tontoLLMCreateNewElements } from "./rules/tonto-llm-create-new-elements.js";
import { tontoLLMDocumentationGuide } from "./rules/tonto-llm-documentation-guide.js";
import { tontoLLMTerminologyAnalysisGuide } from "./rules/tonto-llm-terminology-analysis-guide.js";
import { tontoLLMUnderstanding } from "./rules/tonto-llm-understanding.js";

export type AgentGuidanceFile = {
    fileName: string;
    content: string;
};

const agentFolderGuidanceIndex = `
# LLM Guidance for Tonto

This folder contains the Tonto guidance set for agentic IDEs that load project instructions from repository files.

## Workflow for Using Specialized Guidance Files

1. Analyze the user's request and identify the primary intent.
2. Use the matching guidance file in this folder:
   - Creating or extending ontology elements: \`tonto-llm-create-new-elements.md\`
   - Terminology analysis: \`tonto_llm_terminology_analysis_guide.md\`
   - Understanding or summarization: \`tonto_llm_understanding_and_summarization_guide.md\`
   - Documentation or translation: \`tonto_llm_documentation_guide.md\`
3. Use \`tonto-guidance.md\` for grammar, syntax, and project structure questions.
4. Use \`tonto-cardinality-guidance.md\` for relation cardinalities and multiplicity constraints.
5. Follow the MCP workflow in \`tonto-guidance.md\`: inspect with \`tonto_ast\`, preview edits with \`tonto_apply\`, save returned source using filesystem tools, and validate saved files with \`tonto_validate\`. Release your saved files' held overlays before validating disk content.
6. When a request changes the ontology, inspect the existing model first, explain the intended modeling approach, and call out important assumptions before editing.
`.trimStart();

export const agentFolderGuidanceFiles: readonly AgentGuidanceFile[] = [
    {
        fileName: "tonto-guidance.md",
        content: tontoGuidance.trimStart(),
    },
    {
        fileName: "tonto-cardinality-guidance.md",
        content: tontoCardinalityGuidance.trimStart(),
    },
    {
        fileName: "tonto_llm_guidance.md",
        content: agentFolderGuidanceIndex,
    },
    {
        fileName: "tonto-llm-create-new-elements.md",
        content: tontoLLMCreateNewElements.trimStart(),
    },
    {
        fileName: "tonto_llm_terminology_analysis_guide.md",
        content: tontoLLMTerminologyAnalysisGuide.trimStart(),
    },
    {
        fileName: "tonto_llm_understanding_and_summarization_guide.md",
        content: tontoLLMUnderstanding.trimStart(),
    },
    {
        fileName: "tonto_llm_documentation_guide.md",
        content: tontoLLMDocumentationGuide.trimStart(),
    },
];

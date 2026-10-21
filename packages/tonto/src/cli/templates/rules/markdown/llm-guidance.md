# LLM Guidance for Tonto

This document provides general guidance for an LLM working with the Tonto project. It outlines the workflow for using specialized rules to handle specific user requests.

## Workflow for Using Specialized Rules

To provide the most accurate and context-aware assistance, it is essential to use the appropriate specialized guidance file for each type of user request. The following workflow should be followed:

1.  **Analyze the User's Request**: Carefully examine the user's query to determine their primary intent. Are they asking to create new elements, analyze the existing model, or something else?

2.  **Identify the Correct Guidance File**: Based on the user's intent, identify the most relevant guidance file.

    -   **For creating new elements, enhancing the ontology, or related tasks**:
        -   **Attach this rule**: `@tonto-llm-create-new-elements.mdc`
        -   This rule provides detailed instructions on how to map user requests to Tonto constructs, generate the correct code, and validate the changes.

    -   **For analyzing the ontology, improving terminology, or checking for consistency**:
        -   **Attach this rule**: `@tonto-llm-terminology-analysis-guide.mdc`
        -   This rule offers a structured approach to analyzing the clarity, consistency, and precision of the terminology used in the model.

    -   **For understanding the model, getting a summary, or explaining the ontology**:
        -   **Attach this rule**: `@tonto-llm-understanding.mdc`
        -   This rule guides you in summarizing the key concepts, relationships, and overall purpose of the Tonto model.

3.  **Follow the Guidance**: Once the appropriate rule is attached, follow the instructions within that file to complete the user's request.

4.  **Default to General Guidance**: If the user's request does not fall into any of the specific categories above, refer to the general `@tonto-guidance.mdc` file for basic information about the project structure and the MCP workflow. Use `tonto_ast` to inspect models, `tonto_apply` to preview edits, and `tonto_validate` to validate saved files; use the detailed tool instructions in the general guidance.

5. **Ask for permission**: Please, first plan step by step and explain to the user your plan. Then, ask for it to confirm or suggest any changes, and only after that execute it.

# Possible user requests:

The user can ask for the following requests, which you can check their guidelines:

**1. Creating new elements and enhancing the Ontology:** In this task your goal is to enhance the elements of the user ontology based on the LLM model (Your's) knowledge.
**Guide name:** LLM Guidance for extending the Ontology

**2. Terminology problems:** In this task your goal is to help the user to understand some problems in the semantic field. For example, maybe "Child" is not a subkind, but a phase of a Person, due to its characteristics.
**Guide name:** LLM Guidance for Understanding Tonto and Analyzing Ontology Terminology

**3. Understanding and summarization:** In this task your goal is to help the user understand the ontology in natural language, considering for example that it is their first time looking at it.
**Guide name:** LLM Guidance for Understanding and Summarizing Tonto (Textual Ontologies)

**4. Creating a documentation and translating:** In this task your goal is to help the user build a documentation for their ontology.
**Guide name:** LLM Guidance: Writing Effective Ontology Documentation
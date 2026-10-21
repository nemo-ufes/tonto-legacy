export const tontoMcpGuidance = `## Use Tonto MCP for Model Work

Use the connected Tonto MCP server for AST inspection, local validation, completion, and model edits. Discover the tools by their base names below; a client may add a server-specific prefix. Do not run \`tonto-cli validate\` for routine local validation when MCP is available.

| Tool | Use |
| --- | --- |
| \`tonto_ast\` | Inspect declarations, linked references, and source ranges. Invalid models can return a partial AST. |
| \`tonto_validate\` | Get project diagnostics, target diagnostics, available editor repairs, and \`valid\`. |
| \`tonto_complete\` | Get completion proposals at a zero-based UTF-16 \`line\` and \`character\`. |
| \`tonto_apply\` | Apply explicit LSP \`edits\`, or one repair selected by \`diagnosticIndex\` and optional \`repairTitle\`; return source and fresh diagnostics. |
| \`tonto_diff\` | Compare \`before\` and \`after\` source at an optional \`path\`, including diagnostics in affected project files. |
| \`tonto_hold\` | Hold unsaved \`source\` at a required \`path\` for imports in subsequent calls. Omit \`source\` to release that overlay. |

### Inspect, Edit, Save, Validate

1. Inspect the existing model with \`tonto_ast\` and establish its diagnostic baseline with \`tonto_validate\`, for example \`{"path":"src/main.tonto"}\`.
2. Use \`tonto_complete\` when needed. For an edit, pass the exact inspected \`source\` and its \`path\` to \`tonto_apply\`, with non-overlapping \`edits\` or a selected repair. \`diagnosticIndex\` indexes \`targetDiagnostics\`. Choose repairs only from the returned \`repairs\`; modelling decisions may have no automatic repair.
3. Review the returned source and diagnostics. Use \`tonto_diff\` to identify introduced and resolved diagnostics. For related unsaved files, use \`tonto_hold\` so imports resolve during the next request.
4. Save the chosen source with the agent's filesystem/editor tools. No MCP tool writes files: \`tonto_apply\` returns \`saved: false\` and does not update held content. Release overlays created for the files you saved with \`tonto_hold\` without \`source\`.
5. Call \`tonto_validate\` with the saved \`path\` and no \`source\` override to check the disk version. Report remaining project diagnostics and unresolved modelling decisions. Validation passes only when the tool succeeds and returns \`valid: true\`; an MCP error or unavailable server is not a validation pass.

Paths must end in \`.tonto\` and stay inside the server's configured project root. Use both \`source\` and \`path\` when previewing a file's replacement; otherwise source-only calls use \`__mcp_model__.tonto\`. Diagnostic, edit, and cursor positions are zero-based UTF-16, matching LSP. Project files, built-in datatypes, and held models are available to resolve references.

### Connecting the Server

The MCP client must launch an updated Tonto installation or a built checkout against the ontology project. For clients using \`mcpServers\` configuration:

\`\`\`json
{
  "mcpServers": {
    "tonto": {
      "command": "tonto-cli",
      "args": ["mcp", "/absolute/path/to/ontology-project"]
    }
  }
}
\`\`\`

For a local checkout, use \`node\` as the command and \`["/absolute/path/to/Tonto/packages/tonto/bin/mcp.js", "/absolute/path/to/ontology-project"]\` as the arguments after building \`tonto-cli\`. The launch command establishes the MCP connection; it is not a model-validation command.

If the tools are unavailable, report that MCP setup is required instead of silently switching to shell validation. Use CLI initialization, import/export, dependency management, or external API checks only when that operation is requested; these operations are not exposed by the six MCP tools above.
`;

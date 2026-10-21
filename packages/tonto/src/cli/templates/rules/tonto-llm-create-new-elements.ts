export const tontoLLMCreateNewElements = 
`
# LLM Guidance for extending the Ontology

## 1. Guidelines for Extending Ontologies with Tonto

Extending an existing Tonto ontology involves adding new classes, attributes, relations, and generalization sets while maintaining ontological soundness.

**1.1. Understand the Existing Ontology and Domain**
*   Thoroughly review the existing Tonto packages to understand the current scope, conventions, and key concepts.
*   Ensure a clear grasp of the real-world domain you are trying to model or extend.

**1.2. Identify New Concepts and Their Ontological Nature (UFO Alignment)**
*   What new entities, aspects, or events need to be represented?
*   Crucially, determine their fundamental UFO category:
    *   Is it a **Substantial** (like an object)?
        *   Does it provide its own identity? -> Likely a \`kind\`.
        *   Is it a collection of like things? -> \`collective\`.
        *   Is it an amount of matter? -> \`quantity\`.
    *   Is it a **Moment** (existentially dependent on other individuals)?
        *   Is it a truth-maker for a material relation? -> \`relator\`.
        *   Is it an inherent, possibly measurable characteristic? -> \`quality\` (e.g., weight, color).
        *   Is it an intrinsic, non-measurable characteristic or disposition? -> \`mode\` (e.g., a skill, a medical condition).
    *   Is it a **Perdurant** (something that happens in time)?
        *   Unfolds with temporal parts? -> \`event\` or \`process\`.
        *   A snapshot of the world? -> \`situation\`.

**1.3. Creating New Classes: Choosing the Right Stereotype**

1.  **Primary Substantials (Objects/Functional Complexes):**
    *   If the new concept is a type of object that provides a principle of identity for its instances (you can count them, identify them, track them through changes):
        \`\`\`tonto
        kind NewKindName { /* ... attributes and relations ... */ }
        // Example: kind Product
        \`\`\`

2.  **Specializations of Existing Kinds:**
    *   If the new concept is a subtype of an existing \`kind\` (or other ultimate sortal):
        *   **Rigid (always applies if it applies at all):**
            \`\`\`tonto
            subkind NewSubkindName specializes ExistingKindName { /* ... */ }
            // Example: subkind Book specializes Product
            \`\`\`
        *   **Anti-Rigid, Intrinsic Change (Phases):**
            \`\`\`tonto
            phase NewPhaseName specializes ExistingKindName { /* ... */ }
            // Example: phase Infant specializes Person
            \`\`\`
        *   **Anti-Rigid, Relational (Roles):**
            \`\`\`tonto
            role NewRoleName specializes ExistingKindName { /* ... */ }
            // Example: role Customer specializes Person
            \`\`\`
        *   **Anti-Rigid, Relational in context of an Event (Historical Roles):**
            \`\`\`tonto
            historicalRole NewHistoricalRoleName specializes ExistingKindName { /* ... */ }
            // Example: historicalRole ConferenceSpeaker specializes Person
            \`\`\`

3.  **Non-Sortals (Grouping across Kinds):**
    *   If the new concept groups individuals from *different* kinds based on shared properties:
        *   **Rigid (essential properties):**
            \`\`\`tonto
            category NewCategoryName (of <nature>)? { /* ... */ }
            // Example: category PhysicalAsset of objects
            \`\`\`
        *   **Anti-Rigid, Relational (Role Mixin):**
            \`\`\`tonto
            roleMixin NewRoleMixinName (of <nature>)? { /* ... */ }
            // Example: roleMixin Borrower of objects
            \`\`\`
        *   **Anti-Rigid, Intrinsic (Phase Mixin):**
            \`\`\`tonto
            phaseMixin NewPhaseMixinName (of <nature>)? { /* ... */ }
            // Example: phaseMixin DamagedItem of objects
            \`\`\`
        *   **Semi-Rigid (Mixin):**
            \`\`\`tonto
            mixin NewMixinName (of <nature>)? { /* ... */ }
            \`\`\`

4.  **Relators (for Material Relations):**
    *   If the new concept represents a relationship itself, which can have properties and endure through time:
        \`\`\`tonto
        relator NewRelatorName {
            @mediation [<cardinality>] -- [<cardinality>] ParticipatingClass1
            @mediation [<cardinality>] -- [<cardinality>] ParticipatingClass2
            // ... other attributes of the relator ...
        }
        // Example: relator Employment {
        //   @mediation [1] -- (employeeEnd) -- [1] Employee
        //   @mediation [1] -- (employerEnd) -- [1] Organization
        //   startDate: date
        // }
        \`\`\`

5.  **Events/Situations:**
    \`\`\`tonto
    event NewEventName { /* attributes like timestamp, location */ }
    situation NewSituationName { /* ... */ }
    \`\`\`

6.  **Qualities/Modes:**
    \`\`\`tonto
    quality NewQualityName { /* typically linked to datatypes or value spaces */ }
    mode NewModeName { /* ... */ }
    \`\`\`

**4.4. Defining Attributes for New Classes**
*   For each new class, identify its relevant properties.
*   Define attributes using the syntax: \`<name>: <DataType> [<cardinality>]? { <meta-properties> }?\`
    \`\`\`tonto
    kind Vehicle {
        registrationNumber: string [1] { const }
        manufacturingYear: number
        color: string [0..1]
    }
    \`\`\`

**1.5. Defining Relationships for New Classes**
*   Determine how the new class interacts with existing or other new classes.
*   Use internal or external relation syntax.
*   Choose the correct connector (\`--\`, \`<>--\`, \`<o>--\`).
*   Apply OntoUML relation stereotypes (\`@mediation\`, \`@componentOf\`, etc.) if applicable.
*   Specify cardinalities and role names for clarity.

    Example: Adding \`kind Engine\` as a component of \`kind Vehicle\`:
    \`\`\`tonto
    kind Vehicle {
        // ... attributes ...
        @componentOf [1] <o>-- hasEngine -- [1] Engine
    }

    kind Engine {
        engineCode: string
    }
    \`\`\`

**1.6. Establishing Generalizations**
*   If a new class is a subtype of an existing class, use \`specializes\`.
*   If a group of new or existing classes form a partition or categorization under a common superclass, define a \`genset\`.

    Example: Adding \`Car\` and \`Truck\` as types of \`Vehicle\`.
    \`\`\`tonto
    kind Vehicle { /* ... */ }
    kind Car specializes Vehicle { /* ... */ }
    kind Truck specializes Vehicle { /* ... */ }

    disjoint complete genset VehicleTypes where Car, Truck specializes Vehicle
    \`\`\`

**1.7. Considering Ontological Natures**
*   For new non-sortal classes, use \`of <nature>\` to constrain their instances if necessary.
    \`\`\`tonto
    category Asset of objects
    \`\`\`

**1.8. Organize the proposed elements by packages**
* Based on the elements proposed, you must create packages to better organize them. That way the ontology is better modularized and organized by context.

**1.9. Iterate and Validate**
*   Ontology modeling is iterative. After adding new elements, review them:
    *   Are the stereotypes correct according to UFO?
    *   Are relationships and cardinalities accurate?
    *   After saving changes and releasing your held overlays, does \`tonto_validate\` return \`valid: true\` for the saved path? Inspect project diagnostics and explain unresolved modelling decisions.
    *   Does the extension make sense in the overall context of the ontology?
*   Refer to the \`docs/tonto.md\` paper and UFO literature for guidance on ontological principles.
`;

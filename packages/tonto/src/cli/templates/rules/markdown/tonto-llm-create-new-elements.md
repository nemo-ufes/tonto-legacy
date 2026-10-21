# LLM Guidance for Extending Ontologies

This guide provides a systematic methodology for extending existing Tonto ontologies with new elements while maintaining ontological soundness and consistency. For syntax examples, refer to the comprehensive [`tonto-guidance.md`](./tonto-guidance.md).

## 1. Ontological Analysis Process

### 1.1. Domain Understanding Phase

**Before adding any new elements, conduct a thorough analysis:**

1. **Review Existing Ontology Structure**
   - Identify current packages and their purposes
   - Map existing class hierarchies and relationships
   - Understand naming conventions and modeling patterns
   - Note any domain-specific constraints or validation rules

2. **Analyze Domain Requirements**
   - What real-world concepts need to be represented?
   - What business processes or workflows must be supported?
   - What data needs to be captured and how is it structured?
   - What constraints exist in the domain?

3. **Gap Analysis**
   - Which concepts are missing from the current ontology?
   - What relationships between existing and new concepts are needed?
   - Are there inconsistencies or incomplete coverage areas?
   - What level of detail is required for new concepts?

### 1.2. Concept Classification Framework

**For each new concept, systematically determine its ontological nature:**

#### Step 1: Fundamental Category Assessment
Ask these questions in order:

1. **Is it something that exists independently?**
   - YES → Potential Substantial (Kind, Collective, Quantity)
   - NO → Continue to Step 2

2. **Does it depend on other entities for existence?**
   - YES → Potential Moment (Quality, Mode, Relator)
   - NO → Continue to Step 3

3. **Does it happen in time with temporal parts?**
   - YES → Potential Perdurant (Event, Process, Situation)
   - NO → Reconsider classification

#### Step 2: Identity Principle Analysis
For Substantials, determine identity:

- **Can instances be counted and individually tracked?** → Kind
- **Is it a collection of similar things?** → Collective  
- **Is it an amount or portion of matter?** → Quantity

#### Step 3: Dependence Analysis
For Moments, determine the type of dependence:

- **Does it ground material relationships between entities?** → Relator
- **Is it measurable/comparable (weight, color, temperature)?** → Quality
- **Is it intrinsic and non-measurable (skill, belief)?** → Mode

### 1.3. Rigidity Assessment

**Determine whether the new concept is rigid, anti-rigid, or semi-rigid:**

- **Rigid**: Essential properties that never change (Kind, Subkind, Category)
- **Anti-rigid**: Contingent properties that can change (Phase, Role, Mixin variations)
- **Semi-rigid**: Essential for some instances, contingent for others (Mixin)

## 2. Stereotype Selection Framework

### 2.1. Decision Tree for Ultimate Sortals

```
New Concept Assessment:
├── Provides identity principle?
│   ├── YES: Ultimate Sortal
│   │   ├── Individual objects → kind
│   │   ├── Collections → collective
│   │   ├── Matter portions → quantity
│   │   ├── Measurable properties → quality
│   │   ├── Non-measurable properties → mode
│   │   ├── Relationship grounders → relator
│   │   └── Type classifiers → type/powertype
│   └── NO: Non-Ultimate Sortal or Non-Sortal
```

### 2.2. Decision Framework for Specializations

**When creating subtypes of existing classes:**

1. **Rigidity Check**:
   - If essential/unchangeable → `subkind`
   - If intrinsic but changeable → `phase`
   - If relational/contextual → `role`
   - If historical/event-based → `historicalRole`

2. **Scope Check**:
   - Single kind specialization → Use sortal stereotypes
   - Multiple kinds → Use non-sortal stereotypes

3. **Validation Questions**:
   - Can an instance change between these subtypes?
   - Is the distinction essential or accidental?
   - Does the distinction depend on relationships?

### 2.3. Non-Sortal Selection Criteria

**For concepts that span multiple kinds:**

- **category**: Essential properties across different kinds
- **mixin**: Properties essential for some kinds, accidental for others
- **phaseMixin**: Changeable intrinsic properties across kinds
- **roleMixin**: Changeable relational properties across kinds

## 3. Extension Strategy Guidelines

### 3.1. Consistency Maintenance

**Ensure new elements align with existing patterns:**

1. **Naming Conventions**
   - Follow established naming patterns
   - Use consistent terminology from the domain
   - Maintain clear, descriptive names
   - Avoid ambiguous or overloaded terms

2. **Stereotype Consistency**
   - Use same stereotypes for similar concepts
   - Maintain consistent rigidity patterns
   - Follow established specialization hierarchies
   - Respect existing ontological commitments

3. **Relationship Patterns**
   - Mirror relationship styles for similar concepts
   - Use consistent stereotypes for similar relationship types
   - Maintain cardinality patterns where applicable
   - Follow established part-whole relationships

### 3.2. Integration Approach

**Systematically integrate new elements:**

1. **Minimal Disruption Principle**
   - Extend rather than modify existing stable elements
   - Use specialization to add specificity
   - Avoid breaking existing relationships
   - Maintain backward compatibility

2. **Incremental Development**
   - Add core concepts first
   - Build relationships gradually
   - Test consistency at each step
   - Validate before adding complexity

3. **Impact Assessment**
   - Identify all affected existing elements
   - Check for new validation requirements
   - Consider performance implications
   - Document changes and rationale

### 3.3. Relationship Design Strategy

**For new relationships between classes:**

1. **Nature Identification**
   - Material relationships → Use appropriate material stereotypes
   - Formal relationships → Use formal stereotypes
   - Part-whole relationships → Use mereological stereotypes
   - Event participation → Use participational stereotypes

2. **Directionality and Cardinality**
   - Determine natural reading direction
   - Set realistic cardinality constraints
   - Consider both minimum and maximum bounds
   - Use meta-attributes when appropriate

3. **Relationship Evolution**
   - Can the relationship change over time?
   - Are there lifecycle dependencies?
   - What triggers relationship creation/termination?
   - Are there constraint propagation needs?

## 4. Package Organization Strategy

### 4.1. Modular Design Principles

**Organize new elements for maximum reusability and maintainability:**

1. **Cohesion Principles**
   - Group closely related concepts together
   - Separate concerns by domain area
   - Minimize cross-package dependencies
   - Create stable, reusable modules

2. **Abstraction Levels**
   - Core/foundation packages for basic concepts
   - Domain-specific packages for specialized concepts
   - Application-specific packages for custom extensions
   - Utility packages for common patterns

### 4.2. Package Structure Recommendations

**Suggested organization patterns:**

1. **By Domain Area**
   - `core.persons` - Basic person concepts
   - `business.employment` - Employment relationships
   - `finance.transactions` - Financial operations

2. **By Abstraction Level**
   - `foundation` - Most general concepts
   - `domain` - Domain-specific concepts
   - `application` - Specific use case implementations

3. **By Lifecycle**
   - `stable` - Well-established, rarely changing concepts
   - `development` - Active development, may change
   - `experimental` - Proof of concepts, may be removed

### 4.3. Dependency Management

**Plan package dependencies carefully:**

1. **Dependency Direction**
   - Higher-level packages depend on lower-level ones
   - Avoid circular dependencies
   - Minimize dependency chains
   - Use global packages for widely-used primitives

2. **Version Management**
   - Plan for versioning and compatibility
   - Document breaking changes
   - Provide migration paths
   - Use semantic versioning principles

## 5. Quality Assurance Checklist

### 5.1. Ontological Soundness

**Before finalizing new elements, verify:**

- [ ] All stereotypes align with UFO principles
- [ ] Rigidity properties are correctly assigned
- [ ] Identity principles are clear and consistent
- [ ] Dependence relationships are properly modeled
- [ ] No ontological anti-patterns are introduced

### 5.2. Consistency Validation

**Ensure consistency with existing ontology:**

- [ ] Naming follows established conventions
- [ ] Relationship patterns are consistent
- [ ] Cardinalities are realistic and validated
- [ ] No duplicate or conflicting concepts
- [ ] All cross-references are valid

### 5.3. Completeness Assessment

**Verify all requirements are addressed:**

- [ ] All identified concepts are modeled
- [ ] Required relationships are established
- [ ] Necessary constraints are implemented
- [ ] Package organization supports intended use
- [ ] Documentation is complete and accurate

## 6. Iterative Refinement Process

### 6.1. Validation and Testing

**After each addition:**

1. Call `tonto_validate` with saved file paths after releasing your held overlays; check `valid` and project diagnostics
2. Check for logical consistency
3. Test with sample data
4. Verify relationship integrity
5. Validate cardinality constraints

### 6.2. Review and Refinement

**Regular review cycles should assess:**

- Ontological accuracy
- Usability and clarity
- Performance implications
- Evolution requirements
- User feedback integration

### 6.3. Documentation and Communication

**Maintain clear documentation:**

- Document design decisions and rationale
- Provide usage examples and guidelines
- Maintain change logs and version history
- Create migration guides for major changes

**For complete syntax examples and detailed grammar reference, see [`tonto-guidance.md`](./tonto-guidance.md) sections:**
- Section 3: Type Declarations and Stereotypes
- Section 4: Relations and Relationships  
- Section 5: Generalization Sets
- Section 7: Complete Working Examples
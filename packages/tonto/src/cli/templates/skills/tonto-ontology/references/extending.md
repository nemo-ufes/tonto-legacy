# Extending Ontologies with Tonto

This guide covers how to add new classes, attributes, relations, and generalization sets to an existing Tonto ontology while maintaining ontological soundness.

## Workflow

1. **Understand the existing ontology** — Read all relevant `.tonto` files to grasp current scope, conventions, and key concepts.
2. **Identify new concepts** — Determine what new entities, aspects, or events need representation.
3. **Classify each concept** — Assign the correct UFO category (see decision tree below).
4. **Define attributes and relations** — Add properties and connections.
5. **Organize into packages** — Group related elements for modularity.
6. **Validate with MCP** — Use `tonto_validate` after saving changes and releasing your held overlays. Review project diagnostics and ontological consistency; follow the MCP workflow in SKILL.md.

## Decision Tree for Choosing Stereotypes

Ask these questions about each new concept:

### Is it a Substantial (like an object)?

- **Does it provide its own identity?** (you can count, identify, and track instances)
  - Functional complex → `kind` (e.g., `kind Person`, `kind Car`)
  - Collection of similar members → `collective` (e.g., `collective Flock`)
  - Amount of matter → `quantity` (e.g., `quantity WaterPortion`)

### Is it a Moment (existentially dependent on other individuals)?

- Truth-maker for a material relation → `relator` (e.g., `relator Employment`)
- Measurable characteristic → `quality` (e.g., `quality Weight`)
- Intrinsic, non-measurable property → `mode` (e.g., `mode Skill`)

### Is it a Perdurant (something that happens in time)?

- Unfolds with temporal parts → `event` or `process`
- Snapshot of the world → `situation`

### Is it a specialization of an existing type?

- **Rigid** (always applies) → `subkind`
- **Anti-rigid, intrinsic change** (enters/leaves based on internal change) → `phase`
- **Anti-rigid, relational** (enters/leaves based on a relationship) → `role`
- **Anti-rigid, event context** → `historicalRole`

### Does it group instances from different kinds?

- **Rigid** (essential shared properties) → `category`
- **Semi-rigid** → `mixin`
- **Anti-rigid, intrinsic** → `phaseMixin`
- **Anti-rigid, relational** → `roleMixin`

## Creating New Classes

### Kinds (fundamental types)
```tonto
kind Product {
    name: string
    sku: string { const }
    price: number
}
```

### Specializations
```tonto
subkind Book specializes Product {
    isbn: string { const }
    pageCount: number
}

phase Infant specializes Person {
    // intrinsic: age < some threshold
}

role Customer specializes Person {
    // relational: exists because of a purchase relationship
}
```

### Non-Sortals
```tonto
category PhysicalAsset of objects {
    serialNumber: string [0..1]
}

roleMixin Borrower of objects {
    // anti-rigid: depends on borrowing relationship
}
```

### Relators
```tonto
relator Employment {
    @mediation [1..*] -- [1] Employee
    @mediation [1..*] -- [1] Organization
    startDate: date
    endDate: date [0..1]
}
```

### Events
```tonto
event PurchaseOrder {
    orderDate: datetime
    totalAmount: number
}
```

## Defining Relationships

Choose the correct connector and stereotype:

```tonto
// Composition (exclusive part-whole)
kind Vehicle {
    @componentOf [1] <o>-- hasEngine -- [1] Engine
}

// Aggregation (shared part-whole)
kind Department {
    @memberOf [1..*] <>-- hasMembers -- [1..*] Person
}

// External material relation
@material relation Person [0..*] -- enrolledIn -- [0..*] Course
```

## Establishing Generalizations

```tonto
kind Vehicle { /* ... */ }
subkind Car specializes Vehicle { /* ... */ }
subkind Truck specializes Vehicle { /* ... */ }

disjoint complete genset VehicleTypes where Car, Truck specializes Vehicle
```

## Package Organization

Group related elements into separate `.tonto` files by conceptual domain:

```tonto
// src/core/persons.tonto
package core.persons
kind Person { name: string }

// src/core/organizations.tonto
import core.persons
package core.organizations
kind Organization { legalName: string }
role Employee specializes core.persons.Person { /* ... */ }
```

## Validation Checklist

After extending the ontology, verify:

- [ ] Every sortal ultimately specializes exactly one ultimate sortal (`kind`, `collective`, `quantity`, etc.)
- [ ] Stereotypes correctly reflect UFO properties (rigidity, identity, dependence)
- [ ] Cardinalities are accurate for the domain
- [ ] Non-sortals have appropriate `of <nature>` constraints
- [ ] Relators mediate at least two distinct entities
- [ ] **No reserved keywords used as attribute names** — stereotype keywords (`kind`, `role`, `type`, `phase`, `mode`, `relator`, `quality`, etc.), `label`, `description`, and `value` are reserved and cannot be used as attribute or datatype field names. Use prefixed alternatives (e.g., `_description`, `_value`, `_role`) or synonyms (e.g., `summary`, `amount`, `participationRole`).
- [ ] Saved files pass `tonto_validate` with no introduced project errors
- [ ] The extension is consistent with the existing ontology's conventions

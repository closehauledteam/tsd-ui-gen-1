# AI Agent Guide: TSD UI Gen 1

This project follows a strict **Markdown-Driven Development** methodology. As an AI agent, you must adhere to these rules to maintain project integrity.

## 1. Core Philosophy

**"The Spec is the Source of Truth."**

-   **NEVER** create or modify UI/Flow code manually without a corresponding Markdown specification.
-   **ALWAYS** read the specification first.
-   **ALWAYS** generate code based strictly on the specification.

## 2. Project Structure

```
specs/
  screens/          # SOURCE OF TRUTH: Markdown files describing screens
src/
  features/         # GENERATED CODE: One folder per screenId
    <screenId>/
      <Name>FormUI.tsx    # Pure UI Component
      <name>Flow.ts       # Business Logic (Custom Hook)
      <Name>Screen.tsx    # Container (wires UI + Flow + Services)
  app/
    services/       # Core Service Interfaces & Context
  platform/
    mock/           # Mock Service Implementations
screen-manifest.ts  # Registry of all screens
```

## 3. Workflow for New Screens

1.  **Create Specification**:
    -   Create `specs/screens/<screen-id>.md`.
    -   Include YAML frontmatter (see below).
    -   Describe UI structure and Behavior/Flow in detail.

2.  **Generate Code**:
    -   Create `src/features/<screen-id>/`.
    -   Generate `FormUI.tsx`, `Flow.ts`, and `Screen.tsx` based *only* on the markdown.
    -   Add the standard header to generated files:
        ```typescript
        // AUTO-GENERATED FILE
        // screenId: <screen-id>
        // spec: specs/screens/<screen-id>.md
        // WARNING: This file is generated automatically based on requirements.
        ```

3.  **Register Screen**:
    -   Update `screen-manifest.ts` to include the new screen.

## 4. Workflow for Modifying Screens

1.  **Edit Specification**:
    -   Modify `specs/screens/<screen-id>.md` to reflect the new requirements.
2.  **Regenerate Code**:
    -   Rewrite the files in `src/features/<screen-id>/` to match the updated spec.

## 5. Technical Constraints

-   **Framework**: React Native (Expo).
-   **Language**: TypeScript.
-   **State Management**: Local state (`useState`) + Context for Services. **NO Redux/MobX**.
-   **Styling**: `StyleSheet.create`.
-   **Services**:
    -   UI components must **NOT** import services directly.
    -   Flow hooks use `useServices()` to access logic.
    -   Services are defined in `src/app/services/types.ts`.

## 6. Markdown Spec Format

Every spec must start with:

```yaml
---
screenId: example-screen
title: "Example Screen"
version: 1
uiTarget: "react-native"
generated:
  featureDir: "src/features/example-screen"
  uiFile: "src/features/example-screen/ExampleFormUI.tsx"
  flowFile: "src/features/example-screen/exampleFlow.ts"
  screenFile: "src/features/example-screen/ExampleScreen.tsx"
services:
  - ServiceName.methodName
---
```

## 7. Visual Templates

**CRITICAL**: All generated UI must follow the visual patterns defined in `specs/templates/`.

-   **Standard Forms**: Use `specs/templates/standard-form.md` for layout, spacing, and input styles.
-   **Consistency**: Do not invent new styles. Reuse the defined constants and patterns.
-   **New Templates**: If a new pattern is needed, create a new template file in `specs/templates/` first.

## 8. Technical Assignments

**Purpose**: Store raw requirements or Technical Assignments (TA) received from the client. These serve as the source material for creating Draft Specifications.

-   **Location**: `specs/technical-assignments/`
-   **Format**: Any (Markdown, Text, PDF, etc., but Markdown preferred for analysis).
-   **Workflow**:
    1.  **Ingest**: Save the client's TA into `specs/technical-assignments/`.
    2.  **Analyze**: AI Agent analyzes the TA to identify screens and flows.
    3.  **Draft**: Generate Draft Specifications in `specs/drafts/` based on the TA (see Section 9).

## 9. Draft Specifications

**Purpose**: Store specifications generated from client Technical Assignments (TA) that are not yet ready for implementation or linked to code.

-   **Location**: `specs/drafts/`
-   **Format**: Same Markdown format as active specs (see Section 6).
-   **Workflow**:
    1.  **Generate**: Create a draft spec in `specs/drafts/` based on client requirements (from Section 8).
    2.  **Review**: User reviews the draft.
    3.  **Activate**: When approved, move the file to `specs/screens/` and proceed with code generation (Section 3).

## 10. Role-Based Access Control (RBAC)

Security is enforced at multiple layers.

### 1. Service Layer (Source of Truth)
-   **`AuthService`**: The single source of truth for user identity and permissions.
-   **Methods**: Use `getCurrentUser()`, `hasPermission(p)`, and `hasRole(r)`.

### 2. Business Logic (Enforcement)
-   **Flow Hooks**: Security checks MUST happen here.
-   **Pattern**:
    ```typescript
    if (!auth.hasPermission('APPROVE_RECEIPT')) {
      throw new Error('Access Denied');
    }
    ```

### 3. UI Layer (Visual Feedback)
-   **Dumb Components**: `FormUI` components do **NOT** access `AuthService`.
-   **Props**: Pass permissions as boolean props (e.g., `canApprove: boolean`).
-   **Container**: The `Screen` container connects `AuthService` to the `FormUI` props.

### 4. Specifications
-   **Define Rules**: Explicitly state required permissions in the Markdown spec (e.g., "Approve Button: Visible only for Managers").

## 11. Verification

After generating code:
1.  Ensure all imports are correct (relative paths).
2.  Ensure types match `src/app/services/types.ts`.
3.  If a new service method is needed, define it in `types.ts` and implement a mock in `mockServices.ts` *before* using it in the flow.

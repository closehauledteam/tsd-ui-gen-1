# Proposal: Role-Based Access Control (RBAC) Architecture

This document outlines how to implement a Role-Based Access Control model within the existing Markdown-Driven, Service-Oriented architecture of the TSD project.

## 1. Service Layer (The Foundation)

We need to introduce an `AuthService` to the core `AppServices`. This service will be the single source of truth for user identity and permissions.

### Interface Definition (`src/app/services/types.ts`)

```typescript
export type Role = 'WAREHOUSE_WORKER' | 'MANAGER' | 'ADMIN';
export type Permission = 'RECEIVE_GOODS' | 'APPROVE_RECEIPT' | 'VIEW_REPORTS';

export interface User {
  id: string;
  name: string;
  roles: Role[];
  permissions: Permission[];
}

export interface AuthService {
  getCurrentUser(): Promise<User | null>;
  hasPermission(permission: Permission): boolean;
  hasRole(role: Role): boolean;
}

export interface AppServices {
  // ... existing services
  auth: AuthService;
}
```

## 2. Business Logic Level (Flow Hooks)

Security checks should be enforced in the "Flow" hooks (`*Flow.ts`). This ensures that even if the UI is bypassed, the logic remains secure.

### Implementation Pattern

In your flow hook (e.g., `useReceiveItemFlow.ts`):

```typescript
export const useReceiveItemFlow = () => {
  const { auth, scan } = useServices();

  const handleApprove = async () => {
    // 1. Check Permission
    if (!auth.hasPermission('APPROVE_RECEIPT')) {
      showError('Access Denied: You need Manager rights.');
      return;
    }

    // 2. Perform Action
    await scan.approve(...);
  };

  return { handleApprove };
};
```

## 3. UI Level (Visual Feedback)

The UI should reflect permissions by hiding or disabling elements. In our architecture, **UI components (`FormUI`) are dumb** and should not know about `AuthService`. They should receive permissions as **boolean props**.

### Screen Container (`*Screen.tsx`)

The Container is responsible for connecting the `AuthService` to the `FormUI`.

```typescript
// ReceiveItemScreen.tsx
export const ReceiveItemScreen = () => {
  const { auth } = useServices();
  const { handleApprove } = useReceiveItemFlow();

  // Calculate UI flags based on permissions
  const canApprove = auth.hasPermission('APPROVE_RECEIPT');

  return (
    <ReceiveItemFormUI
      onApprove={handleApprove}
      showApproveButton={canApprove} // <--- Pass as Prop
    />
  );
};
```

### UI Component (`*FormUI.tsx`)

The UI component simply respects the prop.

```typescript
// ReceiveItemFormUI.tsx
interface Props {
  showApproveButton: boolean;
  onApprove: () => void;
}

export const ReceiveItemFormUI: React.FC<Props> = ({ showApproveButton, onApprove }) => {
  return (
    <View>
      {/* ... other fields ... */}
      
      {showApproveButton && (
        <Button title="Approve" onPress={onApprove} />
      )}
    </View>
  );
};
```

## 4. Markdown Specification Integration

To maintain the "Spec is Source of Truth" philosophy, permissions should be defined in the Markdown files.

### Option A: Frontmatter (Screen Level)

Define required roles to access the entire screen.

```yaml
---
screenId: receive-item
permissions:
  required: ["WAREHOUSE_WORKER"]
---
```

### Option B: Element Description (Component Level)

Describe visibility rules in the text.

```markdown
### Action Buttons

- **Approve Button**:
  - Label: "Подтвердить"
  - Action: Triggers approval flow.
  - **Visibility**: Only visible for users with 'APPROVE_RECEIPT' permission.
```

## Summary of Responsibilities

| Layer | Responsibility | Example |
|-------|----------------|---------|
| **Spec (MD)** | Define the rules | "Button is visible only for Managers" |
| **Service** | Provide capability to check | `auth.hasRole('MANAGER')` |
| **Flow (Logic)** | Enforce the rules | `if (!auth.hasRole('MANAGER')) throw Error` |
| **Container** | Map rules to UI props | `canApprove = auth.hasRole('MANAGER')` |
| **UI** | Render based on props | `{canApprove && <Button />}` |

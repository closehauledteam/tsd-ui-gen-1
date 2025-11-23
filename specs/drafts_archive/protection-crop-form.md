---
screenId: protection-crop-form
title: "Plant Protection Form"
version: 2
uiTarget: "react-native"
status: "draft"
permissions:
  required: ["PROTECTION_CROP_CREATE", "PROTECTION_CROP_EDIT"]
transitions:
  - target: protection-crop-list
    label: "Завершить"
---

# Plant Protection Form (DiseaseMonitoring)

Interface for creating or editing a disease report. Supports offline mode.

## UI Structure

### Header
- **Title**: "Создать мониторинг" (Create Monitoring) or "Редактировать запись" (Edit Record)
- **Back Button**: Returns to previous screen.

### Input Methods (Top Section)
- **Buttons**:
  - **Text**: Opens the manual form (default).
  - **Voice**: Activates voice transcription (future feature).

### Form Fields
1.  **Location**:
    -   **Block** (Select): "Блок А", "Блок Б", "Блок В", "Блок Г".
    -   **Row** (Input): Text input (e.g., "Ряд 12").
2.  **Plant Details**:
    -   **Hybrid** (Select): List of hybrids (e.g., "Томат F1 Пинк Парадайз").
3.  **Disease Info**:
    -   **Disease** (Select): List of diseases (e.g., "Фитофтороз", "Мучнистая роса").
    -   **Severity** (Select):
        -   "Низкая" (Low) - Green style.
        -   "Средняя" (Medium) - Yellow style.
        -   "Высокая" (High) - Red style.
4.  **Status & Responsibility**:
    -   **Status** (Select): "Active", "Inactive".
    -   **Responsible** (Select): List of users.
5.  **Problems** (Multi-select Tags):
    -   Common issues: "Пятна на листьях", "Увядание", "Гниение корней", etc.
    -   Interaction: Toggle selection.
6.  **Notes**:
    -   Textarea for additional info.
7.  **Photos**:
    -   **Actions**: "Сделать фото" (Camera), "Загрузить" (Gallery).
    -   **Gallery**: Grid of thumbnails with "Remove" (X) button.
    -   **Counter**: "Загружено фото: N".

### Footer Actions
-   **Save** (Button): Primary, Green. Saves locally (offline) or syncs (online).
-   **Cancel** (Button): Secondary, Outline.

## Logic & Behavior
-   **Offline-First**: Records are saved to local storage (SQLite/Realm) first with `syncStatus: 'pending'`.
-   **Validation**: Block, Row, Hybrid, Disease, Severity are required.
-   **Photo Handling**: Photos are stored in the local filesystem.
-   **Sync**: Background sync uploads records and photos when online.

## Data Model
Maps to `grower.protection_crop` table.
-   `id_plant` (derived from Block/Row)
-   `id_disease`
-   `id_sever_type`
-   `note`
-   `path_foto` (JSON array of local paths)

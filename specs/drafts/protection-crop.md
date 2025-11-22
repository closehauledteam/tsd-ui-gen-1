---
screenId: protection-crop
title: "Plant Protection"
version: 1
uiTarget: "react-native"
status: "draft"
permissions:
  required: ["PROTECTION_CROP_VIEW", "PROTECTION_CROP_EDIT"]
---

# Plant Protection Screen

Interface for reporting and managing plant diseases and protection measures. Based on code snippets from `1.docx`.

## UI Structure

### Header
- **Title**: "Защита растений" (Plant Protection)
- **Back Button**: Returns to Main Menu.

### Disease Report Form (Modal/Screen)
- **Notes**:
  - Label: "Заметки"
  - Type: Text Area
  - Placeholder: "Дополнительная информация"
- **Photos**:
  - Label: "Фотографии"
  - Actions: "Сделать фото" (Camera), "Загрузить" (Upload)
  - Preview: Grid of thumbnails with "Remove" (x) button.
- **Actions**:
  - "Сохранить" (Save) - Green button.
  - "Отмена" (Cancel) - Outline button.

### Records List
- **List Item Card**:
  - **Status Icon**: Alert Triangle (Red for Active, Gray for Inactive).
  - **Header**: Disease Name.
  - **Subtext**: Row • Hybrid.
  - **Severity Badge**: Color-coded severity level.
  - **Notes**: Display text if available.
  - **Metadata**:
    - Created By (User icon)
    - Responsible (User icon)
    - Date (Calendar icon)
  - **Footer**:
    - Status Badge (Active/Inactive)
    - "Подробнее" (View Details) button.

## Data Model (Inferred from Schema)
- **Table**: `grower.protection_crop`
- **Fields**: `id_plant`, `id_disease`, `severity`, `notes`, `photos`, `status`, `created_by`, `assigned_to`.

## Flow
1. User views list of protection records.
2. User taps "New Report" (implied).
3. User fills out notes and adds photos.
4. User saves record.

---
screenId: quality-control
title: "Quality Control"
version: 1
uiTarget: "react-native"
status: "draft"
permissions:
  required: ["QUALITY_CONTROL"]
---

# Quality Control Screen

Interface for managing quality inspections and viewing results.

## UI Structure

### Header
- **Title**: "Контроль качества" (Quality Control)
- **Back Button**: Returns to Main Menu.

### Dashboard/Summary
- **Metrics**:
  - "Проверено" (Checked) count.
  - "Брак" (Defects) count/percentage.

### Action Buttons
- **New Inspection**:
  - Label: "Новая проверка"
  - Action: Starts a new QC flow.

### Recent Inspections List
- List of recent checks with status (Passed/Failed) and timestamp.

## Flow
1. User navigates from Main Menu.
2. User views summary stats.
3. User starts a new inspection.

## Visual Style
- **Dashboard**: High-level metrics at the top.
- **List**: Scrollable list of recent items.

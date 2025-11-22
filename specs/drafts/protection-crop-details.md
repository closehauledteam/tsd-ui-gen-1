---
screenId: protection-crop-details
title: "Plant Protection Details"
version: 1
uiTarget: "react-native"
status: "draft"
permissions:
  required: ["PROTECTION_CROP_VIEW"]
---

# Plant Protection Details (DiseaseDetailsPage)

Detailed view of a specific disease report.

## UI Structure

### Header
-   **Back Button**: Returns to List.
-   **Title**: Disease Name.
-   **Icon**: Large Severity Icon (Red/Yellow/Green).

### Main Info Card
-   **Location**: Row/Block.
-   **Hybrid**: Name.
-   **Date**: Discovery Date.
-   **Severity**: Badge.

### Notes Card
-   **Content**: Text notes from the report.

### Photo Gallery
-   **Grid**: Thumbnails of attached photos.
-   **Interaction**: Tap to view full screen.

### Actions (Footer)
-   **Edit Record** (Button): Navigates to `protection-crop-form` in Edit mode.
-   **Create Task** (Button): Navigates to Task Creation (pre-filled).

## Logic
-   **Data Source**: Loads from local cache (offline) or API.
-   **Permissions**: "Edit" button visible only if user has `PROTECTION_CROP_EDIT`.

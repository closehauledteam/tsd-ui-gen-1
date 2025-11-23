# Plant Protection List (DiseaseMapTab)

Main dashboard for viewing disease reports. Supports filtering and sorting.

## UI Structure

### Header
-   **Title**: "Защита растений"
-   **Sync Indicator**: Badge showing pending syncs or "Synced".

### Filters (Top Bar)
-   **Block Selector**: Filter by Greenhouse Block.
-   **Sort**: By Severity (High->Low), Date (New->Old).

### List Content
-   **Empty State**: "Заболеваний не обнаружено" (Green check circle).
-   **List Items (Cards)**:
    -   **Status Icon**:
        -   Active: Alert Triangle (Red/Yellow/Green based on severity).
        -   Resolved: Check Circle (Gray).
    -   **Title**: Disease Name.
    -   **Subtitle**: "Ряды: X-Y".
    -   **Badge**: Severity Label ("Высокая", "Средняя", "Низкая").
    -   **Details**:
        -   "Обнаружено": Date.
        -   "Вылечено": Date (if resolved).
        -   "Инициатор": User Name.
        -   "Ответственный": User Name.
    -   **Stats**:
        -   "Выполнено": Count.
        -   "Запланировано": Count.

### Interactions
-   **Tap**: Navigates to `protection-crop-details`.
-   **Pull-to-Refresh**: Triggers sync.

## Logic
-   **Sorting**: Active diseases first (High -> Low severity), then Resolved (by date).
-   **Offline**: Shows cached data. Indicates if data is stale.
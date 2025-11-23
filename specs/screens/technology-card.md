# Technology Card Screen

Displays agronomic technology cards and their stages. Based on SQL schema `grower.technology_card` and `grower.technology_stage`.

## UI Structure

### Header
- **Title**: "Технологическая карта"
- **Subtitle**: Card Name (e.g., "Tomato Summer 2025")

### Card Details (Summary)
- **Info Grid**:
  - **Climate Zone**: Text.
  - **Season**: Text.
  - **Difficulty**: Text.
  - **Duration**: Days.
  - **Article/Hybrid**: Link to Article.

### Stages List (Timeline)
- **List Item**:
  - **Order**: Stage Number.
  - **Name**: Stage Name.
  - **Phase**: Plant Phase (e.g., "Flowering").
  - **Duration**: Days.
  - **Conditions (Collapsible)**:
    -   Temp: Min-Max °C.
    -   Humidity: Min-Max %.
    -   Lighting: Hours.
    -   Irrigation: ml.
  - **Resources**:
    -   Fertilizers (JSON list).
    -   Procedures (JSON list).

## Data Model
- **Card Table**: `grower.technology_card`
- **Stage Table**: `grower.technology_stage`
- **Relationships**: One Card -> Many Stages.

## Flow
1. User selects a Tech Card from a list.
2. User views details and scrolls through stages.
3. User can tap a stage to view detailed instructions (Procedures).
---
screenId: technology-card
title: "Technology Card"
version: 1
uiTarget: "react-native"
status: "draft"
permissions:
  required: ["TECH_CARD_VIEW"]
---

# Technology Card Screen

Displays agronomic technology cards and their stages. Based on SQL schema `grower.technology_card` and `grower.technology_stage`.

## UI Structure

### Header
- **Title**: "Технологическая карта"
- **Subtitle**: Card Name (e.g., "Tomato Summer 2025")

### Card Details
- **Info Section**:
  - Climate Zone
  - Season
  - Difficulty Level
  - Duration (Days)

### Stages List
- **List Item**:
  - **Stage Order**: Number (1, 2, 3...)
  - **Name**: Stage Name
  - **Duration**: Days
  - **Conditions**:
    - Temp (Min/Max)
    - Humidity (Min/Max)
    - Lighting (Hours)
    - Irrigation (ml)

## Data Model
- **Card Table**: `grower.technology_card`
- **Stage Table**: `grower.technology_stage`

## Flow
1. User selects a Tech Card from a list (implied).
2. User views details and stages.

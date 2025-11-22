---
screenId: main-menu
title: "Main Menu"
version: 1
uiTarget: "react-native"
status: "draft"
permissions:
  required: []
---

# Main Menu Screen

The central dashboard for the application, allowing users to navigate to different functional areas.

## UI Structure

### Header
- **Title**: "Выберите раздел для работы" (Choose a section to work with)

### Navigation Grid
A grid of buttons representing different modules:

1.  **Создать задачи** (Create Tasks)
    -   Icon: Plus/Task icon
    -   Action: Navigates to `task-creation` screen.

2.  **Защита растений** (Plant Protection)
    -   Icon: Shield/Plant icon
    -   Action: Navigates to Plant Protection module (TBD).

3.  **Фенолог** (Phenologist)
    -   Icon: Leaf/Observation icon
    -   Action: Navigates to Phenology module (TBD).

4.  **Овощевод** (Vegetable Grower)
    -   Icon: Vegetable icon
    -   Action: Navigates to Grower module (TBD).

5.  **Бригадир** (Foreman)
    -   Icon: User/Helmet icon
    -   Action: Navigates to Foreman module (TBD).

6.  **Контроль качества** (Quality Control)
    -   Icon: Checkmark/Clipboard icon
    -   Action: Navigates to `quality-control` screen.

## Visual Style
- **Layout**: Grid layout (2 columns likely).
- **Cards**: Each menu item is a card with an icon and label.
- **Theme**: Consistent with the Green Theme.

## Flow
1. User logs in.
2. User sees the Main Menu.
3. User taps a module card to navigate.

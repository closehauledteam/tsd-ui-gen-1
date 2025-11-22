---
screenId: auth-login
title: "Authentication"
version: 1
uiTarget: "react-native"
status: "draft"
permissions:
  required: []
---

# Authentication Screen

The login screen for the mobile application. Users authenticate via phone number.

## UI Structure

### Header
- **Title**: "Вход в систему" (Login)

### Login Form
- **Phone Input**:
  - Label: "Номер телефона"
  - Placeholder: "+7 (___) ___-__-__"
  - Type: Phone Pad
  - Validation: Must be a valid phone number format.

- **Action Button**:
  - Label: "Получить код" (Get Code)
  - State: Disabled until phone number is valid.
  - Action: Sends SMS code and navigates to `auth-verify` (implied).

## Flow
1. User enters phone number.
2. System validates format.
3. User clicks "Get Code".
4. System sends SMS.
5. User is redirected to Verification screen.

## Error Handling
- **Invalid Number**: Show error message "Неверный формат номера".
- **Network Error**: Show "Ошибка соединения".

---
screenId: auth-login
title: "Вход в систему"
version: 1
uiTarget: react-native
featureDir: src/features/auth-login
uiFile: FormUI.tsx
flowFile: authLoginFlow.ts
screenFile: AuthLoginScreen.tsx
module: common
moduleTitle: "Общие"
services:
  - AuthService.requestVerificationCode
transitions:
  - target: auth-confirm
    label: "Получить код"
---
## UI Structure
- Заголовок "Система управления теплицей".
- Подзаголовок "Вход в систему".
- Инструкция "Введите номер телефона для получения кода подтверждения".
- Поле ввода номера телефона с маской 8 (XXX) XXX-XX-XX.
- Подсказка с форматом.
- Кнопка "Получить код".
- Текст о работе в оффлайн‑режиме.

## Behavior / Flow
- Валидация телефона: кнопка становится активной при корректном формате.
- Нажатие "Получить код" вызывает `AuthService.requestVerificationCode`.
- При успешной отправке переходит на экран `auth-confirm`.

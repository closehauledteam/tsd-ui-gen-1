---
screenId: auth-confirm
title: "Подтверждение"
version: 1
uiTarget: react-native
featureDir: src/features/auth-confirm
uiFile: FormUI.tsx
flowFile: authConfirmFlow.ts
screenFile: AuthConfirmScreen.tsx
module: common
moduleTitle: "Общие"
services:
  - AuthService.verifyCode
  - AuthService.requestVerificationCode
transitions:
  - target: main-menu
    label: "Войти"
  - target: auth-login
    label: "Изменить номер"
---
## UI Structure
- Заголовок "Подтверждение".
- Сообщение о получении push‑уведомления и отображение номера.
- Поле ввода 4‑значного кода.
- Подсказка "Введите 4‑значный код".
- Кнопки "Войти", "Отправить код повторно" и "Изменить номер телефона".

## Behavior / Flow
- Проверка кода: только 4 цифры.
- Нажатие "Войти" вызывает `AuthService.verifyCode`; при успехе переход на `main-menu`.
- Нажатие "Отправить код повторно" снова вызывает `AuthService.requestVerificationCode`.
- Нажатие "Изменить номер телефона" возвращает на `auth-login`.

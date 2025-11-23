export const screenRegistry = {
  "auth-confirm": {
    "screenId": "auth-confirm",
    "title": "Подтверждение",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/auth-confirm",
    "uiFile": "FormUI.tsx",
    "flowFile": "authConfirmFlow.ts",
    "screenFile": "AuthConfirmScreen.tsx",
    "module": "common",
    "moduleTitle": "Общие",
    "services": [
      "AuthService.verifyCode",
      "AuthService.requestVerificationCode"
    ],
    "transitions": [
      {
        "target": "main-menu",
        "label": "Войти"
      },
      {
        "target": "auth-login",
        "label": "Изменить номер"
      }
    ],
    "specFile": "specs/screens/auth-confirm.md"
  },
  "auth-login": {
    "screenId": "auth-login",
    "title": "Вход в систему",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/auth-login",
    "uiFile": "FormUI.tsx",
    "flowFile": "authLoginFlow.ts",
    "screenFile": "AuthLoginScreen.tsx",
    "module": "common",
    "moduleTitle": "Общие",
    "services": [
      "AuthService.requestVerificationCode"
    ],
    "transitions": [
      {
        "target": "auth-confirm",
        "label": "Получить код"
      }
    ],
    "specFile": "specs/screens/auth-login.md"
  },
  "entry-selection": {
    "screenId": "entry-selection",
    "title": "Выбор режима работы",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/entry-selection",
    "uiFile": "FormUI.tsx",
    "flowFile": "entrySelectionFlow.ts",
    "screenFile": "EntrySelectionScreen.tsx",
    "module": "common",
    "moduleTitle": "Общие",
    "services": [
      ""
    ],
    "transitions": [
      {
        "target": "auth-login",
        "label": "Мобильное приложение"
      }
    ],
    "specFile": "specs/screens/entry-selection.md"
  },
  "main-menu": {
    "screenId": "main-menu",
    "title": "Выбор раздела",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/main-menu",
    "uiFile": "FormUI.tsx",
    "flowFile": "mainMenuFlow.ts",
    "screenFile": "MainMenuScreen.tsx",
    "module": "common",
    "moduleTitle": "Общие",
    "services": [
      ""
    ],
    "transitions": [
      {
        "target": "veg-registration",
        "label": "Овощевод"
      },
      {
        "target": "receive-item",
        "label": "Товаровед"
      },
      {
        "target": "protection-crop-list",
        "label": "Защита растений"
      },
      {
        "target": "task-creation",
        "label": "Создать задачи"
      }
    ],
    "specFile": "specs/screens/main-menu.md"
  },
  "protection-crop-details": {
    "screenId": "protection-crop-details",
    "title": "Plant Protection Details",
    "version": 1,
    "uiTarget": "react-native",
    "status": "draft",
    "permissions": [],
    "transitions": [
      {
        "target": "protection-crop-form",
        "label": "Обработка"
      }
    ],
    "specFile": "specs/screens/protection-crop-details.md"
  },
  "protection-crop-form": {
    "screenId": "protection-crop-form",
    "title": "Plant Protection Form",
    "version": 2,
    "uiTarget": "react-native",
    "status": "draft",
    "permissions": [],
    "transitions": [
      {
        "target": "protection-crop-list",
        "label": "Завершить"
      }
    ],
    "specFile": "specs/screens/protection-crop-form.md"
  },
  "protection-crop-list": {
    "screenId": "protection-crop-list",
    "title": "Plant Protection List",
    "version": 1,
    "uiTarget": "react-native",
    "status": "draft",
    "permissions": [],
    "transitions": [
      {
        "target": "protection-crop-details",
        "label": "Выбрать культуру"
      }
    ],
    "specFile": "specs/screens/protection-crop-list.md"
  },
  "quality-control": {
    "screenId": "quality-control",
    "title": "Quality Control",
    "version": 1,
    "uiTarget": "react-native",
    "status": "draft",
    "permissions": [],
    "specFile": "specs/screens/quality-control.md"
  },
  "task-creation": {
    "screenId": "task-creation",
    "title": "Task Creation",
    "version": 1,
    "uiTarget": "react-native",
    "status": "draft",
    "permissions": [],
    "specFile": "specs/screens/task-creation.md"
  },
  "task-finish": {
    "screenId": "task-finish",
    "title": "Завершение задачи",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/task-finish",
    "uiFile": "FormUI.tsx",
    "flowFile": "taskFinishFlow.ts",
    "screenFile": "TaskFinishScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      "TaskService.completeTask"
    ],
    "transitions": [
      {
        "target": "veg-dashboard",
        "label": "Завершить"
      }
    ],
    "specFile": "specs/screens/task-finish.md"
  },
  "task-instruction": {
    "screenId": "task-instruction",
    "title": "Инструкция по выполнению задачи",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/task-instruction",
    "uiFile": "FormUI.tsx",
    "flowFile": "taskInstructionFlow.ts",
    "screenFile": "TaskInstructionScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      ""
    ],
    "specFile": "specs/screens/task-instruction.md"
  },
  "task-paused": {
    "screenId": "task-paused",
    "title": "Пауза задачи",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/task-paused",
    "uiFile": "FormUI.tsx",
    "flowFile": "taskPausedFlow.ts",
    "screenFile": "TaskPausedScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      "TaskService.resumeTask",
      "TaskService.stopTask"
    ],
    "transitions": [
      {
        "target": "task-running",
        "label": "Продолжить"
      },
      {
        "target": "task-finish",
        "label": "Стоп"
      }
    ],
    "specFile": "specs/screens/task-paused.md"
  },
  "task-running": {
    "screenId": "task-running",
    "title": "Выполнение задачи",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/task-running",
    "uiFile": "FormUI.tsx",
    "flowFile": "taskRunningFlow.ts",
    "screenFile": "TaskRunningScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      "TaskService.pauseTask",
      "TaskService.stopTask"
    ],
    "transitions": [
      {
        "target": "task-paused",
        "label": "Пауза"
      },
      {
        "target": "task-finish",
        "label": "Стоп"
      }
    ],
    "specFile": "specs/screens/task-running.md"
  },
  "task-start": {
    "screenId": "task-start",
    "title": "Начало задачи",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/task-start",
    "uiFile": "FormUI.tsx",
    "flowFile": "taskStartFlow.ts",
    "screenFile": "TaskStartScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      "TaskService.startTask"
    ],
    "transitions": [
      {
        "target": "task-running",
        "label": "Старт"
      },
      {
        "target": "task-instruction",
        "label": "Инструкция"
      }
    ],
    "specFile": "specs/screens/task-start.md"
  },
  "technology-card": {
    "screenId": "technology-card",
    "title": "Technology Card",
    "version": 2,
    "uiTarget": "react-native",
    "status": "draft",
    "permissions": [],
    "specFile": "specs/screens/technology-card.md"
  },
  "veg-dashboard": {
    "screenId": "veg-dashboard",
    "title": "Управление выращиванием овощей",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/veg-dashboard",
    "uiFile": "FormUI.tsx",
    "flowFile": "vegDashboardFlow.ts",
    "screenFile": "VegDashboardScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      "TaskService.listTasks"
    ],
    "transitions": [
      {
        "target": "task-start",
        "label": "Начать задачу"
      },
      {
        "target": "task-instruction",
        "label": "Инструкция"
      }
    ],
    "specFile": "specs/screens/veg-dashboard.md"
  },
  "veg-qr": {
    "screenId": "veg-qr",
    "title": "QR‑код для регистрации",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/veg-qr",
    "uiFile": "FormUI.tsx",
    "flowFile": "vegQrFlow.ts",
    "screenFile": "VegQrScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      "BlocksService.getRegistrationQRCode"
    ],
    "transitions": [
      {
        "target": "veg-dashboard",
        "label": "Сканирование"
      }
    ],
    "specFile": "specs/screens/veg-qr.md"
  },
  "veg-registration": {
    "screenId": "veg-registration",
    "title": "Регистрация в блоке",
    "version": 1,
    "uiTarget": "react-native",
    "featureDir": "src/features/veg-registration",
    "uiFile": "FormUI.tsx",
    "flowFile": "vegRegistrationFlow.ts",
    "screenFile": "VegRegistrationScreen.tsx",
    "module": "vegetable-grower",
    "moduleTitle": "Овощевод",
    "services": [
      "BlocksService.getAvailableBlocks"
    ],
    "transitions": [
      {
        "target": "veg-qr",
        "label": "Выбрать блок"
      }
    ],
    "specFile": "specs/screens/veg-registration.md"
  }
};
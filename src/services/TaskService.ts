export interface Task {
    id: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    location: string;
    normTime: string;
    status: 'pending' | 'running' | 'paused' | 'completed';
}

export interface TaskCompletionData {
    standard: number;
    nonStandard: number;
    ripening: number;
    defect: number;
}

export const TaskService = {
    listTasks: async (userId: string): Promise<Task[]> => {
        console.log(`[Mock] Listing tasks for user ${userId}`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        return [
            {
                id: 't1',
                title: 'Сбор томатов',
                priority: 'high',
                description: 'Сбор красных томатов в ряду 12',
                location: 'Блок 1, Ряд 12',
                normTime: '45 мин',
                status: 'pending',
            },
            {
                id: 't2',
                title: 'Уход за растениями',
                priority: 'medium',
                description: 'Подвязка растений',
                location: 'Блок 1, Ряд 15',
                normTime: '30 мин',
                status: 'pending',
            },
        ];
    },

    startTask: async (taskId: string): Promise<boolean> => {
        console.log(`[Mock] Starting task ${taskId}`);
        return true;
    },

    pauseTask: async (taskId: string): Promise<boolean> => {
        console.log(`[Mock] Pausing task ${taskId}`);
        return true;
    },

    stopTask: async (taskId: string): Promise<boolean> => {
        console.log(`[Mock] Stopping task ${taskId}`);
        return true;
    },

    resumeTask: async (taskId: string): Promise<boolean> => {
        console.log(`[Mock] Resuming task ${taskId}`);
        return true;
    },

    completeTask: async (taskId: string, data: TaskCompletionData): Promise<boolean> => {
        console.log(`[Mock] Completing task ${taskId} with data:`, data);
        return true;
    },
};

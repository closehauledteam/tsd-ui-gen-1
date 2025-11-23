export const AuthService = {
    requestVerificationCode: async (phoneNumber: string): Promise<boolean> => {
        console.log(`[Mock] Requesting verification code for ${phoneNumber}`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        return true;
    },

    verifyCode: async (phoneNumber: string, code: string): Promise<boolean> => {
        console.log(`[Mock] Verifying code ${code} for ${phoneNumber}`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        if (code === '1234') {
            return true;
        }
        return false;
    },
};

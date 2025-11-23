export const theme = {
    colors: {
        primary: '#7CB342', // Green
        background: '#F5F5F5', // Light Gray
        card: '#FFFFFF',
        textPrimary: '#333333',
        textSecondary: '#666666',
        statusRed: '#E57373',
        statusGreen: '#81C784',
        border: '#E0E0E0',
        inputBackground: '#F9F9F9',
        white: '#FFFFFF',
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 12,
        l: 16,
        xl: 20,
        xxl: 24,
    },
    borderRadius: {
        s: 8,
        m: 12,
        l: 20,
        pill: 25,
    },
    typography: {
        headerTitle: {
            fontSize: 22,
            fontWeight: 'bold' as const,
            color: '#FFFFFF',
        },
        headerSubtitle: {
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.8)',
        },
        label: {
            fontSize: 14,
            color: '#333333',
            fontWeight: '600' as const,
            marginBottom: 4,
        },
        input: {
            fontSize: 16,
            color: '#333333',
        },
        buttonText: {
            fontSize: 16,
            fontWeight: 'bold' as const,
            color: '#FFFFFF',
            textAlign: 'center' as const,
        },
    },
    shadows: {
        card: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
    },
};

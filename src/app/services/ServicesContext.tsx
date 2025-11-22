import React, { createContext, useContext } from 'react';
import { AppServices } from './types';

const ServicesContext = createContext<AppServices | null>(null);

export const ServicesProvider: React.FC<{ services: AppServices; children: React.ReactNode }> = ({
    services,
    children,
}) => {
    return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
};

export const useServices = (): AppServices => {
    const services = useContext(ServicesContext);
    if (!services) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return services;
};

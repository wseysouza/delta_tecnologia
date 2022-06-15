import React from 'react';
import { DeltaProvider } from './delta';

const AppProvider: React.FC = ({ children }) => (
    <DeltaProvider>
        {children}
    </DeltaProvider>
);

export default AppProvider;

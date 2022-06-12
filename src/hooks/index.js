import React from 'react';
import { DeltaProvider } from './delta';

const AppProvider = ({ children }) => (
  <DeltaProvider>
    {children}
  </DeltaProvider>
);

export default AppProvider;

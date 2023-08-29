import { useContext } from 'react';

import { ThemeContext, ThemeContextValue } from '../providers/ThemeContext';

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);

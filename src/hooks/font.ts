import { useContext } from 'react';
import { FontContext } from '../contexts/FontContext';

export function useFont() {
  const value = useContext(FontContext);

  return value;
}

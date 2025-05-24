import { useWindowDimensions } from 'react-native';
import BREAKPOINTS from '../styles/breakpoints';

type Breakpoint = keyof typeof BREAKPOINTS;

export default function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();

  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  if (width >= BREAKPOINTS.xs) return 'xs';
  return 'xxs';
}

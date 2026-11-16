// The one module that owns the SDK's options. Nothing runs
// until the first call; every later call gets the same promise.
// In vite.config.ts, add envPrefix: ['VITE_', 'KERNSTRA_'].
import { Kernstra } from '@kernstra/pdf-web-sdk';

export const initKernstra = () =>
  Kernstra.init({ license: import.meta.env.KERNSTRA_LICENSE });

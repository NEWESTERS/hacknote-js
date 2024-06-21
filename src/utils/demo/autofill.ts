import { getRandomNumber } from '@utils/number';

import { sleep } from './sleep';

export interface AutofillOptions {
  text: string;
  onType: (text: string) => void;
  signal?: AbortSignal;
}

export async function autofill(options: AutofillOptions): Promise<void> {
  let currentText = '';
  for (const char of options.text) {
    await sleep(getRandomNumber(50, 100));

    if (options.signal?.aborted) {
      throw new Error('Autofill aborted');
    }

    currentText += char;
    options.onType(currentText);
  }
}

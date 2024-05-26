import { sleep } from '@utils/demo';
import { getRandomNumber } from '@utils/number';

export async function fetchData(text: string): Promise<string> {
  await sleep(getRandomNumber(50, 1000));

  return text;
}

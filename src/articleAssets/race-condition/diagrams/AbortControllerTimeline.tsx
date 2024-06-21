import type { FC } from 'react';

import {
  Icon,
  MarbleDiagram,
  MarbleConfigProvider,
  MarblePlayer
} from '@components/react';
import successSvg from '@components/icons/success.svg';
import errorSvg from '@components/icons/delete.svg';
import userSvg from '@components/icons/user.svg';

const diagram = MarbleDiagram.from({
  series: [
    {
      title: 'Действия пользователя',
      startTime: 0,
      endTime: 1000,
      points: [
        {
          title: 'Пользователь ввёл букву',
          content: <Icon url={userSvg.src} color='var(--color_accent-blue)' />,
          time: 100
        },
        {
          title: 'Пользователь ввёл букву',
          content: <Icon url={userSvg.src} color='var(--color_accent-blue)' />,
          time: 300
        }
      ]
    },
    {
      title: 'Первый запрос',
      startTime: 100,
      endTime: 300,
      points: [
        {
          title: 'Запрос отменён',
          content: <Icon url={errorSvg.src} color='var(--color_accent-red)' />,
          time: 300
        }
      ]
    },
    {
      title: 'Второй запрос',
      startTime: 300,
      endTime: 500,
      points: [
        {
          title: 'Результат запроса применён',
          content: (
            <Icon url={successSvg.src} color='var(--color_accent-green)' />
          ),
          time: 500
        }
      ]
    }
  ]
});

export const AbortControllerTimeline: FC = () => {
  return (
    <MarbleConfigProvider diagram={diagram} startTime={0} endTime={1000}>
      <MarblePlayer />
    </MarbleConfigProvider>
  );
};

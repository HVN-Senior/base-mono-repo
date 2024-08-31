import { createQuery } from 'react-query-kit';

import { getListCourse, getUserProfile } from './requests';
import type { ICourse, IUser } from './types';

export const useUserQuery = createQuery<IUser>({
  queryKey: ['/profile'],
  fetcher: getUserProfile,
});

export const useListCourse = createQuery<ICourse[]>({
  queryKey: ['/course'],
  fetcher: getListCourse,
});

import React from 'react';
import { FCC } from '@ui/types';

export const CustomShow: FCC<{ when?: boolean }> = (props) => {
  return <>{props.when ? <>{props.children}</> : null}</>;
};

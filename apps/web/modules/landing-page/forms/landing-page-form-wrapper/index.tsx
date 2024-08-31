import React, { useId } from 'react';
import { useLandingPageStore } from '@/modules/landing-page/stores';
import { landingFormSchema, type LandingFormSchema } from '@/modules/landing-page/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper } from '@ui/components';
import { type FCC } from '@ui/types';
import { useForm, type SubmitHandler } from 'react-hook-form';

const LandingPageFormWrapper: FCC = ({ children }) => {
  /** zustand states and actions */
  const flag = useLandingPageStore.use.flag();
  const onSetFlag = useLandingPageStore.use.setFlag();

  /** Forms and local state */
  const formId = useId();
  const form = useForm<LandingFormSchema>({
    resolver: zodResolver(landingFormSchema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<LandingFormSchema> = (data) => {
    console.log('🚀 ~ data:', data);
    onSetFlag(!flag);
  };

  return (
    <FormWrapper form={form} formId={formId} onSubmit={onSubmit}>
      {children}
    </FormWrapper>
  );
};

export default LandingPageFormWrapper;

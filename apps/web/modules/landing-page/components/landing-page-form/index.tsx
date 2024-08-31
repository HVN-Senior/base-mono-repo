import React from 'react';
import { type LandingFormSchema } from '@/modules/landing-page/types';
import { LANGUAGE_SELECT_OPTIONS } from '@/modules/landing-page/utils';
import {
  AvatarFormField,
  Button,
  HStack,
  InputFormField,
  MultipleAutoComplete,
  SelectFormField,
  SelectSearchFormField,
  TextAreaFormField,
  VStack,
} from '@ui/components';
import { useFormContext } from 'react-hook-form';

const LandingPageForm = () => {
  const { control } = useFormContext<LandingFormSchema>();
  return (
    <>
      <AvatarFormField control={control} name="avatar" fallbackUrl="" className="mb-5" />
      <VStack>
        <InputFormField control={control} name="email" fullWidth label="Email" />
        <InputFormField control={control} name="password" fullWidth label="Password" type="password" />
        <TextAreaFormField control={control} name="description" fullWidth label="Description" />
        <SelectFormField data={LANGUAGE_SELECT_OPTIONS} control={control} name="language" fullWidth label="Language" />

        <SelectSearchFormField
          data={LANGUAGE_SELECT_OPTIONS}
          control={control}
          name="language"
          fullWidth
          label="Language"
        />

        <HStack>
          <Button type="submit">Submit</Button>
          <Button type="button">Cancel</Button>
        </HStack>
      </VStack>
    </>
  );
};

export default LandingPageForm;

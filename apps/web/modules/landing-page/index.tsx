'use client';

import React from 'react';
import { LandingPageForm } from '@/modules/landing-page/components';
import { LandingPageFormWrapper } from '@/modules/landing-page/forms';

const LandingPage = () => {
  return (
    <div className="container py-12">
      <LandingPageFormWrapper>
        <LandingPageForm />
      </LandingPageFormWrapper>
    </div>
  );
};

export default LandingPage;

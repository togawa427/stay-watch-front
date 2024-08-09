'use client';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import UserInformation from '@/features/userInformation/UserInformation';

const UserInformationIndex = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <UserInformation />
      </Suspense>
    </ErrorBoundary>
  );
};

export default UserInformationIndex;

import LoadingScreen from '@/components/loading-screen';
import React from 'react';

const loading = () => {
  return (
    <div>
      <LoadingScreen fixed={true} />
    </div>
  );
};

export default loading;
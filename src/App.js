import React, { lazy, Suspense, useState } from 'react';

import { getQueryValue } from './utils';
import Loading from './components/Loading';
import ShareQR from './components/ShareQR';
import LoadingWords from './components/LoadingWords';
import CardContainer from './components/CardContainer';

const Header = lazy(() => import('./components/Header'));

const InfoModal = lazy(() => import('./components/InfoModal'));
const wordsIdx = getQueryValue('idx');
const App = () => {
  const [start, setStart] = useState(wordsIdx !== '');
  const [loading, setLoading] = useState(wordsIdx == '');
  const handleStart = () => {
    setStart(true);
    setLoading(true);
  };
  const handleDone = () => {
    setLoading(false);
  };
  const handleUpdate = () => {
    setLoading(true);
  };
  return (
    <Suspense fallback={<Loading />}>
      <InfoModal />
      <ShareQR visible={start && !loading} />

      {!start && <Header handleStart={handleStart} />}
      <LoadingWords visible={start && loading} handleDone={handleDone} />

      <CardContainer visible={start && !loading} handleUpdate={handleUpdate} />
    </Suspense>
  );
};
export default App;

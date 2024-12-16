import { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getQueryValue } from './utils';
import Loading from './components/Loading';
import Words from './assets/words';

// const Card = lazy(() => import('./components/Card'));
const Card = lazy(() => import('./components/Card'));
const LoadingWords = lazy(() => import('./components/LoadingWords'));
const StartButton = lazy(() => import('./components/StartButton'));
const RefreshButton = lazy(() => import('./components/RefreshButton'));
const SaveButton = lazy(() => import('./components/SaveButton'));
const ShareQR = lazy(() => import('./components/ShareQR'));
const Header = lazy(() => import('./components/Header'));

const InfoModal = lazy(() => import('./components/InfoModal'));
const MetooButton = styled(StartButton)`
  z-index: 998;
  position: fixed;
  bottom: 0.6rem;
  left: 50%;
  width: 14rem;
  margin-left: -7rem;
  animation-delay: ${({ wordCount }) => `${wordCount * 0.3}s`};
`;
const wordsIdx = getQueryValue('idx');
const hasWords = wordsIdx !== '';
const App = () => {
  let count = wordsIdx !== '' ? Words[wordsIdx].length : 0;

  const [start, setStart] = useState(hasWords);
  const [loading, setLoading] = useState(!hasWords);
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
      {!hasWords && <InfoModal />}
      {start && !loading && !hasWords && <ShareQR />}
      <RefreshButton visible={start && !loading && !hasWords} handleUpdate={handleUpdate} />
      <SaveButton visible={start && !loading && !hasWords} />
      {!start && <Header handleStart={handleStart} />}
      <LoadingWords visible={start && loading} handleDone={handleDone} />
      <Card wordArr={Words} wordsIdx={wordsIdx} visible={start && !loading} />
      {start && !loading && hasWords && (
        <MetooButton
          wordCount={count}
          onClick={() => {
            location.href = location.href.split('?')[0];
          }}
        >
          我也要生成
        </MetooButton>
      )}
    </Suspense>
  );
};
export default App;

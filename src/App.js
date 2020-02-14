import React, { lazy, Suspense, useState } from 'react';
import Loading from './components/Loading';
const Header = lazy(() => import('./components/Header'));
const LoadingWords = lazy(() => import('./components/LoadingWords'));
const Card = lazy(() => import('./components/Card'));
import styled from 'styled-components';
const StyledBody = styled.section`
  height: 60vh;
`;
const App = () => {
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
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
      {!start && <Header handleStart={handleStart} />}
      {start && loading && <LoadingWords handleDone={handleDone} />}
      <StyledBody>{start && !loading && <Card handleUpdate={handleUpdate} />}</StyledBody>
    </Suspense>
  );
};
export default App;

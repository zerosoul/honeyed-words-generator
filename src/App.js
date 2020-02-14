import React, { lazy, Suspense } from 'react';
import Loading from './components/Loading';
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
import styled from 'styled-components';
const StyledBody = styled.section`
  height: 60vh;
`;
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <StyledBody>body</StyledBody>
      <Footer />
    </Suspense>
  );
};
export default App;

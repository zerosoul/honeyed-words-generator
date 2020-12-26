import { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoveWords } from './opts.gql';
import { useQuery } from '@apollo/client';

import { getQueryValue } from './utils';
import Loading from './components/Loading';
import AddWords from './components/AddWords';
// import Words from './assets/words';

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
  const { data, error } = useQuery(LoveWords);
  const [words, setWords] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  const [start, setStart] = useState(hasWords);
  const [loading, setLoading] = useState(!hasWords);
  console.log({ data });
  useEffect(() => {
    if (error) {
      const { graphQLErrors } = error;
      console.log({ graphQLErrors });

      const {
        extensions: { code }
      } = graphQLErrors[0];
      if (code == 'access-denied') {
        alert('缺少token，无权访问');
      } else {
        alert('接口报错了，请联系作者，VX:yanggc_2018');
      }
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      let wordArr = data.love_words.map((w) => w.content);
      setWords(wordArr);
      console.log({ wordArr });

      let count = wordsIdx !== '' ? wordArr[wordsIdx].length : 0;
      setWordCount(count);
    }
  }, [data]);
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
      {!loading && !hasWords && <AddWords />}
      <RefreshButton visible={start && !loading && !hasWords} handleUpdate={handleUpdate} />
      <SaveButton visible={start && !loading && !hasWords} />
      {!start && <Header handleStart={handleStart} />}
      <LoadingWords visible={start && loading} handleDone={handleDone} />
      <Card wordArr={words} wordsIdx={wordsIdx} visible={start && !loading} />
      {start && !loading && hasWords && (
        <MetooButton
          wordCount={wordCount}
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

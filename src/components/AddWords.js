/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AddWords } from '../opts.gql';
import { useMutation } from '@apollo/client';
import StyledButton from './StyledButton';
import ImageAdd from '../assets/img/add.words.svg';
import ImageClose from '../assets/img/close.svg';
import { AniSlideInUp } from './animates';
const AddButton = styled(StyledButton)`
  background-image: url(${ImageAdd});
  &.close {
    background-image: url(${ImageClose});
  }
`;
const StyledBtnWrapper = styled.div`
  z-index: 998;
  position: fixed;
  left: 1rem;
  top: 1rem;
  margin-right: 0.5rem;
  .tip {
    position: absolute;
    right: -4.8rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.6rem;
    background: rgba(2, 2, 2, 0.6);
    padding: 0.3rem;
    &.hidden {
      visibility: hidden;
    }
  }
`;
const StyledModal = styled.section`
  z-index: 998;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 2, 2, 0.8);
  padding: 1rem;
  &.visible {
    animation: ${AniSlideInUp} 1s;
  }
  .content {
    margin-top: 1rem;
    line-height: 1.5;
    padding: 0 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .input,
    .submit {
      color: #222;
      font-size: 1.2rem;
    }
    .input {
      width: 20rem;
      margin-bottom: 1rem;
      padding: 0.4rem 0.6rem;
    }
    .submit {
      background: #fff;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
      &[disabled] {
        color: #666;
      }
    }
  }
`;
const Modal = ({ visible = false }) => {
  const [content, setContent] = useState('');
  const [remark, setRemark] = useState('');
  const [addWords, { data, loading, error }] = useMutation(AddWords);
  useEffect(() => {
    console.log({ error });
    if (error) {
      const { graphQLErrors } = error;
      console.log({ graphQLErrors });

      const {
        extensions: { code }
      } = graphQLErrors[0];
      if (code == 'constraint-violation') {
        alert('该情话已经有啦~');
      }
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      const {
        insert_love_words: { returning }
      } = data;
      if (returning && returning.length > 0) {
        alert('提交成功，我会尽快审核并发布，您可以继续提交');
        setContent('');
      }
      console.log({ returning });
    }
  }, [data]);
  const handleSubmit = () => {
    console.log({ content });
    let formatedContent = content
      .split('\n')
      .filter((c) => c !== '')
      .join('|');
    addWords({ variables: { content: formatedContent, remark } });
  };
  const handleChange = (evt) => {
    setContent(evt.target.value);
  };
  const handleRemarkChange = (evt) => {
    setRemark(evt.target.value);
  };
  return (
    <StyledModal className={visible ? 'visible' : 'hidden'}>
      <div className="content">
        <textarea
          className="input"
          value={content}
          onChange={handleChange}
          name="content"
          id="content"
          placeholder={`情话(注意断句与换行），举例:\n小猪佩奇\n你配我`}
          rows="8"
        ></textarea>
        <textarea
          className="input"
          value={remark}
          onChange={handleRemarkChange}
          name="remark"
          id="remark"
          placeholder={`备注，可填：\n您的大名/情话来源/想给作者的留言/联系方式/等等`}
          rows="4"
        ></textarea>
        <button disabled={loading || !content} className="submit" onClick={handleSubmit}>
          提交
        </button>
      </div>
    </StyledModal>
  );
};
export default function AddLoveWords() {
  const [expand, setExpand] = useState(false);

  const handleClick = () => {
    setExpand((prev) => !prev);
  };

  return (
    <>
      <Modal visible={expand} />
      <StyledBtnWrapper>
        <AddButton className={`${expand ? 'close' : ''} visible`} onClick={handleClick}></AddButton>
        <div className={`tip ${expand ? 'hidden' : ''}`}>👈贡献情话</div>
      </StyledBtnWrapper>
    </>
  );
}

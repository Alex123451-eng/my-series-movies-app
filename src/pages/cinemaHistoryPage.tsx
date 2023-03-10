import styled from "styled-components";

const CinemaHistoryPage = () => {
  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Wrapper href="/">
      <MyDiv onClick={handleClick}>Ребенок 1</MyDiv>
      <MyDiv onClick={handleClick}>Ребенок 2</MyDiv>
      <MyDiv onClick={handleClick}>Ребенок 3</MyDiv>
    </Wrapper>
  );
};

export default CinemaHistoryPage;

const Wrapper = styled.a`
  position: absolute;
  background: white;
  width: 500px;
  height: 500px;
  top: 200px;
  left: 200px;
`;

const MyDiv = styled.div`
  width: 200px;
  height: 200px;
  top: 100px;
  left: 100px;
  background: red;
`;

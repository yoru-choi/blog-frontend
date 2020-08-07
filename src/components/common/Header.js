import React from 'react'
import styled from 'styled-components'
import Responsive from './Responsive'
import Button from './Button'

const HeaderBlock = styled.div`
    position:fixed;
    width: 100%;
    background: white;
    box-shadow:0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/*
  responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
*/
const Wrapper = styled(Responsive)`
  height:4rem;
  display:flex;
  align-items: center;
  justify-content:space-between;
  .logo{
    font-size:1.125rem;
    font-weight:800;
    letter-spacing:2px;
  }
  .right{
    display:flex;
    align-items:center;
  }
`;
/* 헤더가 fixed 로 되어있기 때문에 페이지의 콘탠츠가 4rem아래에 나타나도록 해주는 컴포넌트  */
const Spacer = styled.div`
  height:4rem;
`;

const Header = ()=>{
  return(
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">REACTRS</div>
          <div className="right">
            <Button>로그인</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  )
}

export default Header;

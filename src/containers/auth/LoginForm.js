import React, {useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { changeField , initializeForm } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'


const LoginForm =()=>{


  const dispatch = useDispatch();
  const {form} =useSelector( ({auth})=>({
    form:auth.login
  })  );  //나중에 로그인 폼일때 아이디 비번 같은 값을 받아오는 부분

// 인풋 변경이벤트 헨들러  로그인폼의 인풋 변경 헨들러
  const onChange = e=>{
    const {value , name} = e.target;
    dispatch(
      changeField({
        form:'login',
        key:name,
        value
      })
    );
  };

  const onSubmit =e=>{
    e.preventDefault();
    //구현 예정
  };

  //컴포넌트가 처음 렌더링될때 form 을 초기화함
  useEffect(()=>{
    dispatch(initializeForm('login'));
  },[dispatch]);

  return(
    <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} />
  );
};

export default LoginForm;

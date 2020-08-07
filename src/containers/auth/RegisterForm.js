import React, {useEffect , useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { changeField , initializeForm , register } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import {check } from '../../modules/user'
import {withRouter} from 'react-router-dom'

const RegisterForm =({history})=>{
  const [error , setError] = useState(null);  // 여기서 setState로 로그시 에러 여부 판별해서 ui로 보여주기위한 setState
  const dispatch = useDispatch();
  const {form , auth , authError , user } =useSelector( ({auth , user })=>({
    form: auth.register ,
    auth: auth.auth ,
    authError: auth.authError ,
    user: user.user
}));

//인풋 변경이벤트 헨들러
  const onChange = e=>{
    const {value , name} = e.target;
    dispatch(
      changeField({
        form:'register',
        key:name,
        value
      })
    );
  };

  const onSubmit =e=>{
    e.preventDefault();
    const {username , password, passwordConfirm}= form;
    if([username, password, passwordConfirm].includes('')){ // 배열에 해당 요소가 들어있나 판별하는 함수
      setError('빈 칸을 모두 입력하세요.');
    }
    if(password !== passwordConfirm){
      setError('비밀번호가 일치하지 않습니다.');  //비번이 일치하지않으면 비번과 비번 확인값을 초기화
      dispatch(changeField({form:'register', key:'password' , value:'' }));
      dispatch(changeField({form:'register', key:'passwordConfirm' , value:'' }));
      return;
    }
    dispatch(register({username , password}));
  };

  //컴포넌트가 처음 렌더링될때 form 을 초기화함
  useEffect(()=>{
    dispatch(initializeForm('register'));
    console.log('dispatch 불변이니까 걍 didmount 용으로쓰는건데 의존성이라 넣은듯');
  }, [dispatch]);

  useEffect(()=>{
    if(authError){
      if(authError.response.status === 409){ //내가 계정명 겹치면 409 에러 띄우라고 해놨으니까
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      setError('회원가입에 실패하셨습니다.');
      return;
    }
    if(auth){
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  },[auth, authError, dispatch]);

  useEffect(()=>{
    if(user){
      history.push('/'); // 홈 화면으로 이동
      localStorage.setItem('user', JSON.stringify(user));
    }
  },[history, user]);

  return(
    <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default withRouter(RegisterForm);

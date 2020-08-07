import React, {useEffect , useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { changeField , initializeForm, login } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import {check} from '../../modules/user'

const LoginForm =({history})=>{

  const [error , setError] = useState(null);

  const dispatch = useDispatch();
  const {form , auth , authError , user} =useSelector( ({auth, user})=>({
    form:auth.login ,
    auth:auth.auth,
    authError:auth.authError ,
    user:user.user ,
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
   const {username, password} = form;
   dispatch(login({username, password}) );
  };

  //컴포넌트가 처음 렌더링될때 form 을 초기화함
  useEffect(()=>{
    dispatch(initializeForm('login'));
  },[dispatch]);  // 의존성문제로 디스패치 추가한다고 하는데 시벌 그냥 이거 마운트될때만 초기화되는건데 의존성이라카네 ㅂㄷㅂㄷ

  useEffect(()=>{
      if(authError){
        console.log('오류 발생');
        console.log(authError);
        setError('로그인 실패');
        return;
      }
      if(auth){
        console.log('로그인 성공');
        dispatch(check());
      }
  },[auth, authError , dispatch]
);
  useEffect(()=>{
    if(user){
      history.push('/');
    }
  }, [history, user]);

  return(
    <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default withRouter(LoginForm);

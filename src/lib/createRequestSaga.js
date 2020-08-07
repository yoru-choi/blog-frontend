import {call, put} from 'redux-saga/effects'; //call 은 해당 비동기 호출하고 기다리는거 put은 dispatch 라고 생각하면됨.
import {startLoading , finishLoading } from '../modules/loading';
/*
call 을사용하면 promise 를 반환하는 함수를 호출하고 기다릴수있습니다.
call 의 첫번째 파라미터는 함수, 나머지 파라미터는 함수에 넣을 인수입니다.
put 은 특정 액션을 디스패치 합니다.
tasklatest 는 기존에 진행중이던 작업이 있다면 취소
처리하고 가장 마지막으로 실행된 작업만 수행합니다.
*/

export const createRequestActionTypes = type =>{
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
}


export default function createRequestSaga(type, request){
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function*(action){
    yield put(startLoading(type)); //로딩시작
    try{
      const response = yield call (request, action.payload);
      yield put({
        type:SUCCESS,
        payload:response.data,
      });
    } catch(e){
      yield put({
        type:FAILURE,
        payload:e ,
        error:true,
      });
    }
    yield put(finishLoading(type)); //로딩끝
  };
}

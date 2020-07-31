import axios from 'axios'

const client = axios.create();

/*
  글로벌 설정예시:
-
  //api 주소를 다른곳으로 사용함
  client.defaults.baseURL


*/
 
export default client;

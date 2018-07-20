import axios from 'axios';


export default function ajax(url,data={},type='GET') {
  if (type === 'GET'){
    let Str = ''
    Object.keys(data).forEach(key => {
      Str += key +'=' + data[key] + '&';
    })
    if (Str){
      Str = Str.substring(0,Str.length-1);
      Str = '?' + Str;
    }
    
    return axios.get(url + Str);
  }else {
   return axios.post(url,data);
  }
  
}

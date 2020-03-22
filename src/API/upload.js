import axios from 'axios';
import {API} from './constants';

export const uploadJson = async(file)=>{
    let data = new FormData();
    data.append('file',file)
    axios.post(API+'upload',data)
         .then(res => { return res.data;})
         .catch(err=> { console.log(err)})
}
import * as Axios from "../axios";

export const userResponse = async (params={}) => {
    try{
        return await Axios.get('/users',params);
    }catch(error){
        console.log(error);
    }
}
import * as Axios from "../../api/axios";
const query = '/users';

class User {
    async getUser(id,params={}) {
        try{
            return await Axios.get(`${query}/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    async getAllUser(params={}){
        try{
            return await Axios.get(`${query}`,params);
        }catch(error){
            console.log(error);
        }
    }

    async deleteUser(id){
        try{
            await Axios.delete(`${query}/${id}`);
        }catch(error){
            console.log(error);
        }
    }

    async updateUser(id,data){
        try{
            await Axios.update(`/users/${id}`,data);
        }catch(error){
            console.log(error);
        }
    }
};

export default User;

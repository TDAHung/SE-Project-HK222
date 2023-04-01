import * as Axios from "../../api/axios";


class User {
    async getUser(id,params={}) {
        try{
            return await Axios.get(`/users/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    async getAllUser(params={}){
        try{
            return await Axios.get('/users',params);
        }catch(error){
            console.log(error);
        }
    }

    async deleteUser(id){
        try{
            await Axios.delete(`/users/${id}`);
        }catch(error){
            console.log(error);
        }
    }
};

export default User;

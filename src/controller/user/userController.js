import * as Axios from "../../api/axios";
const query = '/users';

class User {
    async login(user) {
        try{
            return await Axios.add('/employee/login', user);
        }catch(error){
            console.log(error);
        }
    }

    async getAllUser(status, employee){
        try{
            if (typeof status !== 'undefined' && typeof employee !== 'undefined') {
                return await Axios.get(`/employee/getAll?status=${status}&employee=${employee}`);
            }
            return await Axios.get(`/employee/getAll`);

        }catch(error){
            console.log(error);
        }
    }

    async addUser(data){
        try{
            return await Axios.add('/employee/create',data);
        }catch(error){
            console.log(error);
        }
    }

    async getUser(id,params={}) {
        try{
            return await Axios.get(`${query}/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    

    

    async deleteUser(id){
        try{
            await Axios.delete(`${query}/${id}`);
        }catch(error){
            console.log(error);
        }
    }

    async updateUser(id,data){
        try{
            await Axios.update(`${query}/${id}`,data);
        }catch(error){
            console.log(error);
        }
    }
};

export default User;

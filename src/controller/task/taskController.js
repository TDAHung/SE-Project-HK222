import * as Axios from "../../api/axios";
const query = '/tasks';

class Task {
    async getAllTask(role){
        try{
            if (typeof role !== 'undefined') {
                return await Axios.get(`task/getAll?employee=${role}`);
            }
            return await Axios.get(`task/getAll`);
        }catch(error){
            console.log(error);
        }
    }

    async getTask(id,params={}) {
        try{
            return await Axios.get(`${query}/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    

    async deleteTask(id){
        try{
            await Axios.destroy(`${query}/${id}`);
        }catch(error){
            console.log(error);
        }
    }

    async addTask(data, employee){
        try{
            return await Axios.add(`/task/create/${employee}`,data);
        }catch(error){
            console.log(error);
        }
    }

    async updateTask(id,data){
        try{
            await Axios.update(`${query}/${id}`,data);
        }catch(error){
            console.log(error);
        }
    }
};

export default Task;

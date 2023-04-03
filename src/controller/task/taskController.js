import * as Axios from "../../api/axios";
const query = '/tasks';

class Task {
    async getTask(id,params={}) {
        try{
            return await Axios.get(`${query}/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    async getAllTask(params={}){
        try{
            return await Axios.get(`${query}`,params);
        }catch(error){
            console.log(error);
        }
    }

    async deleteTask(id){
        try{
            await Axios.delete(`${query}/${id}`);
        }catch(error){
            console.log(error);
        }
    }
};

export default Task;

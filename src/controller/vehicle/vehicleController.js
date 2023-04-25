import * as AxiosTask from "../../api/axiosTask";
const query = '/vehicle';

class Vehicle {
    async getVehicle(id,params={}) {
        try{
            return await AxiosTask.get(`${query}/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    async getAllVehicle(params={}){
        try{
            return await AxiosTask.get(`${query}`,params);
        }catch(error){
            console.log(error);
        }
    }

    async deleteVehicle(id){
        try{
            await AxiosTask.destroy(`${query}/${id}`);
        }catch(error){
            console.log(error);
        }
    }

    async addVehicle(data){
        try{
            await AxiosTask.add(`${query}`,data);
        }catch(error){
            console.log(error);
        }
    }

    async updateVehicle(id,data){
        try{
            await AxiosTask.update(`${query}/${id}`,data);
        }catch(error){
            console.log(error);
        }
    }
};

export default Vehicle;

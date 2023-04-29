import * as Axios from "../../api/axios";
const query = '/vehicle';

class Vehicle {
    async addVehicle(data){
        try{
            return await Axios.add('/vehicle/create',data);
        }catch(error){
            console.log(error);
        }
    }

    async getAllVehicle(status){
        try{
            if (typeof status !== 'undefined') {
                return await Axios.get(`/vehicle/getAll?status=${status}`);
            }
            return await Axios.get(`/vehicle/getAll`);
            
        }catch(error){
            console.log(error);
        }
    }

    // async getVehicle(id,params={}) {
    //     try{
    //         return await AxiosTask.get(`${query}/${id}`,params);
    //     }catch(error){
    //         console.log(error);
    //     }
    // };

    

    // async deleteVehicle(id){
    //     try{
    //         await AxiosTask.destroy(`${query}/${id}`);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    

    // async updateVehicle(id,data){
    //     try{
    //         await AxiosTask.update(`${query}/${id}`,data);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
};

export default Vehicle;

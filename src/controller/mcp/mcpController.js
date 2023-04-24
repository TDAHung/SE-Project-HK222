import * as Axios from "../../api/axios";
import * as AxiosTask from "../../api/axiosTask";
const query = '/mcp';

class MCP {
    async addMCP(data){
        try{
            return await Axios.add('/MCP/create', data);
        }catch(error){
            console.log(error);
        }
    }

    async getAllMCP(params={}){
        try{
            return await Axios.get('/MCP/getAll',params);
        }catch(error){
            console.log(error);
        }
    }

    async getMCP(id,params={}) {
        try{
            return await AxiosTask.get(`${query}/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    

    async deleteMCP(id){
        try{
            await AxiosTask.destroy(`${query}/${id}`);
        }catch(error){
            console.log(error);
        }
    }

    

    async updateMCP(id,data){
        try{
            await AxiosTask.update(`${query}/${id}`,data);
        }catch(error){
            console.log(error);
        }
    }
};

export default MCP;

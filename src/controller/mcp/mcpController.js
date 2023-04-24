import * as AxiosTask from "../../api/axiosTask";
const query = '/mcp';

class MCP {
    async getMCP(id,params={}) {
        try{
            return await AxiosTask.get(`${query}/${id}`,params);
        }catch(error){
            console.log(error);
        }
    };

    async getAllMCP(params={}){
        try{
            return await AxiosTask.get(`${query}`,params);
        }catch(error){
            console.log(error);
        }
    }

    async deleteMCP(id){
        try{
            await AxiosTask.destroy(`${query}/${id}`);
        }catch(error){
            console.log(error);
        }
    }

    async addMCP(data){
        try{
            await AxiosTask.add('/MCP/create' ,data);
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

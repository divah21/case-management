import { instance } from "../http/http-common";

class CaseService{
    create(data){
        return instance.post("/cases", data);;
    }
    getAllCases(){
        return instance.get("/cases");
    }
    update(id,data){
        return instance.put(`/cases/${id}`, data);
    }
}

export default new CaseService();
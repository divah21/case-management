// src/api/services/case.service.ts
import { instance } from "../http/http-common";
import { Case } from "../../types/case"; // Import the Case type
import { CaseCreatePayload } from "pages/case";

class CaseService {
  create(payload: CaseCreatePayload): Promise<Case> {
    return instance.post("/cases", payload);
  }

  getAllCases(): Promise<{ data: { data: Case[] } }> { // Assuming you get an array of Case objects
    return instance.get("/cases");
  }

  update(id: string, data: Case): Promise<Case> {
    return instance.put(`/cases/${id}`, data);
  }
}

export default new CaseService();

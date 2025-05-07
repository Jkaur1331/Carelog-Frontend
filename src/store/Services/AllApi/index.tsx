import { callApi } from "../../../Utils/api/apiUtils.tsx";
import { allApi } from "../../Endpoints/AllApi/index.tsx";

export const addCompany = ({ body }: any) =>
  callApi({
    uriEndPoint: allApi.addCompany.v1,
    body,
    multipart: true,
  });

export const addParticipant = ({ body }: any) =>
  callApi({
    uriEndPoint: allApi.addParticipant.v1,
    body,
  });

export const getAllParticipant = ({ query }: any) =>
  callApi({
    uriEndPoint: allApi.getAllParticipant.v1,
    query,
  });

export const editParticipant = ({ query, body }: any) =>
  callApi({
    uriEndPoint: allApi.editParticipant.v1,
    query,
    body,
    multipart: true,
  });

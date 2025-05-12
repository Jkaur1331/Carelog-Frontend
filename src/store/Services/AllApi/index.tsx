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

export const getParticipants = ({ query, pathParams }: any) =>
  callApi({
    uriEndPoint: allApi.getPatient.v1,
    query,
    pathParams,
  });

export const addPatients = ({ body }: any) =>
  callApi({
    uriEndPoint: allApi.addPatient.v1,
    body,
  });
export const editPatients = ({ body, pathParams }: any) =>
  callApi({
    uriEndPoint: allApi.editPatient.v1,
    body,
    pathParams,
  });
export const deleteCompany = ({ query }: any) =>
  callApi({
    uriEndPoint: allApi.deleteCompany.v1,
    query,
  });

export const deletePatient = ({ query }: any) =>
  callApi({
    uriEndPoint: allApi.deletePatient.v1,
    query,
  });

export const changePasswordPatient = ({ body }: any) =>
  callApi({
    uriEndPoint: allApi.changePassword.v1,
    body,
  });

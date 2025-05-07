import { callApi } from "../../../Utils/api/apiUtils.tsx";
import { authEndpoints } from "../../Endpoints/Auth/index.tsx";

export const loginApiCall = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.loginApi.v1,
    body,
  });

export const resetPasswordLink = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.resetPasswordLink.v1,
    body,
  });
export const resetPasswordPage = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.resetPasswordPage.v1,
    body,
  });

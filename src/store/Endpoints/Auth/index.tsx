import { defaults } from "../default.tsx";

export const authEndpoints = {
  loginApi: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "super-admin/login",
    },
  },
  resetPasswordLink: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "admin/send-reset-password-email",
    },
  },
  resetPasswordPage: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "admin/reset-password",
    },
  },
};

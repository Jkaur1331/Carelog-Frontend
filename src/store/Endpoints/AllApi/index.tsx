import { defaults } from "../default.tsx";

export const allApi = {
  addCompany: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "super-admin/insertNewAdmin",
    },
  },
  addParticipant: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "admin/addParticipant",
    },
  },
  getAllParticipant: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "super-admin/getAdmins",
    },
  },
  editParticipant: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "super-admin/updateAdmin",
    },
  },
};

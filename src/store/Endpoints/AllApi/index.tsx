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
  getPatient: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "admin/getParticipants/:id",
    },
  },
  addPatient: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "admin/addParticipant",
    },
  },
  editPatient: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "admin/participants/:id",
    },
  },
  deleteCompany: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "super-admin/deleteAdmin",
    },
  },
  deletePatient: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "admin/participants",
    },
  },
  changePassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "admin/change-password",
    },
  },
};

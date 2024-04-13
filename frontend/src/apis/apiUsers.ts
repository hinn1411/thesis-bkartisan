import { axiosClient } from "./axiosClient";

const apiUsers = {
  getUsersList: async (page: number, offset: number, filterOpts: any) => {
    const { data } = await axiosClient.get(`/users`, {
      params: {
        byDate: filterOpts.byDate,
        byStatus: filterOpts.byStatus,
        name: filterOpts.name,
        page: page,
        offset: offset,
      },
    });

    return data;
  },
  getUserDetails: async (id: string) => {
    const { data } = await axiosClient.get(`/users/${id}`);
    return data;
  },
  lockUser: async (id: string, response: any) => {
    const res = await axiosClient.post(`/users/${id}/lock-user`, response);
    return res;
  },
  unlockUser: async (id: string) => {
    const res = await axiosClient.post(`/users/${id}/unlock-user`);
    return res;
  },
  getCollabsList: async (page: number, offset: number, filterOpts: any) => {
    const { data } = await axiosClient.get(`/collabs`, {
      params: {
        byDate: filterOpts.byDate,
        name: filterOpts.name,
        page: page,
        offset: offset,
      },
    });

    return data;
  },
  createCollab: async (collab: any) => {
    const res = await axiosClient.post(`/collabs/create-new`, collab);
    return res;
  },
};

export default apiUsers;

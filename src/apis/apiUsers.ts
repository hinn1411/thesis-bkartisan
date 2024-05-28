import { authClient, axiosClient } from "./axiosClient";

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
    const formData = new FormData();
    for (const key in collab) {
      formData.append(key, collab[key]);
    }

    const res = await axiosClient.post(`/collabs/create-new`, formData);
    return res;
  },
  updateInfoCollab: async (collab: any) => {
    const formData = new FormData();
    for (const key in collab) {
      formData.append(key, collab[key]);
    }
    console.log(collab);
    const res = await axiosClient.post(
      `/collabs/${collab.username}/update`,
      formData
    );
    return res;
  },
  getProfile: async () => {
    try {
      const { data } = await authClient.get(`/login/success`);
      return data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateAccount: async (accountData: FormData) => {
    try {
      const { data } = await axiosClient.patch("/profile/account", accountData);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updatePassword: async (passwordData: {
    password: string;
    newPassword: string;
  }) => {
    try {
      const { data } = await axiosClient.patch(
        "/profile/password",
        passwordData
      );
      return data;
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.msg);
    }
  },
  updateEmail: async (emailData: { password: string; email: string }) => {
    try {
      const { data } = await axiosClient.patch("/profile/email", emailData);
      return data;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.response.data.msg);
    }
  },
  updateAddress: async (addressData: { nation: string; address: string }) => {
    try {
      const { data } = await axiosClient.patch("/profile/address", addressData);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  becomeSeller: async (sellerInfo) => {
    try {
      const { data } = await axiosClient.patch(
        "/seller/become_seller",
        sellerInfo
      );
      return data;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.response.data.msg);
    }
  },
};

export default apiUsers;

import { axiosClient } from "./axiosClient";

const apiReports = {
  getReportsList: async (page: number, offset: number, filterOpts: any) => {
    const { data } = await axiosClient.get(`/reports`, {
      params: {
        byDate: filterOpts.byDate,
        byStatus: filterOpts.byStatus,
        byType: filterOpts.byType,
        searchTerm: filterOpts.searchTerm,
        page: page,
        offset: offset,
      },
    });

    return data;
  },

  getReportDetails: async (id: string) => {
    const { data } = await axiosClient.get(`/reports/${id}`);
    console.log(data);
    return data;
  },
};

export default apiReports;

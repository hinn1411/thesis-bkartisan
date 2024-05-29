import { axiosClient } from "./axiosClient";

const apiReports = {
  getReportsList: async (page: number, offset: number, filterOpts: any) => {
    const { data } = await axiosClient.get(`/reports`, {
      params: {
        byDate: filterOpts.byDate,
        byStatus: filterOpts.byStatus,
        byType: filterOpts.byType,
        searchTerm: filterOpts.searchTerm,
        mode: filterOpts.mode,
        page: page,
        offset: offset,
      },
    });

    return data;
  },

  getReportDetails: async (id: string) => {
    const { data } = await axiosClient.get(`/reports/${id}`);
    return data;
  },

  createReport: async (report: {
    reporter: string;
    reporterName: string;
    reportedUser: string;
    reportedUserName: string;
    reason: string;
    additionalInfo: string;
    type: "Sản phẩm" | "Bình luận" | "Mua bán";
    refId?: number;
  }) => {
    const { data } = await axiosClient.post(`/reports`, report);
    return data;
  },

  handleReport: async (reportId: string, accepted: boolean, response?: any) => {
    const { data } = await axiosClient.patch(`/reports/${reportId}`, {
      accepted,
      response
    });
    return data;
  }

};

export default apiReports;

import { axiosClient } from './axiosClient';

export type NewCommentType = {
  productId: number;
  content: string;
  numberOfStars: number | null;
  parentId: number | null;
};

const apiComment = {
  createComment: async (newComment: NewCommentType) => {
    try {
      const { data } = await axiosClient.post('/comments', newComment);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteComment: async () => {
    try {
      // const { data } = await axiosClient.delete('/comments', newComment);
      // console.log(data);
      // return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default apiComment;

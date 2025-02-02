// src/store/blog/index.ts
import {createSlice} from '@reduxjs/toolkit';
import {
  fetchBlogs,
  createBlog,
  fetchBloggers,
  getBlogById,
  getBlogsByAuthor,
} from './actions';

const initialState :any= {
  blogs: [],
  bloggers: [],
  isLoading: false,
  error: null,
};

export const BlogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBlogs.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        const {status, data} = action.payload;

        console.log(action, 'action');

        if (status === 200 && data.success) {
          state.blogs = data.data;
        }
        state.isLoading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getBlogById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        const {status, data} = action.payload;
        if (status === 200 && data.success) {
          state.currentBlog = data.data;
        }
        state.isLoading = false;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch blog details';
        state.currentBlog = null;
      })

      .addCase(getBlogsByAuthor.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlogsByAuthor.fulfilled, (state, action) => {
        const {status, data} = action.payload;
        if (status === 200 && data.success) {
          state.authorBlogs = data.data;
        }
        state.isLoading = false;
      })
      .addCase(getBlogsByAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch author blogs';
        state.authorBlogs = [];
      });
    // Add other cases for createBlog and fetchBloggers
  },
});

export const {clearBlogState} = BlogSlice.actions;
export {fetchBlogs, createBlog, fetchBloggers, getBlogById, getBlogsByAuthor};
export default BlogSlice.reducer;

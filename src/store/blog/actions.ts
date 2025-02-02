// src/store/blog/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import blogApiEndpoints from '../../apis/blogApi/config';
import blogApi from '../../apis/blogApi';


export const fetchBlogs = createAsyncThunk(
  `${blogApiEndpoints.getBlogs}Get`,
  async (filters:any = {}) => {
    console.log(filters,"filters");
    
    const { status, data } = await blogApi.getBlogs(filters);
    return { status, data };
  }
);

export const createBlog = createAsyncThunk(
  `${blogApiEndpoints.createBlog}Post`,
  async (payload) => {
    const { status, data } = await blogApi.createBlog(payload);
    return { status, data };
  }
);

export const fetchBloggers = createAsyncThunk(
  `${blogApiEndpoints.getBloggers}Get`,
  async (filters :any = {}) => {
    const { status, data } = await blogApi.getBloggers(filters);
    return { status, data };
  }
);

export const getBlogById = createAsyncThunk(
  `${blogApiEndpoints.getBlogById}Get`,
  async (id: string) => {
    const { status, data } = await blogApi.getBlogById(id);
    return { status, data };
  }
);

export const getBlogsByAuthor = createAsyncThunk(
  `${blogApiEndpoints.getBlogsByAuthor}Get`,
  async (authorId: string) => {
    const { status, data } = await blogApi.getBlogsByAuthor(authorId);
    return { status, data };
  }
);

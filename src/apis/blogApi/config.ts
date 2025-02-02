// src/services/api/blogApi/config.ts
export const blogApiEndpoints = {
    getBlogs: '/blogs',
    getBlogById: '/blogs/:id',
    createBlog: '/blogs/create',
    getBloggers: '/bloggers',
    getBloggerById: '/bloggers/:id',
    getComments: '/blogs/:id/comments',
    createComment: '/blogs/:id/comments',
    getBlogsByAuthor: '/blogs/author',
  };
  
  export default blogApiEndpoints;
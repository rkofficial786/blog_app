import {mockDataStore} from '../../data/mockData';
import {BlogPost, BlogWithAuthor, User} from '../../types/blogs';
import blogApiEndpoints from './config';

// Helper function to get post count for an author
const getAuthorPostCount = (authorId: string): number => {
  return mockDataStore.blogs.filter(blog => blog.authorId === authorId).length;
};

// Helper function to get total likes for an author
const getAuthorTotalLikes = (authorId: string): number => {
  return mockDataStore.blogs
    .filter(blog => blog.authorId === authorId)
    .reduce((total, blog) => total + (blog.likes || 0), 0);
};

const enrichBlogWithAuthor = (blog: BlogPost): BlogWithAuthor => {
  const author = mockDataStore.users.find(user => user.id === blog.authorId);
  if (!author) return {...blog, author: {} as User};

  const enrichedAuthor = {
    ...author,
    postCount: getAuthorPostCount(author.id),
    totalLikes: getAuthorTotalLikes(author.id),
  };

  return {
    ...blog,
    author: enrichedAuthor,
  };
};

const blogApi = {
  async getBlogs(filters = {}) {
    // Simulate API response
    let filteredBlogs = [...mockDataStore.blogs];

    if (filters.search) {
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Add expertise filter
    if (filters.expertise) {
      filteredBlogs = filteredBlogs.filter(blog => {
        const author = mockDataStore.users.find(
          user => user.id === blog.authorId,
        );
        return author?.expertise?.includes(filters.expertise);
      });
    }

    // Add language filter
    if (filters.language) {
      filteredBlogs = filteredBlogs.filter(
        blog => blog.language === filters.language,
      );
    }

    // Enrich blogs with author details
    const enrichedBlogs = filteredBlogs.map(blog => enrichBlogWithAuthor(blog));

    return {
      status: 200,
      data: {
        success: true,
        data: enrichedBlogs,
      },
    };
  },

  async getBlogById(id: string) {
    const blog = mockDataStore.blogs.find(b => b.id === id);
    if (!blog) {
      return {
        status: 404,
        data: {
          success: false,
          error: 'Blog not found',
        },
      };
    }

    const enrichedBlog = enrichBlogWithAuthor(blog);

    return {
      status: 200,
      data: {
        success: true,
        data: enrichedBlog,
      },
    };
  },

  async createBlog(payload: any) {

    console.log(payload,"payload hai create ka");
    
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: payload.title,
      content: payload.content,
      images: [payload.thumbnailUrl],
      tags: payload.tags,
      authorId: payload.authorId,
      language: payload.language || 'English',
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockDataStore.blogs.push(newBlog);

    const enrichedBlog = enrichBlogWithAuthor(newBlog);

    return {
      status: 200,
      data: {
        success: true,
        data: enrichedBlog,
      },
    };
  },
  async getBloggers(filters = {}) {
    let bloggers = [...mockDataStore.users].filter(
      user => user.role === 'blogger',
    );

    if (filters.expertise) {
      bloggers = bloggers.filter(blogger =>
        blogger.expertise?.some(exp => filters.expertise.includes(exp)),
      );
    }

    // Enrich bloggers with post count and total likes
    const enrichedBloggers = bloggers.map(blogger => ({
      ...blogger,
      postCount: getAuthorPostCount(blogger.id),
      totalLikes: getAuthorTotalLikes(blogger.id),
    }));

    return {
      status: 200,
      data: {
        success: true,
        data: enrichedBloggers,
      },
    };
  },

  async getBlogsByAuthor(authorId: string) {
    const authorBlogs = mockDataStore.blogs.filter(
      blog => blog.authorId === authorId,
    );
    const enrichedBlogs = authorBlogs.map(blog => enrichBlogWithAuthor(blog));

    return {
      status: 200,
      data: {
        success: true,
        data: enrichedBlogs,
      },
    };
  },
};

export default blogApi;

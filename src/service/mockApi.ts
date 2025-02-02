import {mockBloggers, mockBlogs} from '../data/mockData';
import {Blog, User} from '../types/blogs';
import {TempStorage} from './storage';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Auth & Onboarding
  async login(email: string, password: string) {
    await delay(800);
    const mockToken = `mock-token-${Date.now()}`;
    await TempStorage.saveAuthToken(mockToken);

    return {
      status: 200,
      data: {
        token: mockToken,
        message: 'Login successful',
      },
    };
  },

  async completeOnboarding(userData: Partial<User>) {
    await delay(500);
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'subscriber',
      avatar: userData.avatar,
      bio: userData.bio || '',
      expertise: userData.expertise || [],
      location: userData.location,
      followers: 0,
      totalPosts: 0,
    };

    await TempStorage.saveUserProfile(newUser);
    return {
      status: 200,
      data: {
        success: true,
        user: newUser,
      },
    };
  },

  // Blogs
  async getBlogs(
    filters: {
      search?: string;
      tags?: string[];
      language?: string;
      authorId?: string;
    } = {},
  ) {
    await delay(500);

    let blogs = [...mockBlogs];
    const tempBlogs = await TempStorage.getTempBlogs();
    blogs = [...blogs, ...tempBlogs];

    // Apply filters
    if (filters.search) {
      blogs = blogs.filter(
        blog =>
          blog.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
          blog.content.toLowerCase().includes(filters.search!.toLowerCase()),
      );
    }

    if (filters.tags?.length) {
      blogs = blogs.filter(blog =>
        blog.tags.some(tag => filters.tags!.includes(tag)),
      );
    }

    if (filters.language) {
      blogs = blogs.filter(blog => blog.language === filters.language);
    }

    if (filters.authorId) {
      blogs = blogs.filter(blog => blog.authorId === filters.authorId);
    }

    return {
      status: 200,
      data: {
        success: true,
        blogs,
      },
    };
  },

  async getBlogById(id: string) {
    await delay(300);

    // Check mock blogs first
    let blog = mockBlogs.find(b => b.id === id);

    // If not found in mock, check temp blogs
    if (!blog) {
      const tempBlogs = await TempStorage.getTempBlogs();
      blog = tempBlogs.find(b => b.id === id);
    }

    if (!blog) {
      return {
        status: 404,
        data: {
          success: false,
          message: 'Blog not found',
        },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        blog,
      },
    };
  },

  async createBlog(blogData: Partial<Blog>) {
    await delay(800);

    const newBlog: Blog = {
      id: `blog-${Date.now()}`,
      title: blogData.title || '',
      content: blogData.content || '',
      images: blogData.images || [],
      tags: blogData.tags || [],
      authorId: blogData.authorId || '',
      language: blogData.language || 'English',
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0,
    };

    await TempStorage.saveTempBlog(newBlog);

    // Update user's post count
    const userProfile = await TempStorage.getUserProfile();
    if (userProfile) {
      userProfile.totalPosts += 1;
      await TempStorage.saveUserProfile(userProfile);
    }

    return {
      status: 200,
      data: {
        success: true,
        blog: newBlog,
      },
    };
  },

  // Bloggers & Profiles
  async getBloggers(filters: {expertise?: string[]} = {}) {
    await delay(500);

    let bloggers = [...mockBloggers];
    const currentUser = await TempStorage.getUserProfile();

    if (currentUser?.role === 'blogger') {
      bloggers = [...bloggers, currentUser];
    }

    if (filters.expertise?.length) {
      bloggers = bloggers.filter(blogger =>
        blogger.expertise?.some(exp => filters.expertise!.includes(exp)),
      );
    }

    return {
      status: 200,
      data: {
        success: true,
        bloggers,
      },
    };
  },


  // Add to mockApi
async getCurrentUserBlogs() {
    await delay(300);
    const currentUser = await TempStorage.getUserProfile();
    
    if (!currentUser) {
      return {
        status: 401,
        data: {
          success: false,
          message: 'User not authenticated'
        }
      };
    }
  
    // Get all blogs (both mock and temp)
    let blogs = [...mockBlogs];
    const tempBlogs = await TempStorage.getTempBlogs();
    blogs = [...blogs, ...tempBlogs];
  
    // Filter only current user's blogs
    const userBlogs = blogs.filter(blog => blog.authorId === currentUser.id);
  
    return {
      status: 200,
      data: {
        success: true,
        blogs: userBlogs
      }
    };
  },

  async getBloggerProfile(id: string) {
    await delay(500);

    // Check mock bloggers first
    let blogger = mockBloggers.find(b => b.id === id);

    // If not found, check if it's the current user
    if (!blogger) {
      const userProfile = await TempStorage.getUserProfile();
      if (userProfile?.id === id) {
        blogger = userProfile;
      }
    }

    if (!blogger) {
      return {
        status: 404,
        data: {
          success: false,
          message: 'Blogger not found',
        },
      };
    }

    // Get blogger's blogs
    const {
      data: {blogs},
    } = await this.getBlogs({authorId: id});

    return {
      status: 200,
      data: {
        success: true,
        blogger: {
          ...blogger,
          blogs,
        },
      },
    };
  },
};

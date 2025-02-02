// src/utils/tempStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_PROFILE: '@user_profile',
  TEMP_BLOGS: '@temp_blogs',
  AUTH_TOKEN: '@auth_token',
};

export const TempStorage = {
  // Auth related
  async saveAuthToken(token: string) {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getAuthToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async removeAuthToken() {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // User Profile
  async saveUserProfile(profile: User) {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  async getUserProfile() {
    const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profile ? JSON.parse(profile) : null;
  },

  // Blogs
  async getTempBlogs() {
    const blogs = await AsyncStorage.getItem(STORAGE_KEYS.TEMP_BLOGS);
    return blogs ? JSON.parse(blogs) : [];
  },

  async saveTempBlog(blog: Blog) {
    const existingBlogs = await this.getTempBlogs();
    const newBlogs = [...existingBlogs, blog];
    await AsyncStorage.setItem(STORAGE_KEYS.TEMP_BLOGS, JSON.stringify(newBlogs));
  },

  async updateTempBlog(blogId: string, updates: Partial<Blog>) {
    const blogs = await this.getTempBlogs();
    const index = blogs.findIndex(blog => blog.id === blogId);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...updates };
      await AsyncStorage.setItem(STORAGE_KEYS.TEMP_BLOGS, JSON.stringify(blogs));
    }
  },

  // Clear all data
  async clearAllData() {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  }
};
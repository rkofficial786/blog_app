import {mockDataStore} from '../../data/mockData';

const userApi = {
  async login({email, password}) {
    const user = mockDataStore.users.find(u => u.email === email);

    return {
      status: 200,
      data: {
        success: true,
        data: {
          user,
          token: `mock-token-${Date.now()}`,
        },
      },
    };
  },

  async register(userData) {
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      followersCount: 0,
      following: [],
      createdAt: new Date().toISOString(),
    };

    mockDataStore.users.push(newUser);

    return {
      status: 200,
      data: {
        success: true,
        data: {
          user: newUser,
          token: `mock-token-${Date.now()}`,
        },
      },
    };
  },

  async getProfile(userId) {
    const user = mockDataStore.users.find(u => u.id === userId);

    return {
      status: 200,
      data: {
        success: true,
        data: user,
      },
    };
  },

  async updateProfile(userId, updates) {
    const userIndex = mockDataStore.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockDataStore.users[userIndex] = {
        ...mockDataStore.users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        data: mockDataStore.users[userIndex],
      },
    };
  },

  async searchUsers(filters = {}) {
    let filteredUsers = [...mockDataStore.users];

    if (filters.search) {
      filteredUsers = filteredUsers.filter(
        user =>
          user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.role) {
      filteredUsers = filteredUsers.filter(user => user.role === filters.role);
    }

    return {
      status: 200,
      data: {
        success: true,
        data: filteredUsers,
      },
    };
  },

  async followUser(userId, targetUserId) {
    const user = mockDataStore.users.find(u => u.id === userId);
    const targetUser = mockDataStore.users.find(u => u.id === targetUserId);

    if (user && targetUser) {
      if (!user.following) user.following = [];
      if (!user.following.includes(targetUserId)) {
        user.following.push(targetUserId);
        targetUser.followersCount = (targetUser.followersCount || 0) + 1;
      }
    }

    return {
      status: 200,
      data: {
        success: true,
        data: user,
      },
    };
  },

  async unfollowUser(userId, targetUserId) {
    const user = mockDataStore.users.find(u => u.id === userId);
    const targetUser = mockDataStore.users.find(u => u.id === targetUserId);

    if (user && targetUser && user.following) {
      const index = user.following.indexOf(targetUserId);
      if (index !== -1) {
        user.following.splice(index, 1);
        targetUser.followersCount = Math.max(
          0,
          (targetUser.followersCount || 1) - 1,
        );
      }
    }

    return {
      status: 200,
      data: {
        success: true,
        data: user,
      },
    };
  },

  async getBloggersByLocation(coordinates = {}) {
    let bloggers = mockDataStore.users.filter(user => user.role === 'blogger');

    if (coordinates.latitude && coordinates.longitude) {
      bloggers = bloggers.filter(blogger => blogger.location);
    }

    return {
      status: 200,
      data: {
        success: true,
        data: bloggers,
      },
    };
  },
};

export default userApi;

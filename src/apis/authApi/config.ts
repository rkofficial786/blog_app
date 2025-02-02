export const userApiEndpoints = {
  login: '/auth/login',
  register: '/auth/register',
  getProfile: '/users/profile',
  updateProfile: '/users/profile/update',
  followUser: '/users/:id/follow',
  unfollowUser: '/users/:id/unfollow',
  getFollowers: '/users/:id/followers',
  getFollowing: '/users/:id/following',
  searchUsers: '/users/search',
};
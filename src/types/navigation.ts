export type RootStackParamList = {
    Main: undefined;
    Auth: undefined;
    // Add other root level stacks here
  };
  
  export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
  };
  
  export type MainTabParamList = {
    HomeStack: undefined;
    TasksStack: undefined;
    ProfileStack: undefined;
  };
  
  export type HomeStackParamList = {
    Home: undefined;
    Notifications: undefined;
    Settings: undefined;
  };
  
  export type TaskStackParamList = {
    TaskList: undefined;
    TaskDetail: { taskId: string };
    CreateTask: undefined;
    EditTask: { taskId: string };
  };
  
  export type ProfileStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
    Preferences: undefined;
  };
import {User, BlogPost, Comment} from '../types/blogs';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    coverImage: 'https://picsum.photos/800/600',
    role: 'blogger',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Tech blogger passionate about React Native and mobile development',
    expertise: ['React Native', 'JavaScript', 'Mobile Development'],
    languages: ['English', 'Hindi'],
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      city: 'Bangalore',
      state: 'Karnataka',
    },
    followersCount: 1200,
    following: ['user2', 'user3'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user2',
    name: 'Priya Singh',
    email: 'priya@example.com',
    role: 'blogger',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Writing about UI/UX and design systems',
    coverImage: 'https://picsum.photos/800/600',
    expertise: ['UI/UX', 'Design Systems', 'Figma'],
    languages: ['English', 'Hindi', 'Bengali'],
    location: {
      latitude: 19.076,
      longitude: 72.8777,
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    followersCount: 850,
    following: ['user1', 'user4'],
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user3',
    name: 'Amit Sharma',
    email: 'amit@example.com',
    coverImage: 'https://picsum.photos/800/600',
    role: 'blogger',
    profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Full-stack developer exploring AI and web technologies',
    expertise: ['Node.js', 'AI', 'Business'],
    languages: ['English', 'Hindi'],
    location: {
      latitude: 28.7041,
      longitude: 77.1025,
      city: 'Delhi',
      state: 'Delhi',
    },
    followersCount: 950,
    following: ['user1'],
    createdAt: '2024-02-01T00:00:00Z',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog1',
    title: 'Getting Started with React Native and TypeScript',
    content: `React Native with TypeScript offers a robust development experience, allowing type safety and better project structure. This comprehensive guide will walk you through everything you need to know to get started with this powerful combination.

    Setting up your development environment is the crucial first step. We'll explore the necessary tools, configurations, and best practices to ensure a smooth development process. From installing Node.js and the React Native CLI to configuring TypeScript compiler options, we'll cover all the essential setup requirements.

    TypeScript brings several advantages to React Native development. Its static typing system helps catch errors early in the development cycle, while its advanced IDE support provides better code completion and refactoring capabilities. We'll dive deep into practical examples of how TypeScript's features can enhance your development workflow.

    State management is another critical aspect of React Native applications. We'll explore various approaches, from using React's built-in useState and useContext hooks to implementing more complex solutions with Redux or MobX. Each approach will be accompanied by TypeScript examples to demonstrate proper typing of state and actions.

    Testing is essential for maintaining a reliable application. We'll cover unit testing with Jest, component testing with React Native Testing Library, and end-to-end testing with Detox. You'll learn how to write type-safe tests that provide confidence in your code's functionality.

    Finally, we'll discuss performance optimization techniques specific to React Native and TypeScript. From memo and useCallback optimizations to proper typing of performance-critical code, you'll learn how to build fast and reliable mobile applications.`,
    images: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
    ],
    tags: ['React Native', 'TypeScript', 'Mobile Development'],
    authorId: 'user1',
    language: 'English',
    likes: 156,
    comments: 23,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'blog2',
    title: 'Designing Consistent Mobile Apps',
    content: `Consistency in design is the cornerstone of creating exceptional user experiences in mobile applications. This comprehensive guide explores the fundamental principles and practical implementations of maintaining design consistency across your mobile apps.

    Design systems serve as the foundation for consistent user interfaces. We'll explore how to create and maintain a robust design system that scales with your application. From defining color palettes and typography to establishing spacing and layout guidelines, you'll learn how to build a comprehensive design language.

    Component libraries play a crucial role in implementing design systems. We'll dive into creating reusable UI components that maintain consistency while being flexible enough to handle various use cases. You'll learn about component documentation, versioning, and testing strategies to ensure reliability.

    Cross-platform consistency presents unique challenges. We'll examine strategies for maintaining your brand identity and user experience across iOS and Android platforms while respecting platform-specific conventions. This includes handling different navigation patterns, input methods, and platform-specific features.

    Design collaboration between designers and developers is essential for successful implementation. We'll discuss workflows, tools, and processes that facilitate effective communication and ensure design intentions are accurately translated into code. This includes using tools like Figma, Zeplin, or Adobe XD for design handoff.

    Finally, we'll explore how to measure and maintain design consistency over time. From automated visual regression testing to establishing design review processes, you'll learn how to ensure your application maintains its visual coherence as it evolves.`,
    images: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=3',
    ],
    tags: ['UI/UX', 'Design Systems', 'Mobile Apps'],
    authorId: 'user2',
    language: 'Bengali',
    likes: 98,
    comments: 15,
    createdAt: '2024-02-02T00:00:00Z',
    updatedAt: '2024-02-02T00:00:00Z',
  },
  {
    id: 'blog3',
    title: 'Machine Learning Basics for Web Developers',
    content: `<p> Machine learning is revolutionizing web development, opening new possibilities for creating intelligent and adaptive user experiences. This comprehensive guide bridges the gap between traditional web development and machine learning, making AI accessible to web developers.

    Understanding the fundamentals of machine learning is crucial for any developer looking to integrate AI into their applications. We'll explore core concepts such as supervised learning, unsupervised learning, and reinforcement learning through practical examples relevant to web development.

    Data preprocessing is a critical step in any machine learning project. We'll cover techniques for cleaning, normalizing, and transforming data to prepare it for machine learning models. You'll learn how to handle common data types encountered in web applications, from text and images to user behavior data.

    Browser-based machine learning has become increasingly powerful with libraries like TensorFlow.js. We'll explore how to train and deploy models directly in the browser, enabling real-time predictions without server roundtrips. Through practical examples, you'll learn to implement features like image recognition, natural language processing, and recommendation systems.

    Model optimization for web environments presents unique challenges. We'll discuss techniques for reducing model size, improving inference speed, and managing memory usage in browser-based applications. You'll learn how to balance model accuracy with performance requirements.

    Finally, we'll explore best practices for integrating machine learning features into your web applications. From handling model loading and caching to implementing fallback mechanisms, you'll learn how to create robust and reliable AI-powered web applications. </p>`,
    images: [
      'https://picsum.photos/800/600?random=6',
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/800/600?random=8',
    ],
    tags: ['Machine Learning', 'AI', 'Web Development'],
    authorId: 'user3',
    language: 'English',
    likes: 210,
    comments: 35,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
];

export const mockComments: Comment[] = [
  {
    id: 'comment1',
    blogId: 'blog1',
    userId: 'user2',
    content: 'Great article! Very helpful for beginners.',
    createdAt: '2024-02-01T12:00:00Z',
  },
  {
    id: 'comment2',
    blogId: 'blog3',
    userId: 'user1',
    content:
      'Machine learning for web development sounds fascinating. Thanks for sharing!',
    createdAt: '2024-02-11T08:30:00Z',
  },
  {
    id: 'comment3',
    blogId: 'blog2',
    userId: 'user3',
    content: 'Love the insights on UI consistency! Really well-written.',
    createdAt: '2024-02-03T10:15:00Z',
  },
];

export const mockDataStore = {
  users: mockUsers,
  blogs: mockBlogPosts,
  comments: mockComments,
};

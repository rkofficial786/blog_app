import {User, BlogPost, Comment} from '../types/blogs';
import {Chat, Message} from '../types/chats';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    coverImage: 'https://picsum.photos/800/600',
    role: 'blogger',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Tech blogger passionate about React Native and mobile development',
    expertise: ['Technology', 'JavaScript', 'Mobile Development'],
    languages: ['English', 'Hindi'],
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      city: 'Bangalore',
      state: 'Karnataka',
    },
    followersCount: 1200,
    following: ['user2', 'user3', 'user4'],
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
    expertise: ['UI/UX', 'Design', 'Figma'],
    languages: ['English', 'Bengali'],
    location: {
      latitude: 19.076,
      longitude: 72.8777,
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    followersCount: 850,
    following: ['user1', 'user4', 'user3'],
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
    expertise: ['Lifestyle', 'AI', 'Business'],
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

  {
    id: 'user4',
    name: 'Rakesh Singh',
    email: 'rakesh@example.com',
    role: 'blogger',
    profileImage: 'https://randomuser.me/api/portraits/men/64.jpg',
    bio: 'Writing about Business success',
    coverImage: 'https://picsum.photos/800/600',
    expertise: ['Business'],
    languages: ['Hindi'],
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
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog1',
    title: 'Getting Started with React Native and TypeScript',
    content: `
      <div>
        <p>React Native with TypeScript offers a robust development experience, allowing type safety and better project structure. This comprehensive guide will walk you through everything you need to know to get started with this powerful combination.</p>

        <h2>Development Environment Setup</h2>
        <p>Setting up your development environment is the crucial first step. We'll explore the necessary tools, configurations, and best practices to ensure a smooth development process. From installing Node.js and the React Native CLI to configuring TypeScript compiler options, we'll cover all the essential setup requirements.</p>

        <h2>TypeScript Advantages</h2>
        <p>TypeScript brings several advantages to React Native development. Its static typing system helps catch errors early in the development cycle, while its advanced IDE support provides better code completion and refactoring capabilities. We'll dive deep into practical examples of how TypeScript's features can enhance your development workflow.</p>

        <h2>State Management Approaches</h2>
        <p>State management is another critical aspect of React Native applications. We'll explore various approaches, from using React's built-in <code>useState</code> and <code>useContext</code> hooks to implementing more complex solutions with Redux or MobX. Each approach will be accompanied by TypeScript examples to demonstrate proper typing of state and actions.</p>

        <h2>Testing Strategies</h2>
        <p>Testing is essential for maintaining a reliable application. We'll cover:</p>
        <ul>
          <li>Unit testing with Jest</li>
          <li>Component testing with React Native Testing Library</li>
          <li>End-to-end testing with Detox</li>
        </ul>
        <p>You'll learn how to write type-safe tests that provide confidence in your code's functionality.</p>

        <h2>Performance Optimization</h2>
        <p>Finally, we'll discuss performance optimization techniques specific to React Native and TypeScript. From <code>memo</code> and <code>useCallback</code> optimizations to proper typing of performance-critical code, you'll learn how to build fast and reliable mobile applications.</p>
      </div>
    `,
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

    content: `
        <div>
          <p>মোবাইল অ্যাপ্লিকেশনে অসাধারণ ব্যবহারকারী অভিজ্ঞতা তৈরি করার মূল ভিত্তি হল ডিজাইনে সামঞ্জস্যতা। এই বিস্তৃত গাইডটি আপনার মোবাইল অ্যাপগুলিতে ডিজাইন সামঞ্জস্যতা বজায় রাখার মৌলিক নীতি এবং প্র্যাকটিক্যাল বাস্তবায়ন অন্বেষণ করে।</p>
  
          <h2>ডিজাইন সিস্টেম পরিচিতি</h2>
          <p>ডিজাইন সিস্টেম সামঞ্জস্যপূর্ণ ইউজার ইন্টারফেসের ভিত্তি হিসেবে কাজ করে। আমরা অন্বেষণ করব কীভাবে একটি শক্তিশালী ডিজাইন সিস্টেম তৈরি ও রক্ষণাবেক্ষণ করা যায় যা আপনার অ্যাপ্লিকেশনের সাথে স্কেল করে। কালার প্যালেট এবং টাইপোগ্রাফি নির্ধারণ থেকে শুরু করে স্পেসিং এবং লেআউট গাইডলাইন প্রতিষ্ঠা করা পর্যন্ত, আপনি একটি ব্যাপক ডিজাইন ভাষা তৈরি করতে শিখবেন।</p>
  
          <h2>কম্পোনেন্ট লাইব্রেরি</h2>
          <p>কম্পোনেন্ট লাইব্রেরি ডিজাইন সিস্টেম বাস্তবায়নে গুরুত্বপূর্ণ ভূমিকা পালন করে। আমরা পুনঃব্যবহারযোগ্য UI কম্পোনেন্ট তৈরি করার বিষয়ে আলোচনা করব যা বিভিন্ন ব্যবহারের ক্ষেত্রে নমনীয় থাকার পাশাপাশি সামঞ্জস্যতা বজায় রাখে। আপনি কম্পোনেন্ট ডকুমেন্টেশন, ভার্সনিং এবং নির্ভরযোগ্যতা নিশ্চিত করার জন্য টেস্টিং কৌশল সম্পর্কে জানতে পারবেন।</p>
  
          <h2>ক্রস-প্ল্যাটফর্ম সামঞ্জস্যতা</h2>
          <p>ক্রস-প্ল্যাটফর্ম সামঞ্জস্যতা অনন্য চ্যালেঞ্জ উপস্থাপন করে। আমরা প্ল্যাটফর্ম-নির্দিষ্ট কনভেনশনগুলিকে সম্মান করার পাশাপাশি <code>iOS</code> এবং <code>Android</code> প্ল্যাটফর্মে আপনার ব্র্যান্ড আইডেনটিটি এবং ব্যবহারকারী অভিজ্ঞতা বজায় রাখার কৌশলগুলি পরীক্ষা করব। এর মধ্যে রয়েছে বিভিন্ন নেভিগেশন প্যাটার্ন, ইনপুট পদ্ধতি এবং প্ল্যাটফর্ম-নির্দিষ্ট বৈশিষ্ট্যগুলি পরিচালনা করা।</p>
  
          <h2>ডিজাইনার-ডেভেলপার সহযোগিতা</h2>
          <p>সফল বাস্তবায়নের জন্য ডিজাইনার এবং ডেভেলপারদের মধ্যে সহযোগিতা অপরিহার্য। আমরা এমন ওয়ার্কফ্লো, টুল এবং প্রক্রিয়াগুলি নিয়ে আলোচনা করব যা কার্যকর যোগাযোগকে সহজতর করে এবং ডিজাইন উদ্দেশ্যগুলি সঠিকভাবে কোডে অনুবাদ করা নিশ্চিত করে। এর মধ্যে রয়েছে Figma, Zeplin, বা Adobe XD এর মতো টুল ব্যবহার করে ডিজাইন হ্যান্ডঅফের প্রক্রিয়া।</p>
        </div>
      `,
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
    content: `
    <div>
      <p>Machine learning is revolutionizing web development, opening new possibilities for creating intelligent and adaptive user experiences. This comprehensive guide bridges the gap between traditional web development and machine learning, making AI accessible to web developers.</p>

      <h2>Understanding Machine Learning Fundamentals</h2>
      <p>Understanding the fundamentals of machine learning is crucial for any developer looking to integrate AI into their applications. We'll explore core concepts such as supervised learning, unsupervised learning, and reinforcement learning through practical examples relevant to web development.</p>

      <h2>Data Preprocessing</h2>
      <p>Data preprocessing is a critical step in any machine learning project. We'll cover techniques for cleaning, normalizing, and transforming data to prepare it for machine learning models. You'll learn how to handle common data types encountered in web applications, from text and images to user behavior data.</p>

      <h2>Browser-Based Machine Learning</h2>
      <p>Browser-based machine learning has become increasingly powerful with libraries like <code>TensorFlow.js</code>. We'll explore how to train and deploy models directly in the browser, enabling real-time predictions without server roundtrips. Through practical examples, you'll learn to implement features like:</p>
      <ul>
        <li>Image recognition</li>
        <li>Natural language processing</li>
        <li>Recommendation systems</li>
      </ul>

      <h2>Model Optimization</h2>
      <p>Model optimization for web environments presents unique challenges. We'll discuss techniques for reducing model size, improving inference speed, and managing memory usage in browser-based applications. You'll learn how to balance model accuracy with performance requirements.</p>

      <h2>Integration Best Practices</h2>
      <p>Finally, we'll explore best practices for integrating machine learning features into your web applications. From handling model loading and caching to implementing fallback mechanisms, you'll learn how to create robust and reliable AI-powered web applications.</p>
    </div>
  `,
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

  {
    id: 'blog4',
    title: 'सफल व्यवसाय के 5 महत्वपूर्ण सिद्धांत',
    content: `
    <div class="blog-content">
      <p>आज के प्रतिस्पर्धी व्यावसायिक माहौल में सफलता प्राप्त करना एक चुनौतीपूर्ण कार्य है। लेकिन कुछ बुनियादी सिद्धांतों का पालन करके हम अपने व्यवसाय को सफलता की ऊंचाइयों तक ले जा सकते हैं।</p>

      <h2>1. ग्राहक केंद्रित दृष्टिकोण</h2>
      <p>किसी भी सफल व्यवसाय की नींव उसके ग्राहक होते हैं। आपको अपने ग्राहकों की जरूरतों और अपेक्षाओं को समझना होगा। उनकी फीडबैक को गंभीरता से लें और उसके अनुसार अपने उत्पादों या सेवाओं में सुधार करें।</p>

      <h2>2. नवीनता और अनुकूलन</h2>
      <p>बाजार लगातार बदल रहा है। नई तकनीकों और ट्रेंड्स के साथ अपडेट रहें। अपने व्यवसाय में नवीनता लाएं और बदलते समय के साथ खुद को अनुकूलित करें। जो कंपनियां इस बदलाव को स्वीकार नहीं करतीं, वे पीछे रह जाती हैं।</p>

      <h2>3. टीम का महत्व</h2>
      <p>एक मजबूत और प्रेरित टीम किसी भी व्यवसाय की रीढ़ होती है। अपनी टीम में सही लोगों को चुनें, उन्हें प्रशिक्षित करें और उनकी क्षमताओं का विकास करें। टीम के सदस्यों को निर्णय लेने में शामिल करें और उनके विचारों को महत्व दें।</p>

      <h2>4. वित्तीय प्रबंधन</h2>
      <p>सही वित्तीय प्रबंधन किसी भी व्यवसाय की सफलता के लिए आवश्यक है। अपने खर्चों पर नियंत्रण रखें, निवेश बुद्धिमानी से करें और नकदी प्रवाह का सही प्रबंधन करें। नियमित रूप से वित्तीय विश्लेषण करें और आवश्यकता पड़ने पर विशेषज्ञों की सलाह लें।</p>

      <h2>5. दीर्घकालिक दृष्टिकोण</h2>
      <p>सफलता एक रात में नहीं मिलती। धैर्य रखें और दीर्घकालिक लक्ष्यों पर ध्यान केंद्रित करें। छोटी-छोटी सफलताओं का जश्न मनाएं, लेकिन बड़े लक्ष्यों को न भूलें। अपनी रणनीतियों को नियमित रूप से समीक्षा करें और आवश्यक बदलाव करें।</p>

      <div class="conclusion">
        <p>अंत में, याद रखें कि सफलता एक यात्रा है, मंजिल नहीं। इन सिद्धांतों का पालन करते हुए अपने व्यवसाय को विकास के पथ पर ले जाएं। आपकी मेहनत और दृढ़ संकल्प निश्चित रूप से सफलता की ओर ले जाएंगे।</p>
      </div>
    </div>`,
    images: [
      'https://picsum.photos/800/600?random=9',
      'https://picsum.photos/800/600?random=10',
    ],
    tags: ['व्यवसाय', 'सफलता', 'प्रबंधन'],
    authorId: 'user4',
    language: 'Hindi',
    likes: 175,
    comments: 28,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
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

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: ['user1', 'user2'],
    lastMessage: {
      id: 'msg5',
      senderId: 'user2',
      receiverId: 'user1',
      content: "I'll share the design system documentation soon!",
      timestamp: '2024-02-03T10:30:00Z',
      read: false,
    },
    updatedAt: '2024-02-03T10:30:00Z',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user1',
    receiverId: 'user2',
    content:
      'Hi Priya! I really enjoyed your article about design systems. Would love to collaborate on a project combining React Native with your UI/UX expertise.',
    timestamp: '2024-02-01T10:00:00Z',
    read: true,
  },
  {
    id: 'msg2',
    senderId: 'user2',
    receiverId: 'user1',
    content:
      "Thanks Rahul! That sounds interesting. I've been looking to integrate better TypeScript practices into my design system implementations.",
    timestamp: '2024-02-01T10:05:00Z',
    read: true,
  },
  {
    id: 'msg3',
    senderId: 'user1',
    receiverId: 'user2',
    content:
      'Perfect! I can help with that. Could you share some examples of your current design system documentation?',
    timestamp: '2024-02-02T10:15:00Z',
    read: true,
  },
  {
    id: 'msg4',
    senderId: 'user2',
    receiverId: 'user1',
    content:
      'Of course! Let me put together some examples that highlight the areas where we could improve type safety.',
    timestamp: '2024-02-02T10:20:00Z',
    read: true,
  },
  {
    id: 'msg5',
    senderId: 'user2',
    receiverId: 'user1',
    content: "I'll share the design system documentation soon!",
    timestamp: '2024-02-02T10:30:00Z',
    read: false,
  },
];

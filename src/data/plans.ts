export const plans = [
  {
    id: 'pro',
    title: 'Pro Plan',
    type: 'Pro',
    price: '$9.99',
    period: 'month',
    features: [
      {
        icon: 'task-alt',
        text: 'Unlimited tasks and projects',
        description: 'Create as many tasks as you need',
      },
      {
        icon: 'notifications-active',
        text: 'Advanced reminders & notifications',
        description: 'Never miss an important deadline',
      },
      {
        icon: 'analytics',
        text: 'Detailed analytics & insights',
        description: 'Track your productivity growth',
      },
      {
        icon: 'support-agent',
        text: 'Priority 24/7 support',
        description: 'Get help whenever you need it',
      },
    ],
    gradientColors: {
      light: ['#4F46E5', '#7C3AED'],
      dark: ['#6366F1', '#4F46E5'],
    },
    buttonGradientColors: {
      light: ['#4F46E5', '#7C39ED'],
      dark: ['#6366F1', '#7C3AED'],
    },
    secondaryButtonColors: {
      light: ['#F9FAFB', '#F3F4F6'],
      dark: ['#1F2937', '#111827'],
    },
    isPopular: true,
  },
  {
    id: 'premium',
    title: 'Premium Plan',
    price: '$19.99',
    type: 'Premium',
    period: 'month',
    features: [
      {
        icon: 'task-alt',
        text: 'Unlimited tasks and projects',
        description: 'Create as many tasks as you need',
      },
      {
        icon: 'notifications-active',
        text: 'Advanced reminders & notifications',
        description: 'Never miss an important deadline',
      },
      {
        icon: 'analytics',
        text: 'Detailed analytics & insights',
        description: 'Track your productivity growth',
      },
      {
        icon: 'support-agent',
        text: 'Priority 24/7 support',
        description: 'Get help whenever you need it',
      },
      {
        icon: 'star',
        text: 'Exclusive features',
        description: 'Access to premium-only tools',
      },
    ],
    gradientColors: {
      light: ['#F59E0B', '#EA580C'],
      dark: ['#EA580C', '#C2410C'],
    },
    buttonGradientColors: {
      light: ['#F59E0B', '#EA580C'],
      dark: ['#EA580C', '#C2410C'],
    },
    secondaryButtonColors: {
      light: ['#F9FAFB', '#F3F4F6'],
      dark: ['#1F2937', '#111827'],
    },
    isPopular: false,
  },
];

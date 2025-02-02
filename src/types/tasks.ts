export interface TimeRange {
    start: Date;
    end: Date;
  }
  
  export interface ChecklistItem {
    title: string;
    isCompleted: boolean;
  }
  
  export interface Category {
    _id: string;
    name: string;
  }
  
  export interface Task {
    _id: string;
    name: string;
    description: string;
    timeRange: TimeRange;
    repeat: string;
    repeatDays: string[];
    priority: 'High' | 'Medium' | 'Low';
    category: Category;
    isCompleted: boolean;
    checklist: ChecklistItem[];
  }
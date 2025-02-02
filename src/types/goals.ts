// types.ts

// Interface for a single breakpoint
export interface Breakpoint {
    _id?: string;
    title: string;
    level?: number;
    dueDate: Date;
    completionDate?: Date; // Optional, as it may not be completed yet
    completed?: boolean;
    frequency?: number;
  }
  
  // Interface for a single journal entry
  export interface JournalEntry {
    _id?: string;
    date?: Date;
    text?: string;
  }
  
  // Interface for a single goal
  export interface Goal {
    _id?: string;
    title: string;
    description: string;
    user?: string;
    totalBreakpoints?: number;
    completedBreakpoints?: number;
    overdueBreakpoints?: number;
    progress?: number;
    breakpoints?: Breakpoint[];
    journal?: JournalEntry[];
  }
  
  // Interface for the entire goals array
  export interface GoalsData {
    goals: Goal[];
  }
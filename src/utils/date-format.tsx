// utils/dateUtils.ts
import {format, formatDistanceToNow} from 'date-fns';

export const formatDate = (
    date: string | number | Date,
    options: { format?: string; relative?: boolean } = {}
  ): string => {
    const { format: dateFormat = 'MMM d, yyyy', relative = false } = options;
  
    if (relative) {
      return formatDistanceToNow(new Date(date), { addSuffix: true }); // e.g., "1 hour ago"
    }
  
    return format(new Date(date), dateFormat); // e.g., "Oct 1, 2023"
  };
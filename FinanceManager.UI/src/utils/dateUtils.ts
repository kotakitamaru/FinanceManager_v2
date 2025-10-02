// Utility functions for date formatting and manipulation
import { format, parseISO, isValid, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns';

export const formatDate = (date: string | Date, formatString: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid Date';
    }
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const getCurrentMonthRange = () => {
  const now = new Date();
  return {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };
};

export const getPreviousMonthRange = () => {
  const now = new Date();
  const previousMonth = subMonths(now, 1);
  return {
    start: startOfMonth(previousMonth),
    end: endOfMonth(previousMonth),
  };
};

export const getNextMonthRange = () => {
  const now = new Date();
  const nextMonth = addMonths(now, 1);
  return {
    start: startOfMonth(nextMonth),
    end: endOfMonth(nextMonth),
  };
};

export const isDateInRange = (date: string | Date, startDate: Date, endDate: Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return false;
    }
    return dateObj >= startDate && dateObj <= endDate;
  } catch (error) {
    console.error('Error checking date range:', error);
    return false;
  }
};

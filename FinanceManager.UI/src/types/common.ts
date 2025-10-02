// Common types used across the application
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormError {
  field: string;
  message: string;
}

export interface ValidationError {
  [key: string]: string[];
}

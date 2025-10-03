/**
 * Utility functions for form validation operations
 */

import { validateEmail, validatePassword, validatePasswordConfirmation, validateName } from '@/utils/validation';

export interface FormData {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates a registration form with all required fields
 * @param formData - The form data to validate
 * @returns Validation result with errors
 */
export const validateRegistrationForm = (formData: FormData): FormValidationResult => {
  const errors: Record<string, string> = {};
  
  if (formData.name) {
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error!;
    }
  }
  
  if (formData.email) {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }
  }
  
  if (formData.password) {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error!;
    }
  }
  
  if (formData.password && formData.confirmPassword) {
    const confirmPasswordValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword);
    if (!confirmPasswordValidation.isValid) {
      errors.confirmPassword = confirmPasswordValidation.error!;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

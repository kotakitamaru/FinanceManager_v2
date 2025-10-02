import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ValidationUtils {
  static async validateObject<T>(object: any, dtoClass: new () => T): Promise<ValidationError[]> {
    const dto = plainToClass(dtoClass, object);
    return await validate(dto as any);
  }

  static formatValidationErrors(errors: ValidationError[]): { field: string; message: string; value?: any }[] {
    return errors.map(error => ({
      field: error.property,
      message: Object.values(error.constraints || {})[0] || 'Invalid value',
      value: error.value
    }));
  }

  static async validateAndTransform<T>(object: any, dtoClass: new () => T): Promise<{
    isValid: boolean;
    data?: T;
    errors?: { field: string; message: string; value?: any }[];
  }> {
    const dto = plainToClass(dtoClass, object);
    const errors = await validate(dto as any);
    
    if (errors.length > 0) {
      return {
        isValid: false,
        errors: this.formatValidationErrors(errors)
      };
    }
    
    return {
      isValid: true,
      data: dto
    };
  }
}

import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationOptions = {
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const errors: { [key: string]: string[] } = {};
    validationErrors.map((e) => {
      errors[e.property] = Object.values(e.constraints);
    });
    throw new BadRequestException({ errors });
  },
};

export const testValidationOptions = {
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const errors: { [key: string]: string[] } = {};
    validationErrors.map((e) => {
      errors[e.property] = Object.keys(e.constraints);
    });
    return new BadRequestException({ errors });
  },
};

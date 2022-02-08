import { validate } from 'class-validator';
import { validationOptions } from './validation-options';

export const forceValidation = async (dto: any) => {
  const { exceptionFactory } = validationOptions;
  const errors = await validate(dto, {
    ...validationOptions,
    exceptionFactory: undefined,
  });
  if (errors.length > 0) {
    throw exceptionFactory(errors);
  }
  return;
};

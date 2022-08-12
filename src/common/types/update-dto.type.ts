export type UpdateDto<TDto> = {
  [P in keyof TDto]: (() => string) | TDto[P];
};

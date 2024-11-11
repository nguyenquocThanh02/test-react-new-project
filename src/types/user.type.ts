export type Permission = {
  name: string;
  code: string;
  ordering: number;
  isEnable: boolean;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  permissions: Permission[];
};

export type SuccessUserResponse = {
  status?: string | number;
  message?: string;
  data: User;
};

export type ErrorResponse = {
  status?: string | number;
  message?: string;
  data: User;
};

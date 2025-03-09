export interface IUser {
  _id?: string;
  adminID?: string;
  username: string;
  socketID?: string;
  email: string;
  password: string;
  photo: string;
  name: string;
  accountBalance?: number;
  access?: Record<string, any>;
  pin: number;
  adminType: "superAdmin" | "subAdmin";
  createdAt?: Date;
}

export interface IError {
  message: string;

  status: string;
}

export interface IResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

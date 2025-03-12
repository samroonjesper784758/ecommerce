export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string
}

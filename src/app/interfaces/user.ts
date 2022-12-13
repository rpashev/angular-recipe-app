export interface ISignUpUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface ILoginUserData {
  email: string;
  password: string;
}

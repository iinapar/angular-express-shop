export interface Newcustomer {
  firstname: string;
  lastname: string;
  username: String;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    zip: number;
  };
}

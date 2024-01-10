export interface Customer {
  _id: string;
  firstname: string;
  lastname: string;
  username: String;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
}

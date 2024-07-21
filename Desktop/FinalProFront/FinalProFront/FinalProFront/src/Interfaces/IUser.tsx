interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  imgUrl?: string;
  tokens?: string[];
}

export default IUser;

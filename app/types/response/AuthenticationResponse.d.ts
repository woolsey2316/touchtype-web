import User from "../User.d";
export default interface AuthenticationResponse {
  user: User;
  accessToken?: string;
}

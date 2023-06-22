/**
 * Data transfer object for a user.
 */
export default interface IAuthUserDTO {
  id : string;
  name: string;
  phoneNumber: string;
  email: string;
  role: string;
}
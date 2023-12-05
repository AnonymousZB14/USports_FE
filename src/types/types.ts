export interface AddressType {
  address: string;
  postCode: string;
  additional: string;
}
export interface UserProfile {
  id: number;
  name: string;
  profileImage:string,
}

export type Records = {recordId:string, imageAddress:string}[]
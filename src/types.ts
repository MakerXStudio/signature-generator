export interface Profile {
  name: string;
  pronoun: string;
  title: string;
  email: string;
  mobile: string;
  twitter: string;
  qualifications: string;
  addGPTW: boolean;
}

export const defaultProfile: Profile = {
  name: '',
  pronoun: '',
  title: '',
  email: '',
  mobile: '',
  twitter: '',
  qualifications: '',
  addGPTW: false,
};

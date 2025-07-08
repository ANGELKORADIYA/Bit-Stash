export interface CodePost {
  id: string;
  username: string;
  code: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface FormData {
  username: string;
  password: string;
  code: string;
  type: string;
  title: string;
  description: string;
  visibility:boolean;
}

export interface ServerCodePost  {
  codes:{
    username: string;
    code: string;
    type: string;
    title: string;
    description: string;
    visibility:boolean;
  },
  login:{
    username:string,
    password:string
  }

}
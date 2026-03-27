export interface CodePost {
  id: number;
  username: string;
  code: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
  status?: string;
  sharedWith?: string[];
}

export interface FormData {
  username: string;
  password: string;
  code: string;
  type: string;
  title: string;
  description: string;
  visibility:boolean;
  status?: string;
}

export interface ServerCodePost  {
  codes:{
    id?: number;
    username: string;
    code: string;
    type: string;
    title: string;
    description: string;
    visibility:boolean;
    status?: string;
  },
  login:{
    username:string,
    password:string
  }

}
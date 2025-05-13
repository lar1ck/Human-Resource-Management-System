export interface Staff {
  EmployeeID: number;
  PostID: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  DOB: Date;
  Email: string;
  Phone: string;
  Address: string;
  DepID: number;
}

export interface Post {
  PostID: number;
  PostTitle: string;
}

export interface SignupData {
  Username: string;
  Password: string;
  EmployeeID: number;
}

export interface LoginData {
  Username: string;
  Password: string;
}
export interface Department {
  DepId: number;
  DepName: string;
};

export interface User {
  UserID: number;
  EmployeeID: number;
  Username: string;
  Password: string;
};
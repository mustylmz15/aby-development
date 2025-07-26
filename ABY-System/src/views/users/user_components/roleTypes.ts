export interface Assignment {
  id?: string; // yeni eklenen assignmentlarda id olmayabilir
  role: string;
  resourceType: string;
  resourceId?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  assignments: Assignment[];
  roles?: string[]; // assignments'tan türetilen roller, frontend için
}

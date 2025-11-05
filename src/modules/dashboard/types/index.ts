export interface Project {
  id: string;
  title: string;
  description: string;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  Starmark: {
    id: string;
    isMarked: boolean;
  }[];
}

export interface PlaygroundData {
  id: string;
  name: string;
  icon: string;
  starred: boolean;
}

export interface PlaygroundFromDB {
  id: string;
  title: string;
  description: string | null;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  Starmark: {
    id: string;
    isMarked: boolean;
  }[];
}

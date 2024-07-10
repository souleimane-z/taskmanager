export interface Task {
    id: string;
    title: string;
    content: string;
    color: string;
    created: Date;
    modified: Date;
    archived: boolean;
    pinned: boolean;
    tags: string[];
  }
export interface Alert {
  type: string;
  message: string;
  closed?: boolean;
}

export interface SidebarMenu {
  id?: number;
  path: string;
  title: string;
  icon: string;
  submenu?: SidebarMenu[];
}
export interface User {
  id: string;
  title?: string;
  full_name?: string;
  first_name: string;
  last_name: string;
  nickname: string;
  gender: string;
  email: string;
  phone: string;
  picture: string;
  role?: string;
  calendar?: number;
  is_staff?: string;
  is_active?: string;
  date_joined?: string;
  last_login?: string;
  student?: Student;
  teacher?: Teacher;
}

export interface EducationalStage {
  id: number;
  name: string;
  description: string;
}

export interface Student {
  user?: User;
  educational_stage: EducationalStage;
  picture_url?: string;
}

export interface Teacher {
  user?: User;
  bio: string;
  verified?: boolean;
  verification_file?: string;
}

export interface Lesson {
  id: string;
  name: string;
  description: string;
  notes: string;
  course: string;
  parent_lesson: string;
  position: string;
  children_lessons?: Lesson[];
}

export interface Post {
  id: string;
  name: string;
  description: string;
  category: string;
  course: string;
  parent_post: string;
  children_posts?: Post[];
  date_created: string;
  created_by: string;
  date_modified: string;
  modified_by: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  cover: string;
  teacher: Teacher;
  assistant_teachers: Teacher[];
  educational_stages: EducationalStage[];
  students: Student[];
  lessons: Lesson[];
  posts: Post[];
  classrooms: Classroom[];
  date_created: string;
  created_by: string;
  date_modified: string;
  modified_by: string;
}

export interface Occurrence {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  existed: string;
  event_id: string;
  classroom: {
    name: string;
    duration: string;
    room_id: string;
  };
  course: {
    name: string;
    teacher: string;
    students: any[];
  };
  color: string;
  rule: string;
  end_recurring_period: string;
  created_by: string;
  cancelled: string;
}

export interface Rule {
  id: number;
  name: string;
  description: string;
  frequency: string;
  params: string;
  rrule_frequency: number;
}

export interface Event {
  id: number;
  classroom: string;
  color: string;
  start: string;
  end: string;
  end_recurring_period: string;
  rule: Rule;
}

export interface Classroom {
  id: string;
  name: string;
  description: string;
  room_id: string;
  welcome_message: string;
  logout_url: string;
  start_date: string;
  end_date: string;
  duration: string;
  event: Event;
  date_created: string;
  created_by: string;
  date_modified: string;
  modified_by: string;
}

export interface Request {
  id: number;
  course: Course;
  student: Student;
  teacher: Teacher;
  status: string;
  created_by: string;
  date_created: string;
  date_modified: string;
  modified_by: string;
  removed?: boolean;
  action?: string;
  selected?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface UpdateTodo {
  title: string,
  completed: boolean;
}

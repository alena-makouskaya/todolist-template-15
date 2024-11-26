import { TaskPriority, TaskStatus } from "../../common/enums/enums";

export type TaskType = {
  todoListId: string;
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  order: number;
  addedDate: string;
};

export type GetTasksType = {
  items: Array<TaskType>;
  totalCount: number;
  error: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  startDate?: string;
  deadline?: string;
};

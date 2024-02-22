import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(`${this.URL}/tasks`);
  }

  getPrivateTasks() {
    return this.http.get<any>(`${this.URL}/private-tasks`);
  }

  addPrivateTask(newTask: any) {
    return this.http.post<any>(`${this.URL}/private-tasks`, newTask);
  }
  removePrivateTask(task: any) {
    return this.http.delete<any>(`${this.URL}/private-tasks/${task._id}`);
  }
}
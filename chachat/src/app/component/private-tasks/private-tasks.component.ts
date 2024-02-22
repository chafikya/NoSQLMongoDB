import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/tasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface Task {
  _id: string;
  name: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  tasks: Task[] = [];
  newTask: Task = { _id: '', name: '', description: '', date: '' };

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.loadPrivateTasks();
  }

  loadPrivateTasks() {
    this.taskService.getPrivateTasks()
      .subscribe(
        res => this.tasks = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      );
  }

  addPrivateTask() {
    this.taskService.addPrivateTask(this.newTask)
      .subscribe(
        () => {
          console.log('Private task added successfully');
          this.loadPrivateTasks(); // Reload tasks after adding a task
          this.resetForm();
        },
        error => console.error('Error adding private task:', error)
      );
  }

  removePrivateTask(task: Task) {
    this.taskService.removePrivateTask(task)
      .subscribe(
        () => {
          console.log('Private task removed successfully');
          this.loadPrivateTasks(); // Reload tasks after removing a task
        },
        error => console.error('Error removing private task:', error)
      );
  }

  resetForm() {
    this.newTask = { _id: '', name: '', description: '', date: '' };
  }
}

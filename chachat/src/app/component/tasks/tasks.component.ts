import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/tasks.service';

interface Task {
  name: string;
  description: string;
  date: string; // Adjust the type according to your data
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(
        res => {
          this.tasks = res;
        },
        err => console.log(err)
      )
  }

}
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../../service/project.service';
import { Project } from '../../../model/project';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-project-edit',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;
  invalid: any;

  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private router= inject(Router);

  ngOnInit(): void {
      this.form = new FormGroup({
        idProject: new FormControl(0),
        name: new FormControl(''),
        company: new FormControl(''),
        description: new FormControl(''),
        status: new FormControl('')
      });

    this.route.params.subscribe(data=>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.isEdit){
      this.projectService.findById(this.id).subscribe(data =>{
        this.form = new FormGroup({
          idProject: new FormControl(data.idProject),
          name: new FormControl(data.name),
          company: new FormControl(data.company),
          description: new FormControl(data.description),
          status: new FormControl(data.status),
        });
      });
    }
  }

  operate(){
    const project: Project = new Project();

    project.idProject = this.form.value['idProject'];
    project.name = this.form.value['name'];
    project.company = this.form.value['company'];
    project.description = this.form.value['description'];
    project.status = this.form.value['status'];

    if(this.isEdit){
      this.projectService.update(this.id, project)
      .pipe(switchMap(()=> this.projectService.findAll())
    )
      .subscribe(data => {
        this.projectService.setProjectChange(data);
        this.projectService.setMessageChange('UPDATED!');
      });
    }else{
      this.projectService.save(project)
      .pipe(switchMap(()=> this.projectService.findAll())
    )
      .subscribe(data => {
        this.projectService.setProjectChange(data);
        this.projectService.setMessageChange('CREATED!');
      });
    }
    this.router.navigate(['/pages/project']);
  }
}

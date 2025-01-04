import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectComponent } from "./pages/project/project.component";
import { SupplierComponent } from "./pages/supplier/supplier.component";
import { LayoutComponent } from './pages/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectComponent, SupplierComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'email-frontend';
}

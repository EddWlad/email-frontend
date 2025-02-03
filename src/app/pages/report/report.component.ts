import { ChartType, TypedRegistry } from './../../../../node_modules/chart.js/dist/types/index.d';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MailService } from '../../../service/mail.service';
import { Chart} from 'chart.js/auto';

@Component({
  selector: 'app-report',
  imports: [MaterialModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  chart: Chart;
  type: ChartType = 'line';
  linetype: ChartType = 'line';
  bartype: ChartType = 'bar';
  doughnutype: ChartType = 'doughnut';
  radartype: ChartType = 'radar';
  pietype: ChartType = 'pie';


  constructor(
    private mailService: MailService
  ) {

  }
  ngOnInit(): void {
    this.draw();
  }

  change(type: string){
    switch(type){
      case 'line':
        this.type = this.linetype;
        break;
      case 'bar':
        this.type = this.bartype;
        break;
      case 'doughnut':
        this.type = this.doughnutype;
        break;
      case 'radar':
        this.type = this.radartype;
        break;
      case 'pie':
        this.type = this.pietype;
        break;
      default:
        break;
    }

    if(this.chart != null){
      this.chart.destroy();
    }

    this.draw();
  }

  draw() {
    this.mailService.callProcedureOrFunction().subscribe(data => {
      const dates = data.map(x => x.maildate);
      const quantities = data.map(x => x.quantity);
      //console.log(dates);
      //console.log(quantities);

      this.chart = new Chart('canvas', {
        type: this.type,
        data: {
          labels: dates,
          datasets: [{
            label: 'Quantity',
            data: quantities,
            borderColor: '#3cba9f',
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 0, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 1
          },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
              beginAtZero: true
            },
          }
        },
      });
    });
  }

}

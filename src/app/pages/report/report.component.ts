import { ChartType, TypedRegistry } from './../../../../node_modules/chart.js/dist/types/index.d';
import { Component, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MailService } from '../../../service/mail.service';
import { Chart} from 'chart.js/auto';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  imports: [MaterialModule, PdfViewerModule],
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

  pdfSrc: string;
  fileName: string;

  selectedFiles: FileList;

  imageData: any;

  imageSignal = signal(null);

  constructor(
    private mailService: MailService,
    private sanitizer: DomSanitizer
  ) {

  }
  ngOnInit(): void {
    this.draw();
  }

  // Casos para cambiar el estilo del dasboard
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

  //Ver reporte PDF
  viewReport(){
    this.mailService.generateReport().subscribe(data =>{
      this.pdfSrc = window.URL.createObjectURL(data);
    });
  }
  //Descargar reporte en PDF
  downloadReport(){
    this.mailService.generateReport().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      //console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display: none');
      document.body.appendChild(a);
      a.href = url;
      a.download ='report.pdf';
      a.click();
    });
  }

  //Dibujar dashboard
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

  //imagenes
  selectFile(e: any){
    this.fileName = e.target.files[0]?.name;
    this.selectedFiles = e.target.files;
  }

  upload(){
    this.mailService.saveFile(this.selectedFiles.item(0)).subscribe();
  }

  viewImage(){
    this.mailService.readFile(2).subscribe(data => {
      this.convertToBase64(data);
    });
  }

  convertToBase64(data: any){
    const reader = new FileReader();
    reader.readAsDataURL(data)
    reader.onloadend = () => {
      const base64 = reader.result;
      //console.log(base64);
      this.applySanitizer(base64);
    };
  }

  applySanitizer(base64: any){
    this.imageData = this.sanitizer.bypassSecurityTrustResourceUrl(base64);
    this.imageSignal.set(this.imageData);
  }

}

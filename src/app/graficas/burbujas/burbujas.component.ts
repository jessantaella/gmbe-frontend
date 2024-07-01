import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';


declare var ApexCharts: any;

@Component({
  selector: 'app-burbujas',
  templateUrl: './burbujas.component.html',
  styleUrls: ['./burbujas.component.scss']
})
export class BurbujasComponent implements AfterViewInit {
  @ViewChild("chart") chart: any;
  public chartOptions: any;
  isBrowser = false;



  constructor( @Inject(PLATFORM_ID) private platformId: any) {
   
  }


  ngAfterViewInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.chartOptions = {
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },   
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      series: [
        {
          name: "Bubble1",
          data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: "Bubble2",
          data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: "Bubble3",
          data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: "Bubble4",
          data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60
          })
        }
      ],
      chart: {
        height: 150,
        width: 150,
        type: "bubble",
        toolbar: {
          show: false
        },
        background: 'transparent', // Cambia el fondo a transparente
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 0.8
      },
      title: {
        text: ""
      },
      xaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      },
      yaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        
        max: 70
      },
      legend: {
        show: false // Oculta las leyendas del gráfico
      }
    };
    if(this.isBrowser)
    {
      // Espera a que el DOM esté completamente cargado antes de intentar renderizar el gráfico
    document.addEventListener('DOMContentLoaded', () => {
      const chart = new ApexCharts(document.querySelector('#chart'), this.chartOptions);
      chart.render();
    });
    }
  }

  public generateData(baseval: number, count: number, yrange: { min: any; max: any; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}

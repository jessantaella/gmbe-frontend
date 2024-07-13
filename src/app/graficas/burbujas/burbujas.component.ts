import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";

declare var ApexCharts: any;

@Component({
  selector: "app-burbujas",
  templateUrl: "./burbujas.component.html",
  styleUrls: ["./burbujas.component.scss"],
})
export class BurbujasComponent implements AfterViewInit {
  @ViewChild("chartContainer", { static: false }) chartContainer: ElementRef | undefined;
  @Input() chartId: string | undefined; // Input property to accept dynamic ID

  public chartOptions: any;
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.chartOptions = this.getCharOptions();
    if (this.isBrowser) {
      setTimeout(() => {
        const chart = new ApexCharts(this.chartContainer?.nativeElement, this.chartOptions);
        chart.render();
      }, 0);
    }
  }


  getCharOptions(){
    return {
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      series: [
        {
          name: "Gpo:156",
          data: [this.generateBubbleData(6)],
        },
        {
          name: "otro",
          data: [this.generateBubbleData(12)],
        },
        {
          name: "otro",
          data: [this.generateBubbleData(16)],
        },
        {
          name: "otro",
          data: [this.generateBubbleData(6)],
        },
        {
          name: "otro",
          data: [this.generateBubbleData(20)],
        },

        /*{
          name:'Gpo:158',
          data:[{x:5,y:30,z:10}]
        }*/
      ],
      chart: {
        height: 100,
        width: 150,
        type: "bubble",
        toolbar: {
          show: false,
        },
        background: "transparent", // Cambia el fondo a transparente
        zoom: {
          enabled: false, // Deshabilita el zoom
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 0.8,
      },
      title: {
        text: "",
      },
      xaxis: {
        min: 0, // Define el valor mínimo del eje x
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0, // Define el valor mínimo del eje y
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

      legend: {
        show: false, // Oculta las leyendas del gráfico
      },
      tooltip: {
        enabled: false, // Deshabilita el tooltip
      },
    };
  }

  generateBubbleData(z: number): { x: number; y: number; z: number } {
    const xMargin = z; // Margen para centrar las burbujas en el eje x
    const yMargin = z; // Margen para centrar las burbujas en el eje y
    const chartWidth = 50;
    const chartHeight = 50;
    const x = xMargin + Math.random() * (chartWidth - 2 * xMargin); // Genera un valor x dentro de los márgenes
    const y = yMargin + Math.random() * (chartHeight - 2 * yMargin); // Genera un valor y dentro de los márgenes
    /*var x = Math.floor(Math.random() * (750 - 50 + 1)) + 50;
    x = (x+z) > 250 ? x-z : x;

    
    var y = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    y = y+z > 30 ? y - (z+10) : y;

    y = y < 2 ? y+ (z+10) : y;

    console.log({ x, y, z });*/
    return { x, y, z };
  }
}

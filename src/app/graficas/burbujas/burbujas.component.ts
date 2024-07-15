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
    const seriesData = [
      this.generateBubbleData(6),
      this.generateBubbleData(12),
      this.generateBubbleData(16),
      this.generateBubbleData(6),
      this.generateBubbleData(20)
    ];

    // Calcular los límites de los ejes basados en los valores de las burbujas
    const maxX = Math.max(...seriesData.map(d => d.x + d.z));
    const maxY = Math.max(...seriesData.map(d => d.y + d.z));
    const minX = Math.min(...seriesData.map(d => d.x - d.z));
    const minY = Math.min(...seriesData.map(d => d.y - d.z));

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
          data: [seriesData[0]],
        },
        {
          name: "otro",
          data: [seriesData[1]],
        },
        {
          name: "otro",
          data: [seriesData[2]],
        },
        {
          name: "otro",
          data: [seriesData[3]],
        },
        {
          name: "otro",
          data: [seriesData[4]],
        },
      ],
      chart: {
        responsive: true,
        height: 150,
        width: 200,
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
        min: minX, // Define el valor mínimo del eje x basado en los datos
        max: maxX, // Define el valor máximo del eje x basado en los datos
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
        min: minY, // Define el valor mínimo del eje y basado en los datos
        max: maxY, // Define el valor máximo del eje y basado en los datos
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
    const chartWidth = 200;
    const chartHeight = 150;
    const x = Math.random() * chartWidth; // Genera un valor x dentro del ancho del gráfico
    const y = Math.random() * chartHeight; // Genera un valor y dentro de la altura del gráfico
    return { x, y, z };
  }
}

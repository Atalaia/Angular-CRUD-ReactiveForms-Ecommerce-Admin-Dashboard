import { Component, OnInit } from '@angular/core';
import { SaleService } from '../Service/sale.service';

@Component({
  selector: 'app-sales-charts',
  templateUrl: './sales-charts.component.html',
  styleUrls: ['./sales-charts.component.scss']
})
export class SalesChartsComponent implements OnInit {

  private salesData = [];
  private saleBarChartData = [];

  constructor(
    private saleService: SaleService
  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [];

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.saleService.getSales()
    .subscribe(data => {
      this.salesData = data;
      // console.log(this.salesData);
      this.setBarChartLabels();
      this.setBarChartData();
    });
  }
  
  setBarChartLabels() {
    this.salesData.forEach((v, i) => {
      const productName = this.salesData[i].product.name;
      // console.log(productName);
      if(!this.barChartLabels.includes(productName)) {
        this.barChartLabels.push(productName);
        // console.log(this.barChartLabels);
      }
    });
  }

  setBarChartData() {   
    this.salesData.forEach((v, i) => {
      const productPrice = this.salesData[i].product.price;
      const quantity = this.salesData[i].quantity;
      const saleValue = productPrice * quantity;
      console.log(saleValue);
      this.saleBarChartData.push(saleValue);
      console.log(this.saleBarChartData);
    });
    this.barChartData.push({data: this.saleBarChartData, label: 'Product Sales'});
    console.log(this.barChartData);
  }

}

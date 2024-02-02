import {
  NgModule,
  Component,
  ViewChild,
  enableProdMode,
  OnInit,
} from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Order, Service } from './app.service';
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'demo-app',
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true,
})
export class AppComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  orders: any;
  showFilterRow: any;
  showHeaderFilter: any;
  applyFilterTypes: any;
  saleAmountHeaderFilter: any;
  currentFilter: any;

  constructor(private service: Service, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.showFilterRow = true;
    this.showHeaderFilter = true;
    this.applyFilterTypes = [
      {
        key: 'auto',
        name: 'Immediately',
      },
      {
        key: 'onClick',
        name: 'On Button Click',
      },
    ];
    this.currentFilter = this.applyFilterTypes[0].key;

    this.service.getOrders().subscribe((data) => {
      this.orders = data;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }
  handleActiveClick(data: any) {
    // Handle "Active" button click
  }

  handleInactiveClick(data: any) {
    // Handle "Inactive" button click
  }

  handleOtherClick(data: any) {
    // Handle "Other" button click
  }
  getStatusButtonColor(status: string, targetStatus: string): string {
    return status === targetStatus ? 'green' : 'dimgray';
  }

  getStatusBackgroundColor(status: string): string {
    console.log('Status:', status);

    switch (status) {
      case 'Active':
        return 'green';
      case 'Inactive':
        return 'yellow';
      case 'Delete':
        return 'red';
      default:
        return '';
    }
  }

  private static getOrderDay(orderDate: string | number | Date) {
    return new Date(orderDate).getDay();
  }

  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }
}
@NgModule({
  imports: [
    BrowserModule,
    BrowserTransferStateModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    HttpClientModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

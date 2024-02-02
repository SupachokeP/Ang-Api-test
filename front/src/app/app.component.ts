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
  DxButtonModule,
} from 'devextreme-angular';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Order, Service, DataService } from './app.service';
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
import { ChangeDetectorRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'demo-app',
  providers: [Service, DataService],
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

  constructor(
    private service: Service,
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {}

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
  private refreshData(): void {
    this.service.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  onAButtonClick(event: any): void {
    const productId = event?.row?.data?.productId;
    const status = 'Active';

    this.dataService.updateStatus(productId, status).subscribe({
      next: (response) => {
        console.log('Status updated successfully:', response);
        console.log('fetch data');
        this.refreshData();
      },
      error: (error) => {
        console.error('Error updating status:', error);
        this.refreshData();
      },
      complete: () => {
        console.log('Subscription completed');
      },
    });
  }

  onIButtonClick(event: any): void {
    console.log(event);
    const productId = event?.row?.data?.productId;
    const status = 'Inactive';
    console.log(productId);
    this.dataService.updateStatus(productId, status).subscribe(
      (response) => {
        console.log('Status updated successfully:', response);
        console.log('fetch data');
        this.refreshData();
      },
      (error) => {
        console.error('Error updating status:', error);
        this.refreshData();
      },
      () => {
        console.log('Subscription completed');
      }
    );
  }
  onDButtonClick(event: any): void {
    console.log(event);
    const productId = event?.row?.data?.productId;
    const status = 'Delete';
    console.log(productId);
    this.dataService.updateStatus(productId, status).subscribe(
      (response) => {
        console.log('Status updated successfully:', response);
        console.log('fetch data');
        this.refreshData();
      },
      (error) => {
        console.error('Error updating status:', error);
        this.refreshData();
      },
      () => {
        console.log('Subscription completed');
      }
    );
  }
  okClicked(event: any) {
    console.log(event);
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
  doneClick() {
    notify('The Done button was clicked');
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
    DxButtonModule,
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

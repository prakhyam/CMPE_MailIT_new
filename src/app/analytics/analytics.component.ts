import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from '../services/api.service';

interface DeliveryBreakdown {
  open: number;
  delivered: number;
  sent: number;
  other: number;
}

interface SuccessFailureData {
  successCount: number;
  failureCount: number;
  total: number;
}


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  // public pieChartLabels: Label[] = ['Open', 'Delivered', 'Sent', 'Other'];
  // public pieChartData: number[] = [];
  // public pieChartType: ChartType = 'pie';

  public pieChartLabels = ['A', 'B', 'C'];
  public pieChartData = [300, 50, 100];
  public pieChartType = 'pie';

  public barChartLabels = ['Label 1'];
  public barChartData = [
      { data: [100], label: 'Series A' }
  ];
  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] },
  };
  // public barChartLabels: Label[] = ['Success', 'Failure'];
  // public barChartType: ChartType = 'bar';
  // public barChartData: ChartDataSets[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.loadChartData();
    
    
  }
  private loadChartData() {
    const campaignId = this.route.snapshot.paramMap.get('id');
  
    // Fetch Delivery Breakdown
    this.apiService.getDeliveryBreakdown(campaignId).subscribe((response: any) => {
      const data: DeliveryBreakdown = response; // Assuming the response has the correct shape
      this.pieChartData = [data.open, data.delivered, data.sent, data.other || 0];
      console.log(this.pieChartData);
    }, error => {
      console.error('Error fetching delivery breakdown data:', error);
    });
  
    // Fetch Success-Failure Breakdown
    this.apiService.getSuccessFailureBreakdown(campaignId).subscribe((response: any) => {
      const data: SuccessFailureData = response; // Assuming the response has the correct shape
      this.barChartData = [
        { data: [data.successCount], label: 'Success' },
        { data: [data.failureCount], label: 'Failure' }
      ];
      console.log(this.barChartData);
    }, error => {
      console.error('Error fetching success-failure breakdown data:', error);
    });
  }
}
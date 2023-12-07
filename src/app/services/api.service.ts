import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DeliveryBreakdown {
  category: string;
  value: number;
}

interface SuccessFailureData {
  label: string;
  values: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getDeliveryBreakdown(campaignId: string): Observable<DeliveryBreakdown> {
    return this.http.get<DeliveryBreakdown>(`https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/campaigns/${campaignId}/analytics/delivery-breakdown`);
  }
  
  getSuccessFailureBreakdown(campaignId: string): Observable<SuccessFailureData> {
    return this.http.get<SuccessFailureData>(`https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/campaigns/${campaignId}/analytics/success-failure-breakdown`);
  }

  getCampaignById(campaignId: string): Observable<any> {
    return this.http.get(`/campaigns/${campaignId}`);
  }
}

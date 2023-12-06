import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  campaigns: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Change as needed
  totalCampaigns: number = 0;
  Math: any = Math;

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchCampaigns(this.currentPage, this.pageSize );
  }

  navigateToCreateCampaign() {
    this.router.navigate(['/create-campaign']); // Adjust the route as per your app's routing configuration
  }

  goToCampaignAnalytics(campaignId: number) {
    // Navigate to the campaign's analytics dashboard
    // Adjust the path according to your routing configuration
    this.router.navigate(['/campaign-analytics', campaignId]);
  }


  fetchCampaigns(page: number, pageSize: number) {
    const fetchapiUrl='https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/campaigns';
   this.http.get<any>(fetchapiUrl).subscribe(
      (response) => {
        this.campaigns = response; // Adjust according to your API response structure
        this.totalCampaigns = this.campaigns.length; // Total number of campaigns, for pagination calculation
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchCampaigns(this.currentPage, this.pageSize);
  }
  publishCampaign(campaign: any) {
    if (campaign.isActive) {
      const apiUrl = `https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/schedulers/schedule-campaign/${campaign.id}`;
      this.http.post(apiUrl,null).subscribe(
        (response) => {
          console.log('Campaign published:', response);
          // Handle successful publishing here (e.g., show a success message)
        },
        (error) => {
          console.error('Error publishing campaign:', error);
          // Handle errors here (e.g., show an error message)
        }
      );
    }
    else{
      const apiUrl = `https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/schedulers/unschedule-campaign/${campaign.id}`;
      this.http.post(apiUrl,null).subscribe(
        (response) => {
          console.log('Campaign published:', response);
          // Handle successful publishing here (e.g., show a success message)
        },
        (error) => {
          console.error('Error publishing campaign:', error);
          // Handle errors here (e.g., show an error message)
        }
      );
    }
  }
  archiveCampaign(campaign: any) {
    const archiveApiUrl = `https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/campaigns/archive/${campaign.id}`;
    this.http.post(archiveApiUrl, null).subscribe(
      (response) => {
        console.log('Campaign archived:', response);
        // Handle successful archiving here (e.g., show a success message or refresh the list)
        this.fetchCampaigns(this.currentPage, this.pageSize);
         this.toastr.success('Campaign successfully archived', 'Success'); 
      },
      (error) => {
        console.error('Error archiving campaign:', error);
        // Handle errors here (e.g., show an error message)
      }
    );
  }

  approveCampaign(campaign: any) {
    const approveApiUrl = `https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/campaigns/approve/${campaign.id}`;
    this.http.post(approveApiUrl, null).subscribe(
      (response) => {
        console.log('Campaign approved:', response);
        // Handle successful approval here (e.g., show a success message or update the status)
      },
      (error) => {
        console.error('Error approving campaign:', error);
        // Handle errors here (e.g., show an error message)
      }
    );
  }

  executeCampaignNow(campaign: any) {
    const executeCampaignNowUrl = `https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/schedulers/execute-campaign-now/${campaign.id}`;
    this.http.post(executeCampaignNowUrl, null).subscribe(
      (response) => {
        console.log('Campaign Executing Now:', response);
        this.fetchCampaigns(this.currentPage, this.pageSize);
        // Handle successful archiving here (e.g., show a success message or refresh the list)
      },
      (error) => {
        console.error('Error Executing Campaign:', error);
        // Handle errors here (e.g., show an error message)
      }
    );
  }
}

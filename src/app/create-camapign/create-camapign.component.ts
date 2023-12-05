import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-camapign',
  templateUrl: './create-camapign.component.html',
  styleUrls: ['./create-camapign.component.css']
})
export class CreateCamapignComponent implements OnInit {

  campaign = {
    title: '',
    about: '',
    start_at: '',
    end_at: '',
    repeat_period: 'P1Y6M4DT1230M5S',
    sendgrid_domain: ['gmail.com'],
    repeat_threshold: 0,
    sql: '',
    mail: {
      subject: '',
      content: '',
      content_type: 'html',
      from: { name: '', email: '' },
      reply_to: { name: '', email: '' }
    }
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'https://40e2-2601-646-a100-cbf0-9cd8-4759-366f-faf1.ngrok-free.app/campaigns';
    this.http.post(apiUrl, this.campaign).subscribe(
      response => {
        console.log('Campaign created:', response);
        // Handle the response (e.g., redirecting to the campaign list or showing a success message)
      },
      error => {
        console.error('Error creating campaign:', error);
        // Handle the error (e.g., showing an error message to the user)
      }
    );
  }

  ngOnInit(): void {
  }

}

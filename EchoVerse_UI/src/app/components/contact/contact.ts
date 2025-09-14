import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log('Contact form submitted:', this.contactForm);
    // Here you would typically send the form data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    this.contactForm = { name: '', email: '', subject: '', message: '' };
  }
}

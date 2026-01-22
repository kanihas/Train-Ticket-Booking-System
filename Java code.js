document.addEventListener('DOMContentLoaded', function() {
 const bookingForm = document.getElementById('booking-form');
 const ticketInfo = document.getElementById('ticket-info');
 bookingForm.addEventListener('submit', function(event) {
 event.preventDefault();
 const formData = new FormData(bookingForm);
 const from = formData.get('from');
 const to = formData.get('to');
 const date = formData.get('date');
 const passengers = formData.get('passengers');
 // Simulate ticket booking process
 ticketInfo.innerHTML = `
17
 <h2>Booking Confirmation</h2>
 <p>From: ${from}</p>
 <p>To: ${to}</p>
 <p>Date: ${date}</p>
 <p>Passengers: ${passengers}</p>
 `;
 });
 document.getElementById('booking-form').addEventListener('submit', function(e) 
{
 e.preventDefault();
 const from = document.getElementById('from').value;
 const to = document.getElementById('to').value;
 const date = document.getElementById('date').value;
 const seat = document.getElementById('seat').value;
 const results = [
 { train: 'Express 101', time: '09:00', price: '₹500' },
 { train: 'Superfast 202', time: '13:30', price: '₹650' }
 ];
 let html = '<h3>Available Trains</h3>';
 results.forEach((r, i) => {
 html += `<div class="ticket">
 <strong>${r.train}</strong> - ${r.time} - ${r.price}
 <button 
onclick="bookTicket('${r.train}','${from}','${to}','${date}','${seat}','${r.time}','${r.
price}')">Book</button>
 </div>`;
 });
18
 document.getElementById('search-results').innerHTML = html;
 });
 window.bookTicket = function(train, from, to, date, seat, time, price) {
 if (!seat) {
 alert('Please select a seat.');
 return;
 }
 const ticket = { train, from, to, date, seat, time, price };
 let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
 tickets.push(ticket);
 localStorage.setItem('tickets', JSON.stringify(tickets));
 loadTickets();
 alert('Ticket booked!');
 };
 function loadTickets() {
 let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
 let html = '';
 tickets.forEach((t, i) => {
 html += `<div class="ticket">
 <strong>${t.train}</strong> (${t.from} → ${t.to})<br>
 Date: ${t.date}, Time: ${t.time}, Seat: <b>${t.seat}</b>, Price: ${t.price}
 <button onclick="showModal(${i})">Details</button>
 <button class="cancel-btn" onclick="cancelTicket(${i})">Cancel & 
Refund</button>
 </div>`;
19
 });
 document.getElementById('ticket-list').innerHTML = html || '<em>No tickets 
booked yet.</em>';
 }
 window.cancelTicket = function(index) {
 let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
 const ticket = tickets[index];
 if (confirm(Are you sure you want to cancel your ticket for ${ticket.train}?)) {
 tickets.splice(index, 1);
 localStorage.setItem('tickets', JSON.stringify(tickets));
 loadTickets();
 showToast(Your ticket has been cancelled. Refund of ${ticket.price} will be 
processed.);
 }
 };
 function showToast(message) {
 const toast = document.getElementById('toast');
 toast.textContent = message;
 toast.className = "show";
 setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 
3000);
 }
 window.showModal = function(index) {
 let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
21
 const t = tickets[index];
 document.getElementById('modal-details').innerHTML = `
 <h3>${t.train}</h3>
 <p><strong>From:</strong> ${t.from}</p>
 <p><strong>To:</strong> ${t.to}</p>
 <p><strong>Date:</strong> ${t.date}</p>
 <p><strong>Time:</strong> ${t.time}</p>
 <p><strong>Price:</strong> ${t.price}</p>
 `;
 document.getElementById('ticket-modal').style.display = 'flex';
 };
 document.getElementById('close-modal').onclick = function() {
 document.getElementById('ticket-modal').style.display = 'none';
 };
 window.onclick = function(event) {
 const modal = document.getElementById('ticket-modal');
 if (event.target === modal) {
 modal.style.display = 'none';
 }
 };
 // Personalized Greeting
 function setGreeting() {
 let name = localStorage.getItem('username');
 if (!name) {
 name = prompt('Welcome! Please enter your name:');
22
 if (name) localStorage.setItem('username', name);
 }
 document.getElementById('greeting').textContent = name ? Hello, ${name}! : '';
 }
 // Theme Switcher
 document.getElementById('theme-toggle').onclick = function() {
 document.body.classList.toggle('dark');
 localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 
'light');
 };
 // Load theme on page load
 (function() {
 if (localStorage.getItem('theme') === 'dark') {
 document.body.classList.add('dark');
 }
 setGreeting();
 })();
 loadTickets();
 // SPA Navigation
 document.querySelectorAll('.nav-link').forEach(link => {
 link.addEventListener('click', function(e) {
 e.preventDefault();
 document.querySelectorAll('.nav-link').forEach(l
23
=> l.classList.remove('active'));
 this.classList.add('active');
 const target = this.getAttribute('href').replace('#','');
 document.querySelectorAll('.page-section').forEach(sec => 
sec.classList.remove('active'));
document.getElementById(target).classList.add('active');
 });
 });
})
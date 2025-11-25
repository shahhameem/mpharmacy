import { useState } from 'react';
import DocProfile from './DocProfile';

const docs = [{
  id: 1,
  name: "Dr. Humaira",
  speciality: "General Physician",
  timing: "Mon - Fri: 5pm - 8pm Sat - Sun: 10am - 8pm",
  fee: "Free Consultation",
  img: "https://i.ibb.co/0VhxynxN/drF.png"
},
{
  id: 2,
  name: "Dr. Imtiaz",
  speciality: "Orthopedic",
  timing: "Monday: 11am - 2pm",
  fee: "₹ 500",
  img: "https://i.ibb.co/PZstjMQ7/Face.jpg"
},
];

const AppointmentSection = () => {
  // State to hold which doctor is selected
  const [selectedDoctor, setSelectedDoctor] = useState({ name: '', timing: '' });
  const [patientData, setPatientData] = useState({ name: '', phone: '', email: '' });

  // Function to handle "Book Now" click
  const handleBookClick = (name, timing) => {
    setSelectedDoctor({ name, timing });
  };

  const handleInputChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const sendWhatsApp = () => {
    const text = `*New Appointment Request*\n\n*Doctor:* ${selectedDoctor.name}\n*Timing:* ${selectedDoctor.timing}\n\n*Patient:* ${patientData.name}\n*Phone:* ${patientData.phone}\n*Email:* ${patientData.email}`;
    window.open(`https://wa.me/919682586995?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Book an Appointment</h2>
          <div className="row g-4">
            
            {/* Doctor 1 */}
            {docs.map((doc) => (
              <DocProfile 
                key={doc.id}
                timing={doc.timing}
                name={doc.name}
                speciality={doc.speciality}
                fee={doc.fee}
                img={doc.img}
                onBook={handleBookClick}
                />
            ))}

          </div>
        </div>
      </section>

      {/* --- APPOINTMENT MODAL --- */}
      <div className="modal fade" id="appointmentModal" tabIndex="-1" aria-labelledby="appointmentModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="appointmentModalLabel">Book Appointment</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>You are booking with: <br/><strong className="text-primary">{selectedDoctor.name}</strong></p>
              <form>
                <div className="mb-3">
                  <label htmlFor="patientName" className="form-label">Your Full Name:</label>
                  <input type="text" className="form-control" name="name" onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="patientPhone" className="form-label">Your WhatsApp Number:</label>
                  <input type="tel" className="form-control" name="phone" onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="patientEmail" className="form-label">Email (Optional):</label>
                  <input type="email" className="form-control" name="email" onChange={handleInputChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-secondary">Send via Email</button>
              <button type="button" className="btn btn-primary" onClick={sendWhatsApp}>Send via WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentSection;
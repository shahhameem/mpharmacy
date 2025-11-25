const DocProfile = ({name, speciality, timing, img, fee, onBook}) => {
  return (
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 aero-card">
                <img src={img} className="card-img-top doctor-img" height="250vh" alt={name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{name}</h5>
                  <h6 className="card-subtitle mb-2 text-primary">{speciality}</h6>
                  <ul className="list-group list-group-flush my-3">
                    <li className="list-group-item"><strong>Timings:</strong> {timing.slice(0, 21)} <br />{timing.length > 20? timing.slice(21): ""}</li>
                    <li className="list-group-item"><strong>Fee:</strong> {fee}</li>
                  </ul>
                  <button 
                    className="btn btn-secondary mt-auto" 
                    data-bs-toggle="modal" 
                    data-bs-target="#appointmentModal"
                    onClick={() => onBook(`${name} : ${speciality}`, `${timing}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
  )
}

export default DocProfile;
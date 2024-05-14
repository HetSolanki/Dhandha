import "./Style/model.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../../node_modules/bootstrap/dist/js/bootstrap";

export default function Success() {
  return (
    <>
      <main className="cd__main">
        <div className="container  p-5">
          <div className="row">
            <div
              className="modal fade transition-all"
              id="statusSuccessModal"
              tabIndex="-1"
              role="dialog"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body text-center p-lg-4">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 130.2 130.2"
                    >
                      <circle
                        className="path circle"
                        fill="none"
                        stroke="#198754"
                        strokeWidth="6"
                        strokeMiterlimit="10"
                        cx="65.1"
                        cy="65.1"
                        r="62.1"
                      />
                      <polyline
                        className="path check"
                        fill="none"
                        stroke="#198754"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        points="100.2,40.2 51.5,88.8 29.8,67.5 "
                      />
                    </svg>
                    <h4 className="text-success mt-3">Oh Yeah!</h4>
                    <p className="mt-3">You Have Successfully Registered.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

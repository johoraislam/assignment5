document.addEventListener("DOMContentLoaded", function () {
  const newDiv = document.createElement("div");

 newDiv.innerHTML = `
    <div id="modal" class="fixed inset-0 bg-opacity-50 w-full h-full flex justify-center items-center hidden">
        <div class="bg-gray-200 rounded-lg p-8 w-full container mx-auto text-center text-black">
            <h1 class="text-5xl font-bold mb-4">Nilaboti Poribohon</h1>
            <p>
                Yes, you can run unit tests and view the results directly within the
                app. The integrated testing features allow for a streamlined
            </p>
            <div class="flex justify-between items-start mt-8">
                <div id="seat-selection" class="flex-[3]">
                    <h2 class="text-2xl mb-4">Select Your Seat</h2>
                    <div id="seat-plan-container" class="grid grid-cols-5 gap-2"></div>
                </div>
                <div id="passenger-info" class="bg-gray-200 p-4 flex-[2]">
                    <h2 class="text-2xl mb-4">Passenger Information</h2>
                    <input type="text" id="passenger-name" placeholder="Name" class="mb-2 w-full px-2 py-1 border rounded-md">
                    <input type="email" id="passenger-email" placeholder="Email" class="mb-2 w-full px-2 py-1 border rounded-md">
                    <input type="tel" id="passenger-phone" placeholder="Phone Number" class="mb-2 w-full px-2 py-1 border rounded-md">
                     <!-- Coupon Field and Button -->
                    <div class="flex ">
                    <input type="text" id="coupon-code" placeholder="Enter Coupon Code" class="mb-2 w-full px-2 py-1 border rounded-md">
                    <button id="apply-coupon" class="btn btn-primary mb-2">
                        Apply Coupon
                    </button>
                    </div>
                    <h3 class="text-2xl" id="selected-seat-info">No seat selected</h3>
                    <p class="text-2xl" id="total-price-info">Total Price: 0 taka</p>

                   

                    <button id="submit" class="btn btn-success">
                        Submit
                    </button>
                    <button id="close-modal" class="btn btn-error">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="confirmation-modal" class="fixed inset-0 bg-opacity-50 w-1/4 container mx-auto h-full flex justify-center items-center hidden">
        <div class="bg-white  rounded-lg p-8 w-full container mx-auto text-center text-green-500">
            <h1 class="text-3xl font-bold mb-4">Booking Success!</h1>
            <p>Thank you for Booking Our Bus Seats. 
           We are working hard to find the best service and deals for you.</p>
            <button id="close-confirmation-modal" class="btn btn-success mt-4">Continue...</button>
        </div>
    </div>`;


  newDiv.id = "dynamic-div";

  document.body.appendChild(newDiv);

  const selectSeatButton = document.getElementById("select-seat");

  const modal = document.getElementById("modal");


  const closeButton = document.getElementById("close-modal");

  const seatPlanContainer = document.getElementById("seat-plan-container");

  const bookedSeats = new Set();

  function generateSeatPlan() {
    seatPlanContainer.innerHTML = "";
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let row of rows) {
      for (let i = 1; i <= 5; i++) {
        const seatNumber = row + i;
        const seat = document.createElement("div");
        seat.textContent = seatNumber;
        seat.classList.add("seat");
        if (bookedSeats.has(seatNumber)) {
          seat.classList.add("booked");
          seat.setAttribute("disabled", "disabled");
        } else {
          seat.addEventListener("click", function () {
            if (bookedSeats.has(seatNumber)) {
              bookedSeats.delete(seatNumber);
              seat.classList.remove("booked");
              seat.removeAttribute("disabled"); 
            } else {
              bookedSeats.add(seatNumber);
              seat.classList.add("booked");
              seat.setAttribute("disabled", "disabled"); 
            }
            updateSelectedSeatInfo();
          });
        }
        seatPlanContainer.appendChild(seat);
      }
    }
  }

  function updateSelectedSeatInfo() {
    const selectedSeatInfo = document.getElementById("selected-seat-info");
    const totalSeatPriceInfo = document.getElementById("total-price-info");
    const selectedSeatsCount = bookedSeats.size;
    let totalPrice = 0;

    if (selectedSeatsCount === 1) {
      totalPrice = 550 * 0.85;
    } else if (selectedSeatsCount >= 2) {
      totalPrice = selectedSeatsCount * 550 * 0.8;
    }

    selectedSeatInfo.textContent = `${selectedSeatsCount} seat(s) selected`;
    totalSeatPriceInfo.textContent = `Total Price: ${totalPrice} taka`;
  }

  selectSeatButton.addEventListener("click", function () {
    generateSeatPlan();
    modal.classList.remove("hidden");
  });

  closeButton.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  const submitButton = document.getElementById("submit");

  const confirmationModal = document.getElementById("confirmation-modal");

  const closeConfirmationButton = document.getElementById(
    "close-confirmation-modal"
  );

  submitButton.addEventListener("click", function () {
    const passengerName = document
      .getElementById("passenger-name")
      .value.trim();
    const passengerEmail = document
      .getElementById("passenger-email")
      .value.trim();
    const passengerPhone = document
      .getElementById("passenger-phone")
      .value.trim();

    if (bookedSeats.size === 0) {
      alert("Please select at least one seat.");
      return; 
    }

    if (passengerName && passengerEmail && passengerPhone) {
      confirmationModal.classList.remove("hidden");
    } else {
      alert("Please fill out all fields.");
    }
  });

  closeConfirmationButton.addEventListener("click", function () {
    confirmationModal.classList.add("hidden");
  });
});

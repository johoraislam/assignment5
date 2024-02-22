document.addEventListener("DOMContentLoaded", function () {
  const newDiv = document.createElement("div");

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


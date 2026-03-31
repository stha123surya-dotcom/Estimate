const roomData = {
    bedroom: { size: 120, label: "Bedroom" },
    toilet: { size: 36, label: "Toilet" },
    attachedToilet: { size: 33, label: "Attached Toilet" },
    staircase: { size: 97.5, label: "Staircase" },
    kitchenDining: { size: 195, label: "Kitchen Dining" },
    porch: { size: 168, label: "Porch" },
    balcony: { size: 18, label: "Balcony" },
    laundry: { size: 30, label: "Laundry" }
};

// GENERATE FLOORS
function generateFloors() {
    const count = document.getElementById("floorCount").value;
    const container = document.getElementById("floors-container");

    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {

        let roomsHTML = "";

        for (let key in roomData) {
            roomsHTML += `
                <div class="room-box">
                    <label>${roomData[key].label}</label>
                    <span>${roomData[key].size} sq.ft</span>
                    <input type="number" min="0" value="0" 
                    id="${key}_${i}" oninput="calculateAll()">
                </div>
            `;
        }

        container.innerHTML += `
            <div class="floor">
                <h3>Floor ${i}</h3>
                <div class="room-grid">${roomsHTML}</div>
                <p class="floor-result">Area: 
                    <span id="floor${i}">0</span> sq.ft
                </p>
            </div>
        `;
    }

    calculateAll();
}

// CALCULATE
function calculateFloor(floor) {
    let total = 0;

    for (let key in roomData) {
        let val = parseInt(document.getElementById(`${key}_${floor}`)?.value) || 0;
        total += val * roomData[key].size;
    }

    total += total * 0.20; // lobby

    document.getElementById(`floor${floor}`).innerText = total.toFixed(0);

    return total;
}

function calculateAll() {
    const count = document.getElementById("floorCount").value;
    let totalArea = 0;

    for (let i = 1; i <= count; i++) {
        totalArea += calculateFloor(i);
    }

    const rate = document.getElementById("costType").value;
    const totalCost = totalArea * rate;

    document.getElementById("totalArea").innerText =
        totalArea.toLocaleString() + " sq.ft";

    document.getElementById("totalCost").innerText =
        "Rs. " + totalCost.toLocaleString();
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("floorCount").addEventListener("input", generateFloors);
    document.getElementById("costType").addEventListener("change", calculateAll);

    generateFloors();
});
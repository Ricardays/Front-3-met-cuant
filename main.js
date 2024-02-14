
// Initialize current CMYK and plate quantity levels
let currentCmykLevel = 1000;
let currentPlateQuantity = 100;

let lowCmykLevels= 100;
let lowPlateLevels= 10;

document.getElementById('cmyk-level').value = currentCmykLevel;
document.getElementById('plate-quantity').value = currentPlateQuantity;


// Function to update inventory levels
function updateInventory(cmykAmount, plateAmount) {
    currentCmykLevel += parseInt(cmykAmount);
    currentPlateQuantity += parseInt(plateAmount);
    if (currentCmykLevel < 0) currentCmykLevel = 0;
    if (currentPlateQuantity < 0) currentPlateQuantity = 0; 
    document.getElementById('cmyk-level').value = currentCmykLevel;
    document.getElementById('plate-quantity').value = currentPlateQuantity;
}

document.addEventListener('DOMContentLoaded', function() {

    // Event listener for the "Low Consumption" button
    document.getElementById('low-btn').addEventListener('click', function() {
        var cmykConsumption = getRandomInt(20, 60);
        var plateConsumption = getRandomInt(10, 15);
        updateInventory(-cmykConsumption, -plateConsumption);
        checkLowInventory();
    });

    // Event listener for the "High Consumption" button
    document.getElementById('high-btn').addEventListener('click', function() {
        var cmykConsumption = getRandomInt(100, 150);
        var plateConsumption = getRandomInt(20, 35);
        updateInventory(-cmykConsumption, -plateConsumption);
        checkLowInventory();
    });
});

// Add event listener to the document for dynamically added complete buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('complete-order')) {
        var listItem = event.target.closest('.list-group-item');
        var orderDetails = listItem.textContent.trim().split(',');
        var cmykAmount = orderDetails[0].replace('CMYK Ink: ', '').trim();
        var plateAmount = orderDetails[1].replace('Plate: ', '').trim();

        console.log(cmykAmount);
        console.log(plateAmount);

        // Update inventory levels
        updateInventory(cmykAmount, plateAmount);

        // Remove the completed order from the list
        listItem.remove();
        disableConsumption(false);
    }
});

// JavaScript code to handle form submission and update purchase orders
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var cmykOrder = document.getElementById('cmyk-order').value;
    var plateOrder = document.getElementById('plate-order').value;
    if (cmykOrder !== '' && plateOrder !== '') {
        var purchaseOrders = document.getElementById('purchase-orders');
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = 'CMYK Ink: ' + cmykOrder + ', Plate: ' + plateOrder +
                                '<button class="btn btn-success float-right complete-order">Completar</button>';
        purchaseOrders.appendChild(listItem);

        // Clear input fields
        document.getElementById('cmyk-order').value = '';
        document.getElementById('plate-order').value = '';

    } else {
        alert('Por favor ingrese ambas cantidades.');
    }
});

// Function to generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random integer between min and max (inclusive)
function disableConsumption(action) {
    document.getElementById('low-btn').disabled = action;
    document.getElementById('high-btn').disabled = action;
}

// Function to check low inventory levels
function checkLowInventory() {
    var cmykLevel = parseInt(document.getElementById('cmyk-level').value);
    var plateQuantity = parseInt(document.getElementById('plate-quantity').value);

    if (cmykLevel < lowCmykLevels || plateQuantity < lowPlateLevels) {
        alert('Niveles de Inventario CRITICOS! Tinta CMYK: ' + cmykLevel + ', Cantidad Planchas: ' + plateQuantity);
        disableConsumption(true);
    } else if (cmykLevel < 3*lowCmykLevels || plateQuantity < 3*lowPlateLevels) {
        alert('Niveles de Inventario Bajos! Tinta CMYK: ' + cmykLevel + ', Cantidad Planchas: ' + plateQuantity);
    }
    

    
}
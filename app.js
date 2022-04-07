var parkingLot;
const eleCreateParkingLot = document.getElementById('btn-create');
const eleParkNewCar = document.getElementById('btn-park');
const eleCarDetails = document.getElementById('car-details');
const eleCancelButton = document.getElementById('btn-cancel');
const eleSubmitButton = document.getElementById('btn-submit');
const eleRemoveCar = document.getElementById('btn-remove');
eleCreateParkingLot.addEventListener('click',()=>{
    const parkingLotSize = prompt("Please enter parking lot size");
    if(parkingLotSize && !isNaN(parkingLotSize)){
        createNewParkingLot(parkingLotSize)
    }
})

eleParkNewCar.addEventListener('click',()=>{
    if(!parkingLot){
        alert('No Parking Lot Created');
        return
    };
    eleCarDetails.style.display = 'block';
})

eleParkNewCar.addEventListener('click',()=>{
    if(!parkingLot){
        alert('No Parking Lot Created');
        return
    };
    eleCarDetails.style.display = 'block';
})

eleCancelButton.addEventListener('click',()=>{
    eleCarDetails.style.display = 'none';
})

eleSubmitButton.addEventListener('click',()=>{
    const carNumber = document.getElementById('car-number').value;
    const carColor = document.getElementById('car-color').value;

    if(!carNumber || !carColor){
        alert("Car number or color can't be empty"); return
    }

    if(parkNewCar(carNumber, carColor)){
        document.getElementById('car-number').value = "";
        document.getElementById('car-color').value = "black";
        alert('Car Parked Successfully'); return
    }
    alert('No Empty Slots')
})

function createNewParkingLot(parkingLotSize){
    parkingLot = Array(+parkingLotSize).fill({occupied:'empty',car_reg_num:'',car_color:'',ticket_number:''});
    eleCreateParkingLot.style.display = 'none';
    document.getElementById('no-lots').style.display = 'none';
    displayEmptySlots();
}

function displayEmptySlots(){
    const parkingLotArea =  document.getElementById('parking-lot');
    parkingLot.forEach((element,index)=>parkingLotArea.innerHTML+=`<div class="parking-slot" style="background = ${element.color}" id=spot-${index}><span>${element.occupied}</span></div>`);
}

function parkNewCar(carNumber, carColor){
    const emptySlot = parkingLot.findIndex(element=>element.occupied == 'empty');
    if(emptySlot < 0) return false

    const ticketNumber = Math.random().toString(36).slice(2);
    const eleParkingSlot = document.getElementById(`spot-${emptySlot}`);
    parkingLot[emptySlot] = {
        occupied:'parked',
        car_reg_num:carNumber,
        car_color:carColor,
        ticket_number:ticketNumber
    };
    eleParkingSlot.style.background = carColor;
    eleParkingSlot.innerHTML = `<span>Parked - ${carNumber}</span> <button class='btn-remove' onclick="leaveParkingLot(${emptySlot})"> Leave Parking</button>`;
    return true
}

function leaveParkingLot(intId){
    const eleParkingSlot = document.getElementById(`spot-${intId}`);
    parkingLot[intId] = {
        occupied:'empty',
        car_reg_num:'',
        car_color:'',
        ticket_number:''
    };
    eleParkingSlot.style.background = 'black';
    eleParkingSlot.innerHTML = `<span>empty</span>`;
    alert('Slot has been emptied successfully');
}
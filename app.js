let parkingLot;
const eleCreateParkingLot = document.getElementById('btn-create');
const eleParkNewCar = document.getElementById('btn-park');
const eleCarDetails = document.getElementById('car-details');
const eleCancelButton = document.getElementById('btn-cancel');
const eleSubmitButton = document.getElementById('btn-submit');
const eleRemoveCar = document.getElementById('btn-remove');
const eleQueryButton = document.getElementById('btn-find');

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

eleCancelButton.addEventListener('click',()=>{
    eleCarDetails.style.display = 'none';
})

eleSubmitButton.addEventListener('click',()=>{
    const carNumber = document.getElementById('car-number').value;
    const carColor = document.getElementById('car-color').value;

    if(!carNumber || !carColor){
        alert("Car number or color can't be empty"); return
    }
    let ticketNumber = parkNewCar(carNumber, carColor)
    if(ticketNumber){
        document.getElementById('car-number').value = "";
        document.getElementById('car-color').value = "";
        alert(`Car Parked Successfully Ticket Number : ${ticketNumber}`); return
    }
    alert('No Empty Slots')
})

eleQueryButton.addEventListener('click',()=>{
    
    if(!parkingLot){
        alert('No Parking Lot Created');
        return
    }
    
    const searchableContent = parkingLot.findIndex(element=>element.occupied != 'empty');
    if(searchableContent>=0){
        filterQueries()
        return
    }
    alert('No Car In Parking Yet');
    
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
    return ticketNumber
}

function leaveParkingLot(intId){
    if(!confirm("Ready to Move?"))return
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

function filterQueries(){
    const eleQueryResult =  document.getElementById('query-result');
    const strSelectValue = document.getElementById('select-by').value;
    const strWhereConditionValue = document.getElementById('where-condition').value;
    const strWhereValue = document.getElementById('where-text').value;
    eleQueryResult.innerHTML = "";
    parkingLot.filter(element=>{
        if(element[strWhereConditionValue] == strWhereValue){
            eleQueryResult.innerHTML += `<p>${element[strSelectValue]}</p>`;
        }
    })
}
var parkingLot;
const eleCreateParkingLot = document.getElementById('btn-create');
const eleParkNewCar = document.getElementById('btn-park');
eleCreateParkingLot.addEventListener('click',()=>{
    const parkingLotSize = prompt("Please enter parking lot size");
    if(parkingLotSize && !isNaN(parkingLotSize)){
        createNewParkingLot(parkingLotSize)
    }
})

eleParkNewCar.addEventListener('click',()=>{
    if(!parkingLot) return;
})

function createNewParkingLot(parkingLotSize){
    parkingLot = Array(+parkingLotSize).fill({occupied:'empty',car_reg_num:'',car_color:'',ticket_number:''});
    eleCreateParkingLot.style.display = 'none';
    document.getElementById('no-lots').style.display = 'none';
    displayEmptySlots();
}

function displayEmptySlots(){
    const parkingLotArea =  document.getElementById('parking-lot');
    parkingLot.forEach((element,index)=>parkingLotArea.innerHTML+=`<div class="parking-slot" style="background = ${element.color}" data-index=${index}><span>${element.occupied}</span></div>`);
}
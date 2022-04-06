const eleCreateParkingLot = document.getElementById('btn-create');
var parkingLot;
eleCreateParkingLot.addEventListener('click',()=>{
    const parkingLotSize = prompt("Please enter parking lot size");
    if(parkingLotSize && !isNaN(parkingLotSize)){
        createNewParkingLot(parkingLotSize)
    }
})

function createNewParkingLot(parkingLotSize){
    parkingLot = Array(+parkingLotSize).fill('empty');
    eleCreateParkingLot.style.display = 'none';
    document.getElementById('no-lots').style.display = 'none';
}

rename -s/driver-create/vehicle-create/ */*
rename -s/driver-drop/vehicle-drop/ */*
rename -s/driver-update/vehicle-update/ */*
rename -s/drivers/vehicles/ */*

gsed -i -e s/driver-create/vehicle-create/ */*
gsed -i -e s/driver-drop/vehicle-drop/ */*
gsed -i  -e s/driver-update/vehicle-update/ */*
gsed -i  -e s/drivers/vehicles/ */*

gsed -i -e s/DriverCreate/VehicleCreate/ */*
gsed -i -e s/DriverDrop/VehicleDrop/ */*
gsed -i  -e s/DriverUpdate/VehicleUpdate/ */*
gsed -i  -e s/Drivers/Vehicles/ */*
gsed -i  -e s/Driver/Vehicle/g */*
gsed -i  -e s/driver/vehicle/g */*

gsed -i  -e s/driver/vehicle/g *.ts
gsed -i  -e s/Driver/Vehicle/g *.ts

rename -s/driver-create/vehicle-create/ *
rename -s/driver-drop/vehicle-drop/ *
rename -s/driver-update/vehicle-update/ *
rename -s/driver/vehicle/ *

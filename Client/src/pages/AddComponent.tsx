import VehicleForm from '../features/Vehicles/inputForm';
import HouseForm from '../features/Houses/inputForm';
import LandForm from '../features/Lands/inputForm';


const AddForm = () => {
    return (
        <div className='w-full h-screen overflow-y-auto bg-gray-500'>
            <VehicleForm />
            <HouseForm />
            <LandForm />
            
        </div>
    )
}

export default AddForm
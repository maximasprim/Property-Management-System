
import Calendar from "../../components/Calender";
import UserActivityGraph from "./activitygraph";

const EventList = () => {
 
  return (
      <div className="flex justify-between flex-row ">
          <div className="p-4 w-[60%] bg-white shadow-md">
          < UserActivityGraph />
          </div>
          <div className="p-4 w-[40%] bg-white shadow-md">
            <Calendar />
          </div>
          
       
      </div>
  );
};

export default EventList;

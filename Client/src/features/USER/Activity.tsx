
import Calendar from "../../components/Calender";
import UserPaymentsChart from "../users/singleUserPaymentCharts";
// import UserActivityGraph from "./activitygraph";
import Comment from "./comment";

const EventList = () => {
 
  return (
      <div className="flex justify-between flex-row ">
          <div className="flex flex-col gap-0 p-2 w-[60%] bg-white shadow-md">
            <Comment />
          < UserPaymentsChart />
          </div>
          <div className="p-4 w-[40%] bg-white shadow-md">
            <Calendar />
          </div>
          
       
      </div>
  );
};

export default EventList;

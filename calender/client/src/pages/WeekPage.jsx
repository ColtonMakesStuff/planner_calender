import { useRouteError } from "react-router-dom";
import Week from "../components/Week";
import { useParams } from "react-router-dom";
import HandleIncrement from "../components/HandleIncrement";

export default function WeekPage() {
  let { weekday } = useParams();
  let weekdayStr = weekday.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  console.log(weekdayStr); 
  

  return (

    <Week date={weekdayStr} />

  );
}
import Day from "../components/Day";
import { useParams } from "react-router-dom";

export default function DayPage() {
 let { day } = useParams();
 let dayStr = day.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
 console.log(dayStr); // Outputs: 2024-01-01

 return (
    <Day date={dayStr}/>
 );
}

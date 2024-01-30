import { useRouteError } from "react-router-dom";
import Month from "../components/Month";
import { useParams } from "react-router-dom";


export default function MonthPage() {
  let { month } = useParams();
  let monthStr = month.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  console.log(monthStr); // Outputs: 2024-01-01

  return (
    <Month date={monthStr}/>
  );
}
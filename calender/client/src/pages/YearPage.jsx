import Year from "../components/Year";
import { useParams } from "react-router-dom";

export default function YearPage() {
 let { year } = useParams();
 let yearStr = year.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
 console.log(yearStr); // Outputs: 2024-01-01

 return (
    <>
    <Year date={yearStr}/>
    </>
 );
}

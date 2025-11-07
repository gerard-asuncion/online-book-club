import { Timestamp } from "firebase/firestore";

const formatTimestampHour = (timestamp: Timestamp | undefined): string => {
  if (!timestamp) return "---";
  const dateObject: Date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  const hours: string = String(dateObject.getHours()).padStart(2, '0');
  const minutes: string = String(dateObject.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}h`;
}  

const formatTimestampDate = (timestamp: Timestamp | undefined): string => {
  if (!timestamp) return "---";
  const dateObject: Date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  const day: string = String(dateObject.getDate()).padStart(2, '0');
  const month: string = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year: string = String(dateObject.getFullYear());
  
  return `${day}-${month}-${year}`;
    }   

export const displayDate = (createdAt: Timestamp, isMobile: boolean): string => {
  if(createdAt === undefined) return "---";
  return isMobile
    ? formatTimestampDate(createdAt)
    : `${ formatTimestampHour(createdAt)} / ${formatTimestampDate(createdAt)}`
}
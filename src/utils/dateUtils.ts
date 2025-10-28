import { Timestamp } from "firebase/firestore";

export const formatTimestamp = (timestamp: Timestamp | Date | undefined): string => {
  if (!timestamp) return "Hora desconeguda";

  const dateObject: Date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} / ${hours}:${minutes}h`;
  
};
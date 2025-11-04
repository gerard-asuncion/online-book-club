import { Timestamp } from "firebase/firestore";

const formatTimestamp = (timestamp: Timestamp | Date | undefined): string => {
  if (!timestamp) return "Hora desconeguda";

  const dateObject: Date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = String(dateObject.getFullYear());
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} / ${hours}:${minutes}h`;
  
};

const formatTimestampShort = (timestamp: Timestamp | Date | undefined): string => {
  if (!timestamp) return "";

  const dateObject: Date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = String(dateObject.getFullYear());

  return `${day}-${month}-${year}`;
};

export const displayDate = (messageDate: Timestamp | Date | undefined, isMobile: boolean) =>
  isMobile
  ? formatTimestampShort(messageDate)
  : formatTimestamp(messageDate)
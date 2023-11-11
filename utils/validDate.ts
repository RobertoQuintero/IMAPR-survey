export const validDate = (date: Date) => {
  return `${
    date?.toISOString().split("T")[0]
  }T${date?.toLocaleTimeString()}.000Z`;
};

export const onlyDate = (date: Date) => {
  return `${date?.toISOString().split("T")[0]}T00:00:01.000Z`;
};

export const createDate = () => {
  const date = new Date();
  date.setTime(
    date.getTime() + Number(process.env.NEXT_PUBLIC_GMT_HOURS) * 60 * 60 * 1000
  );
  return `${date.toISOString().split("T")[0]}T${
    new Date().toTimeString().split(" ")[0]
  }.000Z`;
};

export const convertToLocale = (date: Date, hours: number) => {
  date.setTime(
    date.getTime() + Number(process.env.NEXT_PUBLIC_GMT_HOURS) * 60 * 60 * 1000
  );
  return date;
};
export const convertForForm = (date: Date, hours: number) => {
  date.setTime(
    date.getTime() + Number(process.env.NEXT_PUBLIC_GMT_HOURS)*2 * 60 * 60 * 1000
  );
  return date;
};

export const adjustForTimezone=(date:Date):Date=>{
var timeOffsetInMS:number = date.getTimezoneOffset() * 60000;
  date.setTime(date.getTime() + timeOffsetInMS);
  return date
}

export const dateDate=(date:string)=>{
  
var targetTime = new Date(date);
var timeZoneFromDB = -7.00; //time zone value from database
//get the timezone offset from local time in minutes
var tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
//convert the offset to milliseconds, add to targetTime, and make a new Date
var offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
}

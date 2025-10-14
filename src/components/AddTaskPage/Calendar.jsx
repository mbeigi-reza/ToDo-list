import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function Calendar({ selectedDate, onDateChange }) {
  return (
    <div className="flex flex-col mb-4 items-center">
      <label className="font-medium mb-2 text-right w-full">📅 انتخاب تاریخ</label>

      <DatePicker
        value={selectedDate}
        onChange={(date) => onDateChange(date?.format?.("YYYY/MM/DD"))}
        calendar={persian}
        locale={persian_fa}
        inline                 // 👈 نمایش دائمی روی صفحه
        numberOfMonths={1}     // 👈 فقط یک ماه (نه چند تا)
        showOtherDays          // نمایش روزهای ماه قبل/بعد
        highlightToday         // هایلایت امروز
        className="rmdp-prime" // استایل پایه کتابخونه
        containerClassName="w-full flex justify-center"
        style={{
          width: "100%",
          maxWidth: "400px",   // برای موبایل بهینه
          borderRadius: "16px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

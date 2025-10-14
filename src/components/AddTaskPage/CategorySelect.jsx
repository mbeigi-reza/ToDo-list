export default function CategorySelect({ category, onCategoryChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="font-medium mb-1">دسته‌بندی:</label>
      <select className="border border-gray-300 p-2 rounded"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">انتخاب کنید</option>
        <option value="کار">کار</option>
        <option value="شخصی">شخصی</option>
        <option value="خانواده">خانواده</option>
        <option value="تحصیل">تحصیل</option>
        <option value="دیگر">دیگر</option>
      </select>
    </div>
  );
}

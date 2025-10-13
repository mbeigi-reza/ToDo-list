export default function CategorySelect({ category, onCategoryChange }) {
  return (
    <div>
      <label>دسته‌بندی:</label>
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">انتخاب کنید</option>
        <option value="کار">کار</option>
        <option value="شخصی">شخصی</option>
      </select>
    </div>
  );
}

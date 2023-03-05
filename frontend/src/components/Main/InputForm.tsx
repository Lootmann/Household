import React from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8888";

function InputForm() {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [householdForm, setHouseholdForm] = React.useState<HouseholdType>({
    amount: 0,
    registered_at: "",
    memo: "",
    category: 0,
  });

  React.useEffect(() => {
    axios.get(BASE_URL + "/categories").then((resp) => {
      // get all categories
      const categories_from_api = resp.data;
      setCategories(categories_from_api);

      // set initial value to HouseholdForm
      setHouseholdForm({
        ...householdForm,
        registered_at: getToday(),
        category: Number(categories_from_api[0].id),
      });
    });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // TODO: when submit data, and returns HTTP 201 status from API,
    // TODO: ReRender top page infos
    e.preventDefault();
    console.log(householdForm);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;

    if (name == "amount") {
      setHouseholdForm((prevForm) => ({ ...prevForm, amount: Number(value) }));
    } else {
      setHouseholdForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  }

  function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setHouseholdForm((prevForm) => ({ ...prevForm, [name]: Number(value) }));
  }

  /**
   * get current today 'Date'
   * date format is 'yyyy-MM-DD' and e.g getMonth() returns 0, 1, ..., 12
   * so I need getMonth(), and getDay() requires 0 padding when number is One digit.
   * @returns string: yyyy-MM-DD
   */
  function getToday(): string {
    const date = new Date();
    const [year, month, day] = [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ];
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <form
        method="post"
        className="flex flex-col gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="number"
          name="amount"
          id="amount"
          className="px-2 py-1 rounded-md"
          placeholder="1234"
          value={householdForm.amount}
          onChange={(e) => handleChange(e)}
        />

        <input
          type="date"
          name="registered_at"
          id="registered_at"
          className="px-2 py-1 rounded-md"
          value={householdForm.registered_at}
          onChange={(e) => handleChange(e)}
        />

        <input
          type="text"
          name="memo"
          id="memo"
          className="px-2 py-1 rounded-md"
          placeholder="memo"
          value={householdForm.memo}
          onChange={(e) => handleChange(e)}
        />

        <select
          name="category"
          id="category"
          className="px-2 py-1 rounded-md"
          onChange={(e) => handleChangeSelect(e)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="submit"
          value="Create :^)"
          className="bg-green-500 text-slate-900 py-1 border-2 border-slate-900 rounded-md"
        />
      </form>
    </div>
  );
}

export default InputForm;

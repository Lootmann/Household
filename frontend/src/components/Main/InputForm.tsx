import axios from "axios";
import React from "react";

import { BASE_API_URL, getToday } from "../util";

function InputForm() {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [householdForm, setHouseholdForm] = React.useState<HouseholdFormType>({
    amount: 0,
    registered_at: "",
    memo: "",
    category_id: 0,
  });

  React.useEffect(() => {
    axios.get(BASE_API_URL + "/categories").then((resp) => {
      // get all categories
      const categories_from_api = resp.data;
      setCategories(categories_from_api);

      // set initial value to HouseholdForm
      setHouseholdForm({
        ...householdForm,
        registered_at: getToday(),
        category_id: categories_from_api[0].id,
      });
    });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios
      .post(BASE_API_URL + "/households", {
        amount: householdForm.amount,
        registered_at: householdForm.registered_at,
        memo: householdForm.memo,
        category_id: householdForm.category_id,
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
      });

    // clear form
    setHouseholdForm({
      amount: 0,
      registered_at: getToday(),
      memo: "",
      category_id: categories[0].id,
    });
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
    const { value } = e.target;
    setHouseholdForm((prevForm) => ({
      ...prevForm,
      category_id: Number(value),
    }));
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

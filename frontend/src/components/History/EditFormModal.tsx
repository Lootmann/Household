import React from "react";
import { BASE_API_URL } from "../util";
import axios from "axios";

type EditFormModalProps = {
  // when ModalOpen is true, show modal
  isModalOpen: boolean;
  // control whether the Modal is open or closed
  handleModal: any;
  household_id: number;
  // when a household updated or delete, reload Parent Layout.tsx component
  handleRefresh: any;
};

// FIXME: COMPLICATED 😠 !!!
/**
 * EditFormModal
 * EditForm can do update and delete a household.
 */
function EditFormModal({
  isModalOpen,
  handleModal,
  household_id,
  handleRefresh,
}: EditFormModalProps) {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);

  const [householdForm, setHouseholdForm] = React.useState<HouseholdType>({
    id: 0,
    amount: 0,
    registered_at: "",
    memo: "",
    category: { id: 0, name: "" },
  });

  function handleUpdateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios
      .post(BASE_API_URL + "/households", {
        amount: householdForm.amount,
        registered_at: householdForm.registered_at,
        memo: householdForm.memo,
        category_id: householdForm.category.id,
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
      });

    // remove modal
    handleModal(false);
    // realod current history
    handleRefresh();
  }

  function handleDeleteSubmit(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    e.preventDefault();
    axios.delete(BASE_API_URL + `/households/${household_id}`).then((resp) => {
      console.log(resp);
    });

    handleModal(false);
    handleRefresh();
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

  React.useEffect(() => {
    if (household_id !== 0) {
      axios.get(BASE_API_URL + `/households/${household_id}`).then((resp) => {
        setHouseholdForm(resp.data);
      });
    }

    axios.get(BASE_API_URL + "/categories").then((resp) => {
      setCategories(resp.data);
    });
  }, [household_id]);

  return (
    <>
      {isModalOpen && categories !== undefined && (
        <div
          onClick={() => handleModal(false)}
          className="absolute flex justify-center items-start inset-0 bg-black bg-opacity-30 h-screen w-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative top-20 h-1/2 w-1/4 flex flex-col gap-4 justify-center p-4 bg-slate-300 border-b"
          >
            <div>
              <h2 className="text-2xl text-center">EditFormModal</h2>
            </div>

            <form
              method="post"
              onSubmit={(e) => handleUpdateSubmit(e)}
              className="flex flex-col gap-2 ml-auto mr-auto"
            >
              <input
                type="number"
                name="amount"
                id="amount"
                className="px-2 py-1 rounded-md"
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
                placeholder="Your Memo :^)"
                value={householdForm.memo}
                onChange={(e) => handleChange(e)}
              />

              <select
                name="category"
                id="category"
                className="px-2 py-1 mb-4 rounded-md"
                onChange={(e) => handleChangeSelect(e)}
              >
                {categories.map((category) =>
                  category.id == householdForm.category.id ? (
                    <option
                      key={category.id}
                      value={category.id}
                      defaultValue={category.id}
                    >
                      {category.name}
                    </option>
                  ) : (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                )}
              </select>

              <div className="flex justify-evenly gap-4">
                {/* NOTE: Delete FormButton */}
                <input
                  type="submit"
                  value="Delete"
                  className="bg-red-500 hover:bg-red-300 px-2 border-2 border-slate-500 rounded-md"
                  onClick={(e) => handleDeleteSubmit(e)}
                />
                {/* NOTE: Update FormButton */}
                <input
                  type="submit"
                  value="Update :^)"
                  className="flex-1 bg-yellow-500 hover:yellow-300 text-slate-900 px-2 py-1 border-2 border-slate-500 rounded-md"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditFormModal;

type CategoryType = {
  id: number;
  name: string;
};

type HouseholdType = {
  id: number;
  amount: number;
  registered_at: string;
  memo: string;
  category_id: number;
};

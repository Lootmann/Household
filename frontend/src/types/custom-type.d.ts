type CategoryType = {
  id: number;
  name: string;
};

type HouseholdType = {
  id: number;
  amount: number;
  registered_at: string;
  memo: string;
  category: CategoryType;
};

// FIXME: find a good way
type APIHouseholdType = {
  category: CategoryType;
  amount: number;
};
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

type HouseholdFormType = {
  amount: number;
  registered_at: string;
  memo: string;
  category_id: number;
};

type AggregateProp = {
  households: HouseholdType[];
  categories: CategoryType[];
};

// FIXME: find a good way
type APIHouseholdType = {
  category: CategoryType;
  amount: number;
};

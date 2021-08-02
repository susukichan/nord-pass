import { useEffect, useState, useCallback } from "react";
import getUserItems, { IItem } from "../../services/getUserItems";

export interface UserItemsProviderHandle {
  refetchItems: () => Promise<void>;
  isLoading: boolean;
  errorMessage: string;
  items: IItem[];
}

const userItemsProvider = (): UserItemsProviderHandle => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [items, setItems] = useState<Array<IItem>>([]);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);

    try {
      const userItems = await getUserItems();

      setItems(userItems);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    refetchItems: fetchItems,
    isLoading,
    errorMessage,
    items,
  };
};

export default userItemsProvider;

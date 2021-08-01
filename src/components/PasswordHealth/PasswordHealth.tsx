import List from "./components/List/List";
import useItemsProvider from "./useItemsProvider";
import ErrorBlock from "../ErrorBlock";
import Filter from "./components/Filter/Filter";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import { Routes } from "~/constants";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import { useUserContext } from "../UserContext";
import { Loading } from "../Loading/Loading";

const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { items, isLoading, errorMessage, refetchItems } = useItemsProvider();

  if (isLoading || userDataIsLoading) {
    return <Loading />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return (
      <div className="container">
        <Header items={items} username={username} />
        <div className="content">
          <div className="error-container">
            <ErrorBlock error={userProviderErrorMessage || errorMessage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items} />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List refetchItems={refetchItems} items={items} />
        </Route>
        <Route path={Routes.Weak}>
          <List
            refetchItems={refetchItems}
            items={items.filter(itemHasWeakPassword)}
          />
        </Route>
        <Route path={Routes.Reused}>
          <List
            refetchItems={refetchItems}
            items={items.filter((item) => itemHasReusedPassword(item, items))}
          />
        </Route>
        <Route path={Routes.Old}>
          <List
            refetchItems={refetchItems}
            items={items.filter((item) => itemHasOldPassword(item))}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;

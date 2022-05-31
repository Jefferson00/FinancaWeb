import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  RouteProps as ReactDOMRouteProps,
  useHistory,
} from "react-router-dom";
import { useStores } from "../store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../config/firebase";
import api from "../config/api";
import { HeadersDefaults } from "axios";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.FC<any>;
  position?: number[];
}

interface CommonHeaderProperties extends HeadersDefaults {
  authorization: string;
}

const RouterWrapper = observer(
  ({
    component: Component,
    isPrivate = false,
    position,
    ...rest
  }: RouteProps) => {
    const { authStore } = useStores();
    const { auth: StateAuth, setUser } = authStore;
    const { user } = StateAuth;
    const auth = getAuth(app);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const { displayName, photoURL, uid, email, phoneNumber } = user;

          const token = await user.getIdToken();

          if (!displayName || !photoURL) {
            throw new Error("Missing information from Google Account.");
          }

          const userInput = {
            avatar: photoURL,
            email: email,
            name: displayName,
            phone: phoneNumber,
          };

          api.defaults.headers = {
            authorization: `Bearer ${token}`,
          } as CommonHeaderProperties;

          api
            .get(`users/email/${email}`)
            .then(({ data }) => {
              console.log("usuario encontrado com email", data);
              if (!data) {
                api
                  .post("users", userInput)
                  .then(({ data: dataCreated }) => {
                    setUser({
                      ...dataCreated,
                      phone: dataCreated.phone
                        ? dataCreated.phone.replace("+55", "")
                        : null,
                    });
                    return;
                  })
                  .catch((err) => console.log("erro ao criar usuário:", err))
                  .finally(() => setLoading(false));
              } else {
                setUser({
                  ...data,
                  phone: data.phone ? data.phone.replace("+55", "") : null,
                  avatar: data.avatar ? data.avatar : photoURL,
                });
                return;
              }
            })
            .catch((err) => {
              console.log("erro ao encontrar usuário com email", err);
            })
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
          if (isPrivate) {
            history.push("/login");
          }
        }
      });

      return () => {
        unsubscribe();
      };
    }, [auth, history, isPrivate, setUser]);

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (isPrivate && !user) {
      return <Redirect to="/login" />;
    }
    if (!isPrivate && user) {
      return <Redirect to="/" />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
);

export default RouterWrapper;

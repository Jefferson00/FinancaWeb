import { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  RouteProps as ReactDOMRouteProps,
  useHistory,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../config/firebase";
import api from "../config/api";
import { HeadersDefaults } from "axios";
import { useDispatch, useSelector } from "react-redux";
import State from "../store/interfaces";
import { signUp } from "../store/modules/Auth/fetchActions";
import { signIn } from "../store/modules/Auth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.FC<any>;
  position?: number[];
}

interface CommonHeaderProperties extends HeadersDefaults {
  authorization: string;
}

const RouterWrapper = ({
  component: Component,
  isPrivate = false,
  position,
  ...rest
}: RouteProps) => {
  const dispatch = useDispatch<any>();
  const { isAuthenticated } = useSelector((state: State) => state.auth);

  const auth = getAuth(app);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, photoURL, email, phoneNumber } = user;

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
            console.log("usuario encontrado com email");
            if (!data) {
              dispatch(signUp(userInput));
              setLoading(false);
            } else {
              dispatch(
                signIn({
                  ...data,
                  phone: data.phone ? data.phone.replace("+55", "") : null,
                  avatar: data.avatar ? data.avatar : photoURL,
                })
              );
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
  }, [auth, dispatch, history, isPrivate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (isPrivate && !isAuthenticated) {
    return <Redirect to="/login" />;
  }
  if (!isPrivate && isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouterWrapper;

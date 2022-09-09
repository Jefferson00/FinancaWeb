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
import { signIn, signOut } from "../store/modules/Auth";
import { addMessage } from "../store/modules/Feedbacks";
import { checkApiError } from "../utils/checkApiError";
import Lottie from "lottie-react";
import splashAnimation from "../assets/splash.json";
import LogoImg from "../assets/logo.svg";

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

        console.log(token);

        api.defaults.headers = {
          authorization: `Bearer ${token}`,
        } as CommonHeaderProperties;

        localStorage.setItem("@FinancaWeb:token", token);

        api
          .get(`users/email/${email}`)
          .then(({ data }) => {
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
            dispatch(
              addMessage({
                type: "error",
                message: checkApiError(err),
              })
            );
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
        localStorage.removeItem("@FinancaWeb:token");
        dispatch(signOut({}));
        if (isPrivate) {
          history.push("/login");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, dispatch, history, isPrivate]);

  console.log("isAuthenticated", isAuthenticated);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <Lottie
          animationData={splashAnimation}
          loop
          autoPlay
          style={{ width: "100%" }}
          allowFullScreen
        />
        <img
          src={LogoImg}
          style={{ position: "absolute", top: "20%" }}
          alt="logo"
        />
      </div>
    );
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

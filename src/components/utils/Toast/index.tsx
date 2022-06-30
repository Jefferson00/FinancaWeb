/* eslint-disable array-callback-return */
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import State from "../../../store/interfaces";
import { MessageType, removeMessage } from "../../../store/modules/Feedbacks";

export default function ToastComponent() {
  const dispatch = useDispatch<any>();
  const { messages } = useSelector((state: State) => state.feedbacks);

  const config: ToastOptions = useMemo(() => {
    return {
      position: "top-center",
    };
  }, []);

  const feedback = useCallback(
    (message: MessageType) => {
      if (message.type === "default")
        return toast(message.message, {
          ...config,
          onClose: () => {
            dispatch(removeMessage(message.message));
          },
        });
      if (message.type === "success")
        return toast.success(message.message, {
          ...config,
          onClose: () => {
            dispatch(removeMessage(message.message));
          },
        });
      if (message.type === "error")
        return toast.error(message.message, {
          ...config,
          onClose: () => {
            dispatch(removeMessage(message.message));
          },
        });
      if (message.type === "info")
        return toast.info(message.message, {
          ...config,
          onClose: () => {
            dispatch(removeMessage(message.message));
          },
        });
      if (message.type === "warning")
        return toast.warning(message.message, {
          ...config,
          onClose: () => {
            dispatch(removeMessage(message.message));
          },
        });
    },
    [config, dispatch]
  );

  useEffect(() => {
    messages.map((message) => {
      feedback(message);
    });
  }, [feedback, messages]);
  return <ToastContainer />;
}

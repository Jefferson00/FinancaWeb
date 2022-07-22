interface ICheckIfErrorIsProvidedFromDtoOrArray {
  message?: string;
  response: {
    data: {
      message: string | string[];
    };
  };
}

export const checkApiError = (
  e: ICheckIfErrorIsProvidedFromDtoOrArray
): string => {
  const { response } = e;
  if (!response?.data) return e?.message || "Erro interno";

  const message = Array.isArray(response?.data?.message)
    ? response.data.message[0]
    : response?.data.message;

  return message;
};

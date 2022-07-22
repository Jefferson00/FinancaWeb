export const getCurrentIteration = (
  currentPart: number | null,
  iteration: string
) => {
  if (!currentPart) {
    return `${iteration}/${iteration}`;
  } else {
    return `${Number(iteration) - currentPart}/${iteration}`;
  }
};

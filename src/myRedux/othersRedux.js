const othersRedux = (others = { isLoading: true }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...others, isLoading: true };
    case "END_LOADING":
      return { ...others, isLoading: false };
    case "FETCH_OTHERS":
      return {
        ...others,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    default:
      return others;
  }
};

export default othersRedux;

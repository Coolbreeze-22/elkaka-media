const othersRedux = (others = {}, action) => {
  switch (action.type) {
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

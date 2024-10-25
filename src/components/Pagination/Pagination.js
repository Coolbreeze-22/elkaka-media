import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


export const Paginate = ({ page }) => {
  const { totalPages } = useSelector((state) => state.others)
  
  return (
  <Pagination
    count={totalPages}
    page={Number(page)}
    variant="outlined"
    color="error"
    renderItem={(item) => (
      <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} sx={{backgroundColor: "#c51717", color: "white"}} />
    )}
  />
  )  
};

export default Paginate;


// note that the page in item.page is not the same with the page in Pagination. It is the number you click on that sets the item.page to the given number which also display in the url as query. Page picks it from the url through query.get and passes it as prop in pagination and then used in getposts and also in Pagination, but not in PaginationItem. So item.page is just like formData.name, meaning that item is a state which has a property of which the key to the property is page and the value is set once a button is clicked. more of a reason for ...item just like ...formDate. All these were done by material ui.

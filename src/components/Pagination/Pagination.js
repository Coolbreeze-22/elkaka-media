import React from 'react'
import { Pagination, PaginationItem, Container } from '@mui/material'
import { Link } from 'react-router-dom'

export const Paginate = () => (
    <Pagination count={5} page={1} variant="outlined" color='primary' renderItem={(item) => (
      <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
    )}/>
  )

export default Paginate
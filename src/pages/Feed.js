import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { user } from 'reducers/user'

import { CardHeader } from '../components/Card/CardHeader'
import { CardFooter } from '../components/Card/CardFooter'
import { Fab } from '../components/Button/Fab'

export const Feed = () => {
  const [recipes, setRecipes] = useState(null)
  const loggedIn = useSelector((store) => store.user.loggedIn)

  useEffect(() => {
    fetch('https://grymt-food-app.herokuapp.com/recipes')
      .then((res) => res.json())
      .then((json) => {
        console.log('This is json:', json)
        setRecipes(json)
      })
  }, [])

  return (
    <div>
      {recipes && recipes.map((item) => (
        <div key={item._id}>
          <StyledLink to={`/recipe/${item._id}`}>
            <CardHeader title={item.title} image={item.image} shortDes={item.shortDescription} />
          </StyledLink>
          <CardFooter tagsArray={item} />
        </div>))}
      {loggedIn && <Fab />}
    </div>
  )
}

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`

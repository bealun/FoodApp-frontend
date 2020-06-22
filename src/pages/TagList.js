import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Recipe } from './Recipe'

export const TagList = () => {
  const history = useHistory()
  const [tags, setTags] = useState(null)
  const { tag } = useParams()
  const accessToken = useSelector((store) => store.user.accessToken)

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  })

  useEffect(() => {
    fetch(`https://grymt-food-app.herokuapp.com/recipes/tags/${tag}`)
      .then((res) => res.json())
      .then((json) => {
        setTags(json)
        console.log('There are tags:', json)
      })
  }, [tag])

  return (
    <div>
      <TagTitle>{tag}</TagTitle>
      {tags && tags.map((recipe) => (
        <div key={recipe._id}>
          <StyledLink to={`/recipes/${recipe._id}`}>
            {recipe && <Recipe recipeId={recipe._id} />}
          </StyledLink>
        </div>
      ))}
    </div>
  )
}

const TagTitle = styled.h1`
  color: #8DCAC7;
  text-align: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex:
  flex-direction: column;
`
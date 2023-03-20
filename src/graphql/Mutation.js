import { gql } from '@apollo/client'

export const UPDATE_MOVIE = gql`
    mutation updateMovie($_id: ID, $title: String, $description: String, $likes: Int, $image: String, $dateOfReleased: String){
        updateMovie(_id: $_id, title: $title, description: $description, likes: $likes, image: $image, dateOfReleased: $dateOfReleased){
            _id
            title
            description
            likes
            image
            dateOfReleased
        }
    }
`

export const CREATE_MOVIE = gql`
    mutation createMovie($title: String, $description: String, $likes: Int, $image: String, $dateOfReleased: String){
        createMovie(title: $title, description: $description, likes: $likes, image: $image, dateOfReleased: $dateOfReleased){
            _id
            title
            description
            likes
            image
            dateOfReleased
        }
    }
`

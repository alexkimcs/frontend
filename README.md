![logo-5 21ece202 (1)](https://media.git.generalassemb.ly/user/36585/files/e51f1a80-1166-11ec-98f8-643554db0e5b)
# Feedback Loop
Note sharing app for engineers to connect, collaborate, and help their peers. This is a full-stack application built on the MERN stack (MongoDB, Express, React, and Node).

## Deployed Website
https://feedbackloopapp.herokuapp.com/

## User stories
- I am a student in a software engineering intensive looking to connect and collaborate with my peers.
- I am a coding wizard looking to help peers when they are stuck.
- I am part of a coding team looking to encourage my peers in their design.
- I want to stay in the loop and see what projects and languages that people are talking - about most.

## Functionality
### Login System:
 - Guest can only view the posts.  
 - Login is required for users to make interactions on the application, such as make posts, likes, leave comments.
 
 ### Home Feed:
 - Posts are displayed in reverse chronological order (newest at the top)
 - Comments are displayed in chronological order
 - User can click on a tag to filter (search) for posts containing that word
 - Mobile-first and responsive layout

### Posting
- When logged in, users can click the 'new post' button to create a post
- New posts require a title and and a body, but tag lists are optional
- Users have the ability to edit and delete posts that they have created

### Commenting
- When logged in, users can comment on posts
- Users have the ability to edit and delete comments that they have made

### Liking
- When logged in, users have the ability to like and unlike posts
- Likes are stored in the Post schema as an array of objects
- Each object in the array contains the userID and username of the user who liked the post
- Users can only like a post once
- Since likes are stored with the userID and username, users can see posts they've liked during previous sessions

## Feedback Loop Data Flow
<img width="600" alt="data flow" src="https://user-images.githubusercontent.com/37776449/132764389-62c51126-04ba-46bc-a180-2a4b387e360c.png">

## Component Tree
![Screen Shot 2021-09-09 at 1 30 31 PM (2)](https://user-images.githubusercontent.com/63392756/132734404-da2c429c-4701-449b-9412-0233d8b326d6.png)


## Screenshots
<img width="587" alt="Screen Shot 2021-09-09 at 11 49 02 AM" src="https://media.git.generalassemb.ly/user/36585/files/4b566e00-1164-11ec-981f-3453437d65f0">

<img width="585" alt="Screen Shot 2021-09-09 at 11 52 13 AM" src="https://media.git.generalassemb.ly/user/36585/files/c029a800-1164-11ec-9d3e-2d0882d141f7">

<img width="589" alt="Screen Shot 2021-09-09 at 12 02 50 PM" src="https://media.git.generalassemb.ly/user/36585/files/05020e80-1166-11ec-963a-ab1b3f3c2043">

<img width="591" alt="Screen Shot 2021-09-09 at 11 59 39 AM" src="https://media.git.generalassemb.ly/user/36585/files/8ad18a00-1165-11ec-8ad6-d5acc29ff420">

<img width="590" alt="Screen Shot 2021-09-09 at 12 01 14 PM" src="https://media.git.generalassemb.ly/user/36585/files/ba809200-1165-11ec-9e9c-28f78816644a">


### Group members:
- [Michael Dunn O'Connor](https://git.generalassemb.ly/dunnoconnor) - Scrum Manager
- [Cole Rener](https://git.generalassemb.ly/crener)
- [Menty Sisay](https://git.generalassemb.ly/mentysisay)
- [Nita Lo](https://git.generalassemb.ly/nlo88)

import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import NewCategory from "./categories/NewCategory"
import Categories from "./categories/Categories"
import EditCategory from "./categories/EditCategories"
import NewPost from "./posts/NewPost"
import Posts from "./posts/Posts"
import { NewTag } from "./tags/NewTag"
import { EditTag } from "./tags/EditTag"
import { AllTags } from "./tags/Tags"
import MyPosts from "./posts/MyPosts"
import SinglePost from "./posts/SinglePost"
import EditPost from "./posts/EditPost"
import NewComment from "./comments/NewComment"
import PostComments from "./comments/PostComments"
import EditComment from "./comments/EditComment"

export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NavBar />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <>
                    <NavBar />
                    <Login />
                </>
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />

        <Route path="/categories" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <Categories />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newcategory" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NewCategory />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editcategory/:Id" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <EditCategory />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />



        <Route path="/newpost" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NewPost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/posts" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <Posts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newtag" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NewTag />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/edittag/:tagId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <EditTag />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/tags" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <AllTags />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/myposts" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <MyPosts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/viewpost/:postId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <SinglePost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editpost/:postId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <EditPost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newcomment/:postId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NewComment />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/comments/:postId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <PostComments />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editcomment/:commentId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <EditComment />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

    </>
)

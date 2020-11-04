import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import NewCategory from "./categories/NewCategory"
import Categories from "./categories/Categories"
import NewPost from "./posts/NewPost"
import Posts from "./posts/Posts"
import { NewTag } from "./tags/NewTag"
import { Tags } from "./tags/Tags"

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

        <Route path="/tags" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <Tags />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/tags" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <Tags />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

    </>
)

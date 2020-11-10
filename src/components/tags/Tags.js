import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';

import SingleListTag from './SingleListTag';

import './Tags.css'

const AllTags = () => {
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/tags")
            .then(res => res.json())
            // Sort the results by the 'name' field
            .then(res => res.sort((a, b) => ((a.name).toLowerCase() > (b.name).toLowerCase()) ? 1 : -1))
            .then(setAllTags)
    }, [])

    const handleDeleteTag = (tagId) => {
        fetch(`http://localhost:8088/tag/${tagId}`, {
            method: "DELETE"
        }).then(() => {
            const newState = allTags.filter(tag => tag.id !== tagId);
            setAllTags(newState);
        })
    }

    const confirmDelete = (tagId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this tag?</p>
                        <button className="mr-3" onClick={onClose}><h5>No</h5></button>
                        <button onClick={() => {
                            handleDeleteTag(tagId);
                            onClose();
                        }}>
                            <h5>Yes, delete</h5>
                        </button>
                    </div>
                )
            }
        })
    }

    return (
        <>
            <h1 className="text-center mt-3">View All Tags</h1>
            <div className="tag-container">
                {allTags.map((tag) => (
                    <SingleListTag key={tag.id} tag={tag} handleDeleteTag={confirmDelete} />)
                )}
            </div>
        </>
    )
}

export { AllTags }

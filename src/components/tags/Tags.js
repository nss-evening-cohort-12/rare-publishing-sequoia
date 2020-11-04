import React, { useEffect, useState } from "react"

import './Tags.css'

const AllTags = () => {
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/tags")
            .then(res => res.json())
            // Sort the results by the 'name' field
            .then(res => res.sort((a,b) => (a.name > b.name) ? 1 : -1))
            .then(setAllTags, [])
    }, [])

    return (
        <>
            <h1 className="text-center mt-3">View All Tags</h1>
            <div className="tag-container">
                {allTags.map(d => <div className="tag-list text-center" key={d.id}><h5>{d.name}</h5></div>)}
            </div>
        </>
    )
}

export { AllTags }

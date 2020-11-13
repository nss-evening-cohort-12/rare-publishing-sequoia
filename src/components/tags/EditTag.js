import React, { useRef, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

export const EditTag = () => {
  const tag_name = useRef()
  const updateTagError = useRef()
  const history = useHistory()
  const { tagId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8088/tags/${tagId}`)
        .then(res => res.json())
        .then(res => tag_name.current.defaultValue = res.name)
  })

  const handleSubmitTag = (e) => {
    e.preventDefault()

    return fetch(`http://127.0.0.1:8088/tags/${tagId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            tag_name: tag_name.current.value
        })
    })
        .then(() => {
            history.push("/tags")
        })
}

  return (
    <main className="container--tag">
        <dialog className="dialog dialog--newTag" ref={updateTagError}>
            <div>There was an error updating this tag.</div>
            <button className="button--close" onClick={e => updateTagError.current.close()}>Close</button>
        </dialog>
        <section>
            <form className="form--newTag" onSubmit={handleSubmitTag}>
                <h2 className="text-center mt-3">Update Tag</h2>
                <fieldset>
                    <label htmlFor="inputTagName">Tag Name</label>
                    <input ref={tag_name} type="text" id="tag_name" className="form-control" defaultValue="" placeholder="Tag Name" required autoFocus />
                </fieldset>
                <fieldset style={{ textAlign: "center" }}>
                    <button className="btn btn-1"
                        type="submit">Update Tag</button>
                </fieldset>
            </form>
        </section>
    </main>
)
}

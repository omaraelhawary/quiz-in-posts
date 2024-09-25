import React from "react"
import { createRoot } from 'react-dom/client';
import "./frontend.scss"

const divsToUpdate = document.querySelectorAll(".posts-quiz-frontend-update")

divsToUpdate.forEach((div) => {
    const data = JSON.parse(div.querySelector("pre").innerHTML)
    const root = createRoot(div)
    root.render(<Quiz {...data} />)
    div.classList.remove("posts-quiz-frontend-update")
})

function Quiz(props) {
    return (
        <div className="posts-quiz-frontend">
            <p>{props.question}</p>
            <ul>
                {props.answers.map((answer) => {
                    return <li>{answer.name}</li>
                })}
            </ul>
        </div>
    )
}

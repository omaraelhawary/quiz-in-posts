wp.blocks.registerBlockType("posts-quiz/quiz", {
    title: "Quiz",
    icon: "smiley",
    category: "common",
    attributes: {
        QuizTitle: {
            type: "string",
            // source: "text",
            // selector: ".quiz-title"
        },
        QuizDescription: {
            type: "string",
            // source: "text",
            // selector: ".quiz-description"
        }
    },
    edit: function (props) {

        function updateQuizTitle(event) {
            props.setAttributes({ QuizTitle: event.target.value })
        }

        function updateQuizDescription(event) {
            props.setAttributes({ QuizDescription: event.target.value })
        }

        return (
            <div>
                <input type="text" placeholder="Quiz Title" value={props.attributes.QuizTitle} onChange={updateQuizTitle} />
                <input type="text" placeholder="Quiz Description" value={props.attributes.QuizDescription} onChange={updateQuizDescription} />
            </div>
        )
    },
    save: function (props) {
        return (
            <div>
                <p>Quiz title here <span className="quiz-title">{props.attributes.QuizTitle}</span></p>
                <p>Quiz description here <span className="quiz-description">{props.attributes.QuizDescription}</span></p>
            </div>
        )
    }
})
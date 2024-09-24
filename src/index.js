import { v4 as uuid } from 'uuid'
import "./index.scss"
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon } from "@wordpress/components"

function ourStartFunction() {
    let locked = false;

    wp.data.subscribe(function () {
        const results = wp.data.select("core/block-editor").getBlocks().filter((block) => {
            return block.name == "posts-quiz/quiz" && block.attributes.correctAnswer == undefined
        })

        if (results.length && !locked) {
            locked = true
            wp.data.dispatch("core/editor").lockPostSaving("nullAnswer")
        }

        if (!results.length && locked) {
            locked = false
            wp.data.dispatch("core/editor").unlockPostSaving("nullAnswer")
        }
    }
    )
}

ourStartFunction();

wp.blocks.registerBlockType("posts-quiz/quiz", {
    title: "Quiz",
    icon: "smiley",
    category: "common",
    attributes: {
        question: {
            type: "string",
        },
        answers: {
            type: "array",
            default: [{ id: uuid(), name: '' }]
        },
        correctAnswer: {
            type: "number",
            default: null
        }
    },
    edit: EditComponent,
    save: function () {
        return null
    }
})


function EditComponent(props) {

    function updateQuestion(value) {
        props.setAttributes({ question: value })
    }

    function deleteAnswer(indexToDelete) {
        const newAnswers = props.attributes.answers.filter((answer) => {
            const isIdMatched = answer.id == indexToDelete
            return !isIdMatched
        })
        props.setAttributes({ answers: newAnswers })

        if (indexToDelete == props.attributes.correctAnswer) {
            props.setAttributes({ correctAnswer: null })
        }
    }

    function markAsCorrect(index) {
        props.setAttributes({ correctAnswer: index })
    }

    const { question } = props.attributes;

    return (
        <div className="posts-quiz-edit-block">
            <TextControl label="Question:" value={props.attributes.question} onChange={updateQuestion} style={{ fontSize: "30px" }} />
            <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answer: </p>
            {props.attributes.answers.map((answer, index) => {
                const isCorrectAnswer = props.attributes.correctAnswer == answer.id
                return (
                    <Flex key={answer.id}>
                        <FlexBlock>
                            <TextControl value={answer.name} autoFocus={answer.name === null} onChange={newValue => {
                                const newAnswers = props.attributes.answers.concat([])
                                newAnswers[index] = { id: answer.id, name: newValue }
                                props.setAttributes({ answers: newAnswers })
                            }} />
                        </FlexBlock>
                        <FlexItem>
                            <Button onClick={() => markAsCorrect(answer.id)}>
                                <Icon icon={isCorrectAnswer ? "star-filled" : "star-empty"} className="star-icon" />
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button isLink className="delete-button" onClick={
                                () => deleteAnswer(answer.id)
                            }>Delete</Button>
                        </FlexItem>
                    </Flex>
                )
            })}
            <Button isPrimary onClick={() => {
                props.setAttributes({
                    answers: props.attributes.answers.concat([{ id: uuid(), name: null }])
                })
            }}>Add Another Answer</Button>        </div>
    )
}
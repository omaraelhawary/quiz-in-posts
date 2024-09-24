import "./index.scss"
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon } from "@wordpress/components"


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
            default: [

            ]
        }
    },
    edit: EditComponent,
    save: function (props) {
        return null
    }
})


function EditComponent(props) {

    function updateQuestion(value) {
        props.setAttributes({ question: value })
    }

    function deleteAnswer(indexToDelete) {
        const newAnswers = props.attributes.answers.filter(function (x, index) {
            return index != indexToDelete
        })
        props.setAttributes({ answers: newAnswers })
    }

    return (
        <div className="posts-quiz-edit-block">
            <TextControl label="Question:" value={props.attributes.question} onChange={updateQuestion} style={{ fontSize: "30px" }} />
            <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answer: </p>
            {props.attributes.answers.map((answer, index) => {
                return (
                    <Flex>
                        <FlexBlock>
                            <TextControl value={answer} autoFocus={true} onChange={newValue => {
                                const newAnswers = props.attributes.answers.concat([])
                                newAnswers[index] = newValue
                                props.setAttributes({ answers: newAnswers })
                            }} />
                        </FlexBlock>
                        <FlexItem>
                            <Button>
                                <Icon icon="star-empty" className="star-icon" />
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button isLink className="delete-button" onClick={
                                () => deleteAnswer(index)
                            }>Delete</Button>
                        </FlexItem>
                    </Flex>
                )
            })}
            <Button isPrimary onClick={() => {
                props.setAttributes({
                    answers: props.attributes.answers.concat([undefined])
                })
            }}>Add Another Answer</Button>        </div>
    )
}
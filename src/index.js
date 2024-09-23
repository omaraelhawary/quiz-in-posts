import "./index.scss"
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon } from "@wordpress/components"


wp.blocks.registerBlockType("posts-quiz/quiz", {
    title: "Quiz",
    icon: "smiley",
    category: "common",
    attributes: {
        QuizTitle: {
            type: "string",
        },
        QuizDescription: {
            type: "string",
        }
    },
    edit: EditComponent,
    save: function (props) {
        return null
    }
})


function EditComponent(props) {

    function updateQuizTitle(event) {
        props.setAttributes({ QuizTitle: event.target.value })
    }

    function updateQuizDescription(event) {
        props.setAttributes({ QuizDescription: event.target.value })
    }

    return (
        <div className="posts-quiz-edit-block">
            <TextControl label="Question:" style={{ fontSize: "30px" }} />
            <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answer: </p>
            <Flex>
                <FlexBlock>
                    <TextControl />
                </FlexBlock>
                <FlexItem>
                    <Button>
                        <Icon icon="star-empty" className="star-icon" />
                    </Button>
                </FlexItem>
                <FlexItem>
                    <Button isLink className="delete-button">Delete</Button>
                </FlexItem>
            </Flex>
            <Button isPrimary>Add Another Answer</Button>
        </div>
    )
}
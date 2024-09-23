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
            <TextControl label="Question:" />
            <p>Answer: </p>
            <Flex>
                <FlexBlock>
                    <TextControl />
                </FlexBlock>
                <FlexItem>
                    <Button>
                        <Icon icon="star-empty" />
                    </Button>
                </FlexItem>
                <FlexItem>
                    <Button>
                        Delete
                    </Button>
                </FlexItem>
            </Flex>
        </div>
    )
}
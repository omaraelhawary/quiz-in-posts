wp.blocks.registerBlockType("posts-quiz/quiz", {
    title: "Quiz",
    icon: "smiley",
    category: "common",
    edit: function () {
        return wp.element.createElement("h3", null, "Editor Screen")
    },
    save: function () {
        return wp.element.createElement("h3", null, "Frontend Screen")
    }
})
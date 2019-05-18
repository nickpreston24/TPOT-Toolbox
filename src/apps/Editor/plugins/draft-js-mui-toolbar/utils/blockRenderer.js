import HorizontalRule from './HorizontalRule'

export default (contentBlock, pluginFunctions) => {
    const type = contentBlock.getType();
    // if (type === 'page-break') {
    //     return {
    //         component: Icon,
    //         editable: false,
    //     };
    // }
    console.log(contentBlock, pluginFunctions)

    if (type === 'atomic') {
        console.log(pluginFunctions.getEditorState())
        const editorState = pluginFunctions.getEditorState()
        const contentState = editorState.getCurrentContent();
        const entityKey = contentBlock.getEntityAt(0);

        const entity = contentState.getEntity(entityKey);
        if (entity && entity.type === 'page-break') {
            return {
                component: HorizontalRule,
                editable: false,
            };
        }
    }
    // return undefined;
}
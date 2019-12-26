/**
 * Paper class
 * Usage:
 * 
 * //Easy instancing:
 * let paper = new Paper("Repentance", "Michael Preston")
 * console.log('File name:', paper.fileName)
 * 
 * //Easy component validation (single responsibility enforced)
 * { papers.map(p=> <MyComponent paper={new Paper(p.title, p.author)} ) }
 */
export default Paper = {
    constructor(title = null, author = null, excerpt = "", dateCreated = Date.now()) {

        // Assign to self
        Object.assign(this, { title, author, excerpt })
        this.status = 'in-progress'

        // Custom fields initialization *Optional*
        this.fileName = `${title}.docx`
        this.targetDirectory = `/tpot-toolbox.appspot.com/${fileName}`
        this.slug = title.replace('[\s?@^!#*]', '-').trim()

        // Custom Validations:
        if (!fileName.endsWith('.docx'))
            throw new Error(`$Paper ${title} is not in docx format!`)
    }
}
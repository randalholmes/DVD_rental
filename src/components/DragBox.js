


import './css/dragbox.css'

const DragBox = ({ children, closeAction, title }) => {
    return (
        <div className='dragbox' onMouseDown={(e) => mouseDown(e)}>
            <div id='dragArea' onMouseDown={(e) => mouseDownDragArea(e)}>
                {title}
                <button onClick={(e) => closeAction(e)}>Close</button>
            </div>
            
            <div id='contentArea'>
                {children}
            </div>
            
        </div>
    )
}

export default DragBox


// Clicked somewhere on drag box. Bring forward and set 'left' and 'top' styles.
const mouseDown = (e) => {
    // Bring box to front
    window.topZ = (window.topZ === undefined) ? 100 : ++window.topZ 
    e.currentTarget.style.zIndex = window.topZ

    // Style values: "style.left" and "style.top" return an empty string if these 
    // values have not been set by code previously. So we use computed style to set them 
    // to their current values for easy use in mouseMove().
    const styles = window.getComputedStyle(e.currentTarget)
    e.currentTarget.style.left = (e.currentTarget.style.left) || styles.getPropertyValue('left')
    e.currentTarget.style.top  = (e.currentTarget.style.top)  || styles.getPropertyValue('top')
}


// Sets up dragging feature by adding handlers and attributes to element that contains this element.
const mouseDownDragArea = (e) => {
    // Use the element that contains this modal box to define the bounds of movement when dragging.
    const container = e.target.parentElement.parentElement

    // Store reference to dragged element.
    container.boxRef = e.target.parentElement

    // Only add these listeners once. Subsequent mousedowns only set 'trackMouse' and 'boxRef'.
    if (container.trackMouse === undefined) {
        container.addEventListener("mouseup", mouseUp)
        container.addEventListener("mouseleave", mouseLeave)
        container.addEventListener("mousemove", mouseMove)
    }

    container.trackMouse = true
}


// Container mouseup
const mouseUp = (e) => {
    e.currentTarget.trackMouse = false
}


// Container mouseLeave
const mouseLeave = (e) => {
    e.currentTarget.trackMouse = false
}


// Change the position of the drag box based on mouse movement. 
// Handled by drag box's containing element.
const mouseMove = (e) => {
    if (!e.currentTarget.trackMouse) return

    const stylesTarget = window.getComputedStyle(e.currentTarget)
    const stylesBox = window.getComputedStyle(e.currentTarget.boxRef)

    // Update the left position of the box while constraining it to the width of the containing element.
    const maxWidth = parseInt(stylesTarget.getPropertyValue('width')) - parseInt(stylesBox.getPropertyValue('width'))
    let newLeft = parseInt(e.movementX) +  parseInt(e.currentTarget.boxRef.style.left)
    newLeft = Math.max(Math.min(maxWidth, newLeft), 0)
    e.currentTarget.boxRef.style.left = `${newLeft}px`

    // Update the top position of the box while constraining it to the height of the containing element.
    const maxHeight = parseInt(stylesTarget.getPropertyValue('height')) - parseInt(stylesBox.getPropertyValue('height'))
    let newTop = parseInt(e.movementY) +  parseInt(e.currentTarget.boxRef.style.top)
    newTop = Math.max(Math.min(maxHeight, newTop), 0)
    e.currentTarget.boxRef.style.top  = `${newTop}px`
}


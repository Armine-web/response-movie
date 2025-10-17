import "./loading.css"

export function Loading() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p 
            style={{color: "#EC8305"}}>Loading Questions...</p>
            <div className="spinner-6"></div>
        </div>
        
    )
}
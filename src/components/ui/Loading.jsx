import './loading.css';

export const Loading = () => {
    return (
        <div className="modal-preload">
            <div className="circles">
                <div className="circle"></div>
                <div className="mainLogo">
                    <img src='react-logo.webp' alt="" style={{ opacity: 0.45, width: '60%', marginTop: '32px' }} />
                </div>
            </div>
        </div>
    )
}

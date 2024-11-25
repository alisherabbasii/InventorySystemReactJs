export const OpenModal = (props: any) => {
    return (
        <div className={props?.modalWithinModal ? "ml-14 w-11/12 items-center fixed bg-opacity-90 fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center w-3/4 z-50 mt-14" : "fixed  flex items-center justify-center w-2/4 z-50 mt-14"} style={{zIndex: 99999}}>
            <div className="bg-white rounded-lg shadow-xl w-full p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">
                        {props.title}
                    </h3>
                    <button
                        onClick={props.handleClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Render children content */}
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

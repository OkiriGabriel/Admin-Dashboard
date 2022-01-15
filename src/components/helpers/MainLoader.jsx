import React from 'react';

const MainLoader = () => {

    return (
        <div>
            <div className="suspense bg-brand">

                <div className="suspense_image ui-text-center">
                    <span className='concreap-loader white md'></span>
                </div>

            </div>
        </div>
    )

}

const popNetwork = () => {

    window.location.href = '/no-network'

}

export default { MainLoader, popNetwork };
import React from 'react'
import SideMenu from './SideMenu'

const userLayout = ({ children }) => {
    return (
        <div>
            <div className="mt-2 mb-4 my-4">
                <h2 className="text-center fw-booder">
                    User Settings
                </h2>
            </div>

            <div className="conteiner">
                <div className="row justury-content-around">
                    <div className="col-12 col-lg-3">
                        <SideMenu />
                    </div>
                    <div className="col-12 col-lg-8 user-dashboard">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default userLayout
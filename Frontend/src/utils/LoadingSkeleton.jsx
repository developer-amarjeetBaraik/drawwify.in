import React, { useEffect } from 'react'

const LoadingSkeleton = ({ width = 0, height = 0, marginLeft = 0,marginTop=0,marginRight=0,marginBottom=0, paddingX = 0, paddingY = 0 }) => {
    return (
        <div className={`bg-glass rounded-lg animate-pulse`}
            style={{
                height: `${height}px`,
                width: `${width}px`,
                marginLeft: `${marginLeft}px`,
                marginTop: `${marginTop}px`,
                marginRight: `${marginRight}px`,
                marginBottom: `${marginBottom}px`,
            }}
        >
        </div>
    )
}

export default LoadingSkeleton

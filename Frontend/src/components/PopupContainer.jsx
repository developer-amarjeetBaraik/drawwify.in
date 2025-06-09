import React from 'react'

const PopupContainer = ({ headline = [], paragraph = [], onClickActionBtn = null, input = null }) => {
    return (
        <>
            <div className='absolute top-0 min-w-screen min-h-screen backdrop-blur-[4px]'>
            </div>
            <div className='w-[90%] max-w-[600px] h-[40%] min-h-[300px] p-8 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-glass border-2 border-glass rounded-lg flex flex-col justify-center items-center gap-2 text-center'>
                {headline.length > 0 ? headline.map((item) => (
                    <h3 className='text-3xl'>{item}</h3>
                )) : null}
                {paragraph.length > 0 ? paragraph.map((item) => (
                <p className='text-2sm'>{item}</p>
                )) : null}
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, maiores!</p>
                <input type="text" className='w-[90%] border' />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, maiores!</p>
                <button>Click</button>
            </div>
        </>
    )
}

export default PopupContainer

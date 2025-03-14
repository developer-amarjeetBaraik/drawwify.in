import React, { useContext, useEffect } from 'react'
import style from './CanvasSidebar.module.css'
import styleFromWorkSpace from '../pages/Workspace.module.css'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore'

const CanvasSidebar = () => {

    const { sidebarSelectedBtn, changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

    
    return (
        <div className={`${style.sidebarDiv} ${styleFromWorkSpace.workspaceSupportingElement}`}>
            <span className={style.firstSpan}>
                <button value={'insert'} onClick={()=>changeSidebarSelectedBtn('insert')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'insert'?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="12" height="12" focusable="false" aria-hidden="true" viewBox="0 0 12 12" className=""><path fill="path" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" d="M6 1V6M6 11V6M6 6H11M6 6H1"></path></svg>
                    </span>
                    <span className={style.character}>
                        /
                    </span>
                </button>
            </span>
            <span className={style.secondSpan}>
                <button value={'cursor'} onClick={()=>changeSidebarSelectedBtn('cursorBtn')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'cursorBtn'?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="11" height="13" focusable="false" aria-hidden="true" viewBox="0 0 11 13" className=""><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M1.13179 0.269066C1.39498 0.117113 1.72385 0.139007 1.96458 0.324508L10.5455 6.93692C10.7927 7.12735 10.8961 7.4509 10.8053 7.74938C10.7144 8.04786 10.4483 8.25892 10.1369 8.27938L5.91667 8.55673L3.56634 12.0729C3.39296 12.3323 3.0771 12.4573 2.77319 12.3867C2.46928 12.3161 2.24079 12.0648 2.19943 11.7555L0.763405 1.018C0.723119 0.71678 0.868595 0.42102 1.13179 0.269066ZM2.49158 2.62431L3.42293 9.58824L4.87506 7.4158C5.00458 7.22203 5.21683 7.09948 5.4494 7.0842L8.05685 6.91284L2.49158 2.62431Z"></path></svg>
                    </span>
                    <span className={style.character}>
                        V
                    </span>
                </button>

                <button value={'square'} onClick={()=>changeSidebarSelectedBtn('squareBtn')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'squareBtn' || sidebarSelectedBtn === 'squareDraw'?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="12" height="12" focusable="false" aria-hidden="true" viewBox="0 0 12 12" className=""><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M1.5 1.5V10.5H10.5V1.5H1.5ZM1 0C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H11C11.5523 12 12 11.5523 12 11V1C12 0.447715 11.5523 0 11 0H1Z"></path></svg>
                    </span>
                    <span className={style.character}>
                        R
                    </span>
                </button>

                <button value={'circle'} onClick={()=>changeSidebarSelectedBtn('circleBtn')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'circleBtn' || sidebarSelectedBtn === 'circleDraw'?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="12" height="12" focusable="false" aria-hidden="true" viewBox="0 0 12 12" className=""><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6ZM6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0Z"></path></svg>
                    </span>
                    <span className={style.character}>
                        O
                    </span>
                </button>

                <button value={'arrow'} onClick={()=>changeSidebarSelectedBtn('arrowBtn')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'arrowBtn' || sidebarSelectedBtn === 'arrowDraw' ?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="10" height="10" focusable="false" aria-hidden="true" viewBox="0 0 10 10" className=""><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M3.36165 1.06268C3.37175 0.648589 3.71562 0.32109 4.12971 0.331189L8.27134 0.432205C8.67122 0.441958 8.99307 0.763813 9.00283 1.16369L9.10384 5.30532C9.11394 5.71941 8.78644 6.06328 8.37235 6.07338C7.95826 6.08348 7.61439 5.75598 7.60429 5.34189L7.54594 2.94975L1.71231 8.78338C1.41942 9.07627 0.944545 9.07627 0.651651 8.78338C0.358758 8.49049 0.358758 8.01561 0.651651 7.72272L6.48528 1.88909L4.09314 1.83074C3.67905 1.82064 3.35155 1.47677 3.36165 1.06268Z"></path></svg>
                    </span>
                    <span className={style.character}>
                        A
                    </span>
                </button>

                <button value={'line'} onClick={()=>changeSidebarSelectedBtn('lineBtn')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'lineBtn' || sidebarSelectedBtn === 'lineDraw' ?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="9" height="9" focusable="false" aria-hidden="true" viewBox="0 0 9 9" className=""><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M1.18499 8.59319C0.8921 8.3003 0.916513 7.80101 1.23952 7.478L7.47801 1.23951C7.80102 0.916502 8.30031 0.892089 8.5932 1.18498C8.8861 1.47787 8.86168 1.97716 8.53867 2.30017L2.30018 8.53866C1.97717 8.86167 1.47789 8.88609 1.18499 8.59319Z"></path></svg>
                    </span>
                    <span className={style.character}>
                        L
                    </span>
                </button>

                <button value={'drow'} onClick={()=>changeSidebarSelectedBtn('drawBtn')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'drawBtn' || sidebarSelectedBtn === 'pencilDraw'|| sidebarSelectedBtn === 'eraserDraw'?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="11" height="11" focusable="false" aria-hidden="true" viewBox="0 0 11 11" className=""><mask id="path-1-inside-1_562_2196" fill="white"><path fillRule="evenodd" clipRule="evenodd" d="M7.91767 1.68578L1.68947 7.91398L1.53767 9.46233L3.08602 9.31053L9.31422 3.08233L7.91767 1.68578ZM8.61595 0.289234C8.2303 -0.0964117 7.60504 -0.0964112 7.2194 0.289234L0.51705 6.99158C0.355393 7.15324 0.254834 7.36598 0.232527 7.5935L0.00483 9.91602C-0.0558971 10.5354 0.464567 11.0559 1.08398 10.9952L3.4065 10.7675C3.63402 10.7452 3.84676 10.6446 4.00842 10.483L10.7108 3.7806C11.0964 3.39495 11.0964 2.7697 10.7108 2.38405L8.61595 0.289234Z"></path></mask><path fill="currentColor" mask="url(#path-1-inside-1_562_2196)" d="M1.68947 7.91398L0.628811 6.85332L0.249033 7.2331L0.196628 7.76762L1.68947 7.91398ZM7.91767 1.68578L8.97833 0.62512L7.91767 -0.43554L6.85701 0.62512L7.91767 1.68578ZM1.53767 9.46233L0.0448302 9.31597L-0.133343 11.1333L1.68403 10.9552L1.53767 9.46233ZM3.08602 9.31053L3.23237 10.8034L3.7669 10.751L4.14668 10.3712L3.08602 9.31053ZM9.31422 3.08233L10.3749 4.14299L11.4355 3.08233L10.3749 2.02167L9.31422 3.08233ZM7.2194 0.289234L8.28006 1.34989L7.2194 0.289234ZM8.61595 0.289234L7.55529 1.34989V1.34989L8.61595 0.289234ZM0.51705 6.99158L-0.54361 5.93092L0.51705 6.99158ZM0.232527 7.5935L1.72537 7.73986L0.232527 7.5935ZM0.00483 9.91602L1.49767 10.0624L1.49767 10.0624L0.00483 9.91602ZM1.08398 10.9952L1.23034 12.488H1.23034L1.08398 10.9952ZM3.4065 10.7675L3.26014 9.27463H3.26014L3.4065 10.7675ZM10.7108 2.38405L11.7714 1.32339L11.7714 1.32339L10.7108 2.38405ZM2.75013 8.97464L8.97833 2.74644L6.85701 0.62512L0.628811 6.85332L2.75013 8.97464ZM3.03052 9.60868L3.18231 8.06034L0.196628 7.76762L0.0448302 9.31597L3.03052 9.60868ZM2.93966 7.81769L1.39132 7.96948L1.68403 10.9552L3.23237 10.8034L2.93966 7.81769ZM8.25356 2.02167L2.02536 8.24987L4.14668 10.3712L10.3749 4.14299L8.25356 2.02167ZM6.85701 2.74644L8.25356 4.14299L10.3749 2.02167L8.97833 0.62512L6.85701 2.74644ZM8.28006 1.34989C8.07992 1.55003 7.75543 1.55004 7.55529 1.34989L9.67661 -0.771426C8.70517 -1.74286 7.13017 -1.74286 6.15874 -0.771426L8.28006 1.34989ZM1.57771 8.05224L8.28006 1.34989L6.15874 -0.771426L-0.54361 5.93092L1.57771 8.05224ZM1.72537 7.73986C1.71379 7.85794 1.66161 7.96835 1.57771 8.05224L-0.54361 5.93092C-0.95082 6.33813 -1.20413 6.87402 -1.26032 7.44715L1.72537 7.73986ZM1.49767 10.0624L1.72537 7.73986L-1.26032 7.44715L-1.48801 9.76966L1.49767 10.0624ZM0.937622 9.50233C1.25908 9.47081 1.52919 9.74092 1.49767 10.0624L-1.48801 9.76966C-1.64098 11.3299 -0.329944 12.641 1.23034 12.488L0.937622 9.50233ZM3.26014 9.27463L0.937621 9.50233L1.23034 12.488L3.55285 12.2603L3.26014 9.27463ZM2.94776 9.42229C3.03165 9.33839 3.14206 9.28621 3.26014 9.27463L3.55285 12.2603C4.12599 12.2041 4.66187 11.9508 5.06908 11.5436L2.94776 9.42229ZM9.65011 2.71994L2.94776 9.42229L5.06908 11.5436L11.7714 4.84126L9.65011 2.71994ZM9.65011 3.44471C9.44996 3.24457 9.44996 2.92008 9.65011 2.71994L11.7714 4.84126C12.7429 3.86983 12.7429 2.29483 11.7714 1.32339L9.65011 3.44471ZM7.55529 1.34989L9.65011 3.44471L11.7714 1.32339L9.67661 -0.771426L7.55529 1.34989Z"></path></svg>
                    </span>
                    <span className={style.character}>
                        D
                    </span>
                </button>

                <button value={'text'} onClick={()=>changeSidebarSelectedBtn('textBtn')} className={`${style.sidebarButton} ${sidebarSelectedBtn === 'textBtn' || sidebarSelectedBtn === 'textDraw' ?style.activeBtn:null}`}>
                    <span className={style.shape}>
                        <svg role="img" width="13" height="9" focusable="false" aria-hidden="true" viewBox="0 0 13 9" className=""><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M5.75 0C5.33579 0 5 0.335786 5 0.75C5 1.16421 5.33579 1.5 5.75 1.5H8V7.75C8 8.16421 8.33579 8.5 8.75 8.5C9.16421 8.5 9.5 8.16421 9.5 7.75V1.5H11.75C12.1642 1.5 12.5 1.16421 12.5 0.75C12.5 0.335786 12.1642 0 11.75 0H5.75ZM0.75 3C0.335786 3 0 3.33579 0 3.75C0 4.16421 0.335786 4.5 0.75 4.5H2V7.75C2 8.16421 2.33579 8.5 2.75 8.5C3.16421 8.5 3.5 8.16421 3.5 7.75V4.5H4.75C5.16421 4.5 5.5 4.16421 5.5 3.75C5.5 3.33579 5.16421 3 4.75 3H0.75Z"></path></svg>
                    </span>
                    <span className={style.character}>
                        T
                    </span>
                </button>
            </span>
        </div>
    )
}

export default CanvasSidebar

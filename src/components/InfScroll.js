import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';

function InfScroll({ children, getNext, data, hasMore, loading, Loader }) {
    const params = useParams();
    const scrollContainer = useRef();
    const scrollThumb = useRef();


    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            const scrollHeight = scrollContainer.current.offsetHeight*100/scrollContainer.current.scrollHeight;
            scrollThumb.current.style.height = `${scrollHeight}%`;
            scrollThumb.current.style.top = (scrollContainer.current.scrollTop*100/scrollContainer.current.scrollHeight) + '%';
        });

        resizeObserver.observe(scrollContainer.current);
    }, [])


    useEffect(() => {
        setTimeout(() => {
            const scrollHeight = scrollContainer.current.offsetHeight*100/scrollContainer.current.scrollHeight;
            scrollThumb.current.style.height = `${scrollHeight}%`;
            scrollThumb.current.style.top = (scrollContainer.current.scrollTop*100/scrollContainer.current.scrollHeight) + '%';
        }, 100)

        scrollContainer.current.addEventListener('scroll', handleScroll);
        return () => scrollContainer.current.removeEventListener('scroll', handleScroll);
    }, [data])


    useEffect(() => {
        scrollThumb.current.style.top = '0';
        scrollContainer.current.scrollTop = 0;
    }, [params])

    function handleScroll(){
        scrollThumb.current.style.top = (scrollContainer.current.scrollTop*100/scrollContainer.current.scrollHeight) + '%';
        if(scrollContainer.current.scrollHeight <= scrollContainer.current.offsetHeight+scrollContainer.current.scrollTop+1){
            if(hasMore) getNext();
        }
    }

    return (
        <div ref={scrollContainer} className='scroll-container'>
            <div className="scroll-bar">
                <div ref={scrollThumb} className="scroll-thumb"></div>
            </div>
            <div className="scroll-content">
                {children}
                {loading && Loader}
            </div>
        </div>
    )
}

export default InfScroll
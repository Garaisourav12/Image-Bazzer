import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfScroll from './InfScroll';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

function Galary() {
    const params = useParams();
    const [page, setPage] = useState(1);

    const [images, setImages] = useState([]);
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [images1, setImages1] = useState([]);
    const [images2, setImages2] = useState([]);
    const [images3, setImages3] = useState([]);


    async function getData(){
        const BASE_URL = 'https://api.unsplash.com';
        const API_KEY = 'F5Qv_QyYt0qrDNyN99pl5GOv__IBrT5cOXfunbCXrDg';
        const END_POINT = '/search/photos';

        try{
            setLoading(true);
            setError(null);
            const {data} = await axios.get(
                BASE_URL + END_POINT, {
                    params: {
                        client_id: API_KEY,
                        query: params.query||'random',
                        per_page: 6,
                        page
                    }
                }
            )
            // console.log(data.total);
            
            if(page===1) {
                setTotal(data.total);
                setImages([...data.results]);
            }
            else setImages([...images, ...data.results]);
        }
        catch(e){
            setError(e.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(page === 1) getData();
        else setPage(page => 1);
    }, [params])

    useEffect(() => {
        getData();
    }, [page])

    useEffect(() => {
        setImages1(images.filter((e, i) => i%3===0))
        setImages2(images.filter((e, i) => i%3===1))
        setImages3(images.filter((e, i) => i%3===2))
    }, [images])
    
    function updatePage(){
        setPage(page => page + 1);
    }


    return (
        <div className='galary'>
            <InfScroll
                getNext={updatePage}
                data={images}
                hasMore={images.length<total}
                loading={loading}
                Loader={
                    <>
                        <div></div>
                        <div className="loader">
                            <RotatingLines
                                visible={true}
                                height="70"
                                width="70"
                                color="grey"
                                strokeWidth="3"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                        <div></div>
                    </>
                }
            >
                <div className="col">
                    {
                        !error && images1.map(image=> (
                            <img key={image.id} src={image.urls.thumb} alt="" />
                        ))
                    }
                </div>
                <div className="col">
                    {
                        !error && images2.map(image=> (
                            <img key={image.id} src={image.urls.thumb} alt="" />
                        ))
                    }
                </div>
                <div className="col">
                    {
                        !error && images3.map(image=> (
                            <img key={image.id} src={image.urls.thumb} alt="" />
                        ))
                    }
                </div>
            </InfScroll>
        </div>
    )
}

export default Galary
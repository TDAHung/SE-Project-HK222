import { useEffect, useState } from "react";
import "./Loading.css";

const Loading = (page) =>{

    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            fetch(`./${page}/index.jsx`)
                .then((response) => response.json())
                .then((json) => {
                    setLoading(true);
                    setTimeout(() => {
                        setComplete(true);
                    }, 2000)
                })
        }, 3000)
    }, []);

    return (
        <>
            {
                !complete ? (
                    <>
                        {
                            !loading ? (
                                <div className="spinner">
                                    <span>Loading...</span>
                                    <div className="haft-spinner"></div>
                                </div>
                            ) : (
                                <div className="complete"></div>
                            )
                        }
                    </>
                ) : (
                    <>{`./${page}/index.jsx`}</>
                )
            }
        </>
    );
};

export default Loading;
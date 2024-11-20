// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function PodcastDetails() {
    const { params } = useParams();
    console.log(params);
    interface show {
        id: number,
        title: string,
        description: string,
        seasons: Array<season>,
    }

    interface season {
        id: number,
        title: string,
        image: string,
        episodes: Array<episode>,
    }
    
    interface episode {
        id: number,
        title: string,
        file: string,
    }
    

    return (
        <div>hello</div>
    )
}
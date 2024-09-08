import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchMyTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                withCredentials: true
            });
            console.log(res);
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const followingTweetHandler = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);
            console.log(res);
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetHandler();
        }
    }, [fetchMyTweets, followingTweetHandler, isActive, refresh]);
};
export default useGetMyTweets;
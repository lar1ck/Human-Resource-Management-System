import type { Staff, Post } from "../types/types";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";

export const fetchStaff = async (
    setStaff: Dispatch<SetStateAction<Staff[]>>
) => {
    try {
        const response = await axios.get<Staff[]>("http://localhost:5656/api/staff");
        setStaff(response.data);
    } catch (error) {
        console.error("Error fetching staff data:", error);
    }
};

export const fetchPostById  = async (
    setPost: Dispatch<SetStateAction<Post>>, id: number
) => {
    try {
        const response = await axios.get<Post>(`http://localhost:5656/api/post/${id}`);
        setPost(response.data);
    } catch (error) {
        console.error("Error fetching post data:", error);
    }
}
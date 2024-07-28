import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
  author: {
    username: string;
    name: string;
  };
}

export interface PublicDetails {
  id: number;
  username: string;
  name: string;
  profile: string;
  blogs:{
    id:number;
    title:string;
    content:string;
    date:string;
  }[];
}

export const usePublicDetails = () => {
  const { username } = useParams<{ username: string }>();

  const [publicDetails, setPublicDetails] = useState<PublicDetails>({
    id: 0,
    username: "",
    name: "",
    profile: "",
    blogs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8787/api/v1/blog/public/${username}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.status === 200) {
          setPublicDetails(response.data);
          setLoading(false);
        } else {
          alert('msg: ' + response.data);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        alert('msg: Internal server error');
      }
    };
    fetchData();
  }, [username]);

  return { publicDetails, loading, error };
};
